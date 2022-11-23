if (!Highcharts.theme) {
    Highcharts.setOptions({
        chart: {
            backgroundColor: '#272727'
        },
        colors: ['#fd7e14', '#1562b9', '#a14949', '#198754'],
        title: {
            style: {
                color: 'silver'
            }
        },
        tooltip: {
            style: {
                color: 'silver'
            }
        }
    });
}

$(document).ready(function () {
    let importanceLibelle = [
        "Importance, je n'ai pas le temps",
        "Importance, les quetes unas c'est bien",
        "Importance, les chaos c'est la vie",
        "Importance, les raids c'est le challenge",
        "Importance, le rooster complet",
        "Importance, les alts poubelles",
        "Importance, les quetes hebdo c'est le plus fun",
        "Importance, toutes les quetes pour les chomeurs"
    ];

    $('#choixImportance').on('click', function () {
        let importance = $(this).data('importance');
        importance = (importance + 1) > 8 ? 1 : importance + 1;

        $(this).data('importance', importance);
        $('#choixImportanceLibelle').text(importanceLibelle[importance - 1]);

        showTasks($('#choixImportance').data('importance'));
    });

    $(document).on('click', '.divtask', function () {
        checkTask($(this).data('id'));
        $(`.task${$(this).data('id')}`).remove();
    });

    showTasks($('#choixImportance').data('importance'));
    showCounter();
    loadCharts();
});

/**
 * Affichage des tâches en fonction de l'importance
 * 
 * @param {*} importance 
 */
function showTasks(importance) {
    let tasks = getTasksFromImportance(importance);
    let perso = '';
    let htmlModalJournee = '';

    console.log(tasks);

    tasks.sort((a, b) => a.perso.localeCompare(b.perso) || a.type.localeCompare(b.type) || a.nom.localeCompare(b.nom));

    tasks.forEach(function (t) {
        let i = getIndexTask(t);
        let color = getColorFromTask(t);

        if (perso != t.perso) {
            if (perso != '') {
                htmlModalJournee += `</div></div>`;
            }

            let p = getPersoFromName(t.perso);

            htmlModalJournee += `
                <div class="${t.perso}">
                    <div class="card mb-3 box-shadow-concave ${p.groupe == db.get("groupeEnCours").value() ? 'text-lightgray' : 'text-gray'} pointer" data-bs-toggle="collapse" data-bs-target="#collapse${t.perso}">
                        <div class="d-flex">
                            <div class="card-body" style="width: 100%;text-align: center;">
                            ${t.perso} - ${p.gearlevel}
                            </div>
                        </div>
                    </div>
                    <div class="card mb-3 box-shadow-concave text-gray collapse show" id="collapse${t.perso}">
                    `;

            perso = t.perso;
        }

        // if (prio > t.prioTask) {
        //     prio = t.prioTask;
        //     id = i;
        // }

        // if (t.type == "Procyon's compass") {
        //     t.type = "Event";
        // }

        htmlModalJournee += `
        <div id="task${i}" class="divtask pointer flex-grow-1 ${t.reset} ${t.type.replace(/ /g, "_")} ${color} task${i}" data-id="${i}" data-prio="${t.prio}">
            <div class="d-flex">
                <div class="card-body">
                    ${t.nom}
                </div>
            </div>
        </div>`;
    });

    $('#sectionListeTaches').html(htmlModalJournee);
}

/**
 * Validation d'une tâche
 * 
 * @param {*} index 
 */
function checkTask(index) {

    if (db.get('tasks').get(index).get('reset').value() == 'Unique') {
        db.get("tasks").get(index).delete(true);
        db.save();
    } else {
        db.get("tasks")
            .get(index)
            .get('statut')
            .set(true);
        db.save();

        let task = db.get("tasks").get(index).value();

        if (task.type.includes('Una') && task.reset == 'Quotidien') {
            incrementeCounter('counterUna');
            incrementerProgressBar('una');
        } else if (task.type.includes('chaos')) {
            incrementeCounter('counterChaos');
            incrementerProgressBar('chaos');
        } else if (task.type.includes('gardien')) {
            incrementeCounter('counterRaid');
            incrementerProgressBar('raid');
        } else if (task.type.includes('légion')) {
            incrementeCounter('counterLegion');
            incrementerProgressBar('legion');
        }
    }
}

/**
 * Récupération des tâches qui ont une horaire d'ouverture
 * 
 * @returns Tasks[]
 */
function getEventTask() {
    let eventTasks = [];

    db.get("tasks").value().forEach(function (task) {
        if (task.opening && task.opening.length > 0) eventTasks.push(task);
    });

    return eventTasks;
}

/**
 * Récupération de l'id d'une tâche
 * 
 * @param {*} task 
 * 
 * @returns int
 */
function getIndexTask(task) {
    let index = 0;

    db.get("tasks").value().forEach(function (t, i) {
        if (task == t) index = i;
    });

    return index;
}

/**
 * Récupération d'un caractère en fonction du nom
 * @param {*} nom
 * 
 * @returns 
 */
function getPersoFromName(nom) {
    let perso = null;

    db.get("persos").value().forEach(function (p) {
        if (p.nom == nom) perso = p;
    });

    return perso;
}

/**
 * Récupération d'une couleur en fonction du type de tâche
 * 
 * @param {*} task 
 * 
 * @returns string : color
 */
function getColorFromTask(task) {

    if (task.type.includes('Una')) {
        return 'bl-green';
    } else if (task.type.includes('chaos')) {
        return 'bl-darkblue';
    } else if (task.type.includes('guilde')) {
        return 'bl-purple';
    } else if (task.type.includes('gardien')) {
        return 'bl-darkred';
    } else if (task.type.includes('Procyon') || task.type.includes('Event') || task.type.includes('Evénement')) {
        return 'bl-orange';
    }

    switch (task.reset) {
        case 'Quotidien':
            return 'bl-red';
        case 'Hebdomadaire':
            return 'bl-blue';
        default:
            return 'bl-gray';
    }
}

/**
 * Incrémentation d'un compteur
 * @param {*} counter 
 */
function incrementeCounter(counter) {
    db.get(counter).set(parseInt(db.get(counter).value()) + 1);
    db.save();

    showCounter();
}

/**
 * Affichage des compteurs
 */
function showCounter() {
    $('#counterUna').html(db.get('counterUna').value());
    $('#counterChaos').html(db.get('counterChaos').value());
    $('#counterRaid').html(db.get('counterRaid').value());
    $('#counterLegion').html(db.get('counterLegion').value());
}

/**
 * Incrémentation des progress bars
 * @param {*} type 
 */
function incrementerProgressBar(type) {
    let index = -1;
    let nb = 0

    db.get("progressBarDaily").value().forEach(function (bar, i) {
        if (bar.type == type) {
            index = i;
            nb = bar.nb + 1;
        }
    });

    if (index >= 0) {
        db.get("progressBarDaily")
            .get(index)
            .get('nb')
            .set(nb);
        db.save();
    }

    loadCharts();
}

function getValueProgress(type) {
    let bar = null;

    db.get("progressBarDaily").value().forEach(function (b) {
        if (b.type == type) bar = b;
    });

    return parseInt(((((bar.nb * 100) / bar.max) > 100) ? 100 : ((bar.nb * 100) / bar.max)).toFixed(0));
}

/**
 * Récupération de la liste des tâches en fonction de l'importance choisi
 * 
 * @param {*} importance 
 * 
 * @returns Tasks[]
 */
function getTasksFromImportance(importance) {
    let persosPrincipaux = [];
    let persosSecondaire = [];
    let persosTertiaire = [];
    let eventTasksDaily = [];
    let tasks = [];

    // On catégorise les caractères par importance
    // Principaux : Main / Rooster / Rotation en cours
    // Secondaire : Alts du rooster qui ne font pas parti de la rotation en cours
    // Tertiaire : Alt en dehors du rooster, ex : alts lopang
    db.get("persos").value().forEach(function (p) {
        if (p.classe == 'Rooster' || p.groupe == 'Main' || p.groupe == db.get("groupeEnCours").value()) {
            persosPrincipaux.push(p.nom);
        } else if (p.groupe <= 3) {
            persosSecondaire.push(p.nom);
        } else {
            persosTertiaire.push(p.nom);
        }
    });

    console.log(persosPrincipaux, persosSecondaire, persosTertiaire);

    // Récupération des tâches avec une horaire d'ouverture
    let eventTasks = getEventTask();

    eventTasks.forEach(function (task) {
        db.get("times").value().forEach(function (time) {
            // console.log(task.opening, time.type)
            if (task.opening == time.type) {
                if (moment().isoWeekday() == time.day && !task.statut) {
                    if (!eventTasksDaily.some(t => t.nom === task.nom)) {
                        eventTasksDaily.push(task);
                    }
                }
            }
        });
    });

    // console.log(eventTasksDaily)

    eventTasksDaily.forEach(function (task) {
        tasks.push(task);
    });
    // console.log(importance)

    db.get("tasks").value().forEach(function (task) {
        // console.log(task)

        // if ((task.importance != '' && task.importance <= importance && (persosPrincipaux.includes(task.perso) || importance >= 8) && !task.statut)) {
        //     console.log(task)
        // }

        if (task.opening == '' && (
            (task.importance != '' && task.importance <= importance && (persosPrincipaux.includes(task.perso) || importance >= 8) && !task.statut)
            // Récupération Weekly Una Task
            || (importance >= 3 && task.type == 'Récupération Una Hebdo' && !task.statut)
            // Other
            || (importance >= 5 && persosSecondaire.includes(task.perso) && (task.type.includes('Una') || task.type.includes('guilde')) && !task.statut)
            // More
            || (importance >= 6 && task.prio < 200 && task.reset != 'Hebdomadaire' && !task.statut)
            // Weekly
            || (importance >= 7 && task.reset == 'Hebdomadaire' && !task.statut && task.type != 'Récupération Una Hebdo'))
        ) tasks.push(task);
    });

    return tasks;
}

function loadCharts() {
    Highcharts.chart('container-graphique', {

        chart: {
            type: 'solidgauge',
            height: '60%'
        },

        exporting: {
            enabled: false
        },

        title: {
            text: 'Daily Stuff',
            style: {
                fontSize: '14px',
                color: '#7c7c7c'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '10px'
            },
            valueSuffix: '%',
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) + 15
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '113%',
                innerRadius: '95%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Move
                outerRadius: '94%',
                innerRadius: '76%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '75%',
                innerRadius: '57%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '56%',
                innerRadius: '38%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[3])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        series: [{
            name: 'Legion Raid',
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '113%',
                innerRadius: '95%',
                y: getValueProgress('legion')
            }]
        }, {
            name: 'Chaos',
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '94%',
                innerRadius: '76%',
                y: getValueProgress('chaos')
            }]
        }, {
            name: 'Raid',
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '75%',
                innerRadius: '57%',
                y: getValueProgress('raid')
            }]
        }, {
            name: 'Una',
            data: [{
                color: Highcharts.getOptions().colors[3],
                radius: '56%',
                innerRadius: '38%',
                y: getValueProgress('una')
            }]
        }]
    });
}