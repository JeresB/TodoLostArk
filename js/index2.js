$(document).ready(function () {
    showTasks();
    showCounter();
    showProgressBar();
});


$(document).on('click', '.td-task', function () {
    checkTask($(this).data('id'));
    $(this).addClass('done-task');
    $(this).removeClass('td-task');
    $(this).removeClass('pointer');
    $(this).css('background-color', '');
    $(this).css('color', '');
});

/**
 * Affichage des tâches
 */
function showTasks() {
    let infos = getInfos();
    let htmlModalJournee = '<div class="card mb-3 box-shadow-concave" style="padding: 10px;"><table class="datatable table table-bordered table-dark text-gray" style="width: 100% !important;">';
    let thead = '<thead><tr>';
    let tbody = '<tbody>';
    let persos = [];
    let persosname = [];
    let all = [];
    let allr = [];

    let r = infos.rooster;
    let pp = infos.persosPrincipaux;
    let ps = infos.persosSecondaire;
    let pt = infos.persosTertiaire;

    pp.sort((a, b) => a.nom.localeCompare(b.nom));
    ps.sort((a, b) => a.nom.localeCompare(b.nom));
    pt.sort((a, b) => a.nom.localeCompare(b.nom));

    thead += '<th></th><th></th><th></th>';

    r.forEach(function (p) {
        // thead += `<th class="text-lightgray">${p.nom} - ${p.gearlevel}</th>`;
    });

    pp.forEach(function (p) {
        thead += `<th class="text-lightgray">${p.nom} - ${p.gearlevel}</th>`;
    });

    ps.forEach(function (p) {
        thead += `<th class="text-midgray">${p.nom} - ${p.gearlevel}</th>`;
    });

    pt.forEach(function (p) {
        thead += `<th>${p.nom} - ${p.gearlevel}</th>`;
    });

    persos = pp.concat(ps, pt);

    persos.forEach(function (p) {
        persosname.push(p.nom);
    });

    let typesTasks = infos.typesTasks;
    typesTasks.sort((a, b) => b.reset.localeCompare(a.reset) || a.type.localeCompare(b.type) || a.nom.localeCompare(b.nom));

    typesTasks.forEach(function (t) {
        persos.forEach(function (p) {
            let task = infos.tasks.find((task) => task.perso == p.nom && task.nom == t.nom)

            if (task) {
                all.push(task);
            } else {
                all.push('');
            }
        });
    });

    infos.tasks.forEach(function (t) {
        // let task = infos.tasks.find((task) => task.perso == p.nom)

        if (t.perso == r[0].nom && t.opening == '') {
            allr.push(t);
        }
    });

    let eventTasks = getEventTask();
    let eventTasksDaily = [];
    
    eventTasks.forEach(function (task) {
        db.get("times").value().forEach(function (time) {
            if (task.opening == time.type) {
                if (moment().isoWeekday() == time.day && !task.statut) {
                    if (!eventTasksDaily.some(t => t.nom === task.nom)) {
                        eventTasksDaily.push(task);
                    }
                }
            }
        });
    });

    eventTasksDaily.forEach(function (task) {
        allr.push(task);
    });

    trooster = '<div class="card mb-3 box-shadow-concave" style="padding: 10px;"><table class="table table-bordered table-dark text-gray" style="width: 100% !important;"><tbody><tr><th>Rooster</th>';

    allr.forEach(function (t, i) {
        let index = getIndexTask(t);
        let color = getColorFromTask(t);

        if (!t.statut) {
            let r = hexdec(color.substr(1, 2));
            let g = hexdec(color.substr(3, 2));
            let b = hexdec(color.substr(5, 2));
    
            let style = '';
    
            if (r + g + b > 382) {
                style = `background-color: ${color};color: black;`;
            } else {
                style = `background-color: ${color};color: white;`;
            }
    
            trooster += `<td><span class="badge badge-task ${t.statut ? '' : 'td-task pointer'}" data-id="${index}" style="${style}">${t.nom}</span></td>`;
        }
    });

    trooster += '</tr></tbody></table></div>';

    j = 0;

    all.forEach(function (t, i) {

        if ((i % (persosname.length)) == 0) {
            if (i != 0) {
                tbody += `</tr>`;
            }

            tbody += `<tr><th>${infos.typesTasks[j].nom}</th><th>${infos.typesTasks[j].reset}</th><th>${infos.typesTasks[j].type}</th>`;

            j++;
        }

        if (typeof t === 'object') {
            let index = getIndexTask(t);
            let color = getColorFromTask(t);
            let style = '';

            if (!t.statut) {
                let r = hexdec(color.substr(1, 2));
                let g = hexdec(color.substr(3, 2));
                let b = hexdec(color.substr(5, 2));
    
                if (r + g + b > 382) {
                    style = `background-color: ${color};color: black;`;
                } else {
                    style = `background-color: ${color};color: white;`;
                }
            }

            tbody += `<td><span class="badge badge-task ${t.statut ? 'done-task' : 'td-task pointer'}" data-id="${index}" style="${style}">${t.nom}</span></td>`;
        } else {
            tbody += `<td></td>`;
        }
    });

    thead += '</tr></thead>';
    tbody += '</tbody>';
    htmlModalJournee += thead;
    htmlModalJournee += tbody;
    htmlModalJournee += '</table></div>';

    $('#sectionRoosterTaches').html(trooster);
    $('#sectionTableTaches').html(htmlModalJournee);

    $('.datatable').DataTable({
        dom: 'Plfrtip',
        searchPanes: {
            layout: 'columns-2'
        },
        columnDefs: [
            {
                target: [0, 1, 2],
                visible: false,
                searchable: true,
            },
            {
                searchPanes: {
                    show: true
                },
                targets: [1, 2]
            },
            {
                searchPanes: {
                    show: false
                },
                targets: [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            }
        ],
        stateSave: false,
        ordering: false,
        paginate: false,
        language: {
            // "processing": "<img src='Web/images/spinner.gif'>",
            "sSearch": "Rechercher&nbsp;:",
            "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo": "Affichage de _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty": "Affichage de 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix": "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable": "Aucune donn&eacute;es",
            "oPaginate": {
                "sFirst": "D&eacute;but",
                "sPrevious": "&lt;",
                "sNext": "&gt;",
                "sLast": "Fin"
            },
            "oAria": {
                "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            }
        }
    });
}

function hexdec(hexString) {
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '')
    return parseInt(hexString, 16)
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
    console.log(task)
    if (task.type.includes('Una')) {
        // return 'bl-green';
        return '#008000';
    } else if (task.type.includes('chaos')) {
        // return 'bl-darkblue';
        return '#1562b9';
    } else if (task.type.includes('guilde')) {
        // return 'bl-purple';
        return '#7824d8';
    } else if (task.type.includes('gardien')) {
        // return 'bl-darkred';
        return '#a14949';
    } else if (task.type.includes('Procyon') || task.type.includes('Event') || task.type.includes('Evénement')) {
        // return 'bl-orange';
        return '#DAA200';
    }

    switch (task.reset) {
        case 'Quotidien':
            // return 'bl-red';
            return '#c77171';
        case 'Hebdomadaire':
            // return 'bl-blue';
            return '#779FF8';
        default:
            // return 'bl-gray';
            return '#7c7c7c';
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

    showProgressBar();
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
 * @returns Tasks[]
 */
function getInfos() {
    let rooster = [];
    let persosPrincipaux = [];
    let persosSecondaire = [];
    let persosTertiaire = [];
    let eventTasksDaily = [];
    let tasks = [];
    let typesTasksName = [];
    let typesTasks = [];

    // On catégorise les caractères par importance
    // Principaux : Main / Rooster / Rotation en cours
    // Secondaire : Alts du rooster qui ne font pas parti de la rotation en cours
    // Tertiaire : Alt en dehors du rooster, ex : alts lopang
    db.get("persos").value().forEach(function (p) {
        if (p.classe == 'Rooster') {
            rooster.push(p);
        } else if (p.groupe == 'Main' || p.groupe == db.get("groupeEnCours").value()) {
            persosPrincipaux.push(p);
        } else if (p.groupe <= 3) {
            persosSecondaire.push(p);
        } else {
            persosTertiaire.push(p);
        }
    });

    // console.log(persosPrincipaux, persosSecondaire, persosTertiaire);

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

    db.get("tasks").value().forEach(function (task) {
        tasks.push(task);
    });

    db.get("tasks").value().forEach(function (task) {
        if (!typesTasksName.includes(task.nom) && task.perso != 'Rooster') {
            typesTasksName.push(task.nom);
            typesTasks.push(task);
        }
    });

    // console.log(typesTasks)

    return { tasks: tasks, rooster: rooster, persosPrincipaux: persosPrincipaux, persosSecondaire: persosSecondaire, persosTertiaire: persosTertiaire, typesTasks: typesTasks };
}

function showProgressBar() {
    let html = '';

    db.get("progressBarDaily").value().forEach(function (bar) {

        let width = (bar.nb * 100) / bar.max;

        if (width > 100) {
            width = 100;
        }

        html += `
            <div style="flex-grow: 1;color:gray;text-align:center;">
                <div><strong>${(bar.type).toUpperCase()}</strong></div>
                <div class="progress progress-moved">
                    <div class="progress-bar" style="width: ${width}%; background-color: ${bar.color};">
                    </div>                       
                </div>
            </div>`;
    });

    $('#progress-section').html(html);
}