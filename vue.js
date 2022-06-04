const engine = new BrowserEngine("db");
const db = new StormDB(engine);

var persoEnCours = [];

$(document).ready(function () {
    // RESET DAILY
    if (db.get("resetDaily").value() === undefined) db.set("resetDaily", "").save();
    else resetDaily();

    // RESET WEEKLY
    if (db.get("resetWeekly").value() === undefined) db.set("resetWeekly", "").save();
    else resetWeekly();

    // SHOW PERSOS
    if (db.get("personnages").value() === undefined) db.set("personnages", []).save();

    // SHOW TASKS
    if (db.get("tasks").value() === undefined) db.set("tasks", []).save();

    // SHOW TIMES
    if (db.get("times").value() === undefined) db.set("times", []).save();

    // GROUPE
    if (db.get("groupeEnCours").value() === undefined) db.set("groupeEnCours", 1).save();

    // COMPTEUR UNA
    if (db.get("counterUna").value() === undefined || db.get("counterUna").value() == null) db.set("counterUna", 0).save();

    // COMPTEUR CHAOS
    if (db.get("counterChaos").value() === undefined || db.get("counterChaos").value() == null) db.set("counterChaos", 0).save();

    // COMPTEUR RAID
    if (db.get("counterRaid").value() === undefined || db.get("counterRaid").value() == null) db.set("counterRaid", 0).save();

    showPersos();
    showEvents();
    showRapport();
    showImportantFromOtherPerso();
    showCounter();

    $('.selectionPerso').on('click', function () {
        showSelection($(this));
    });
});

$(document).on('click', '.cardEvent', function () {
    checkTask($(this).data('id'));
    $(this).hide();
});

function resetDaily(resetVar, resetType) {
    if (db.get('resetDaily').value() != moment().format('DD/MM/YYYY') && moment().format("HH") > 11) {
        db.get('resetDaily').set(moment().format('DD/MM/YYYY'));
        db.save();

        let tasks = db.get("tasks").value();

        tasks.forEach(function (task, i) {
            if (task.resetTask == 'Daily') {
                db.get("tasks")
                    .get(i)
                    .get('statutTask')
                    .set(false);

                db.save();
            }
        });

        let groupeEnCours = parseInt(db.get("groupeEnCours").value());

        groupeEnCours++;
        if (groupeEnCours > 3) {
            groupeEnCours = 1;
        }

        db.get('groupeEnCours').set(groupeEnCours);
        db.save();

        window.location.reload();
    }
}

function resetWeekly() {
    if (db.get('resetWeekly').value() != moment().format('DD/MM/YYYY') && moment().format('E') == 4) {
        db.get('resetWeekly').set(moment().format('DD/MM/YYYY'));
        db.save();

        let tasks = db.get("tasks").value();

        tasks.forEach(function (task, i) {
            if (task.resetTask == 'Weekly') {
                db.get("tasks")
                    .get(i)
                    .get('statutTask')
                    .set(false);

                db.save();
            }
        });

        showTask();
    }
}

function showPersos() {
    let htmlPersos = '';

    getPersoFromGroupe('Main');
    getPersoFromGroupe(db.get("groupeEnCours").value());

    persoEnCours.forEach(function (p) {
        let htmlTaches = '';
        let htmlEntete = '';
        let tasks = getTachesActiveFromPerso(p);

        tasks.sort((a, b) => {
            return a.prioTask - b.prioTask;
        });

        tasks.forEach(function (t) {
            let i = getIndexTask(t);
            let color = getColorFromTask(t);

            htmlTaches += `
            <div class="card mb-3 cardEvent box-shadow ${color}" data-id="${i}" style="cursor: pointer;">
                <div class="d-flex">
                    <div class="card-body">
                        ${t.nomTask}
                    </div>
                </div>
            </div>`;
        });

        if (p.groupePerso == 'Main') {
            htmlEntete = `
                <div class="card mb-3 box-shadow text-gray">
                    <div class="d-flex">
                        <div class="card-body">
                            <strong><i>MAIN</i></strong> - ${p.typePerso}
                        </div>
                    </div>
                </div>
            `;
        } else {
            htmlEntete = `
                <div class="card mb-3 box-shadow text-gray">
                    <div class="d-flex">
                        <div class="card-body">
                            <strong><i>${p.groupePerso}</i></strong> - ${p.typePerso}<span class="float-end">${p.gearlevel}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        htmlPersos += `
            <section style="width: 18vw;">
                ${htmlEntete}
                <img src="images/${p.imagePerso}" alt="" style="width: 100%;height: 38vh;margin-bottom: 20px;border-radius: 5px;">

                <section id="main-taches" style="width: 100%">
                    ${htmlTaches}
                </section>
            </section>`;
    });

    $('#sectionPersoEnCours').html(htmlPersos);
}

function showEvents() {
    let eventTasks = getEventTask();
    let eventTasksDaily = [];
    let htmlTachesEvent = ``;

    eventTasks.forEach(function (task) {
        db.get("times").value().forEach(function (time) {
            if (task.openingTask == time.typeEvent) {
                if (moment().isoWeekday() == time.day && !task.statutTask) {
                    if (!eventTasksDaily.some(t => t.nomTask === task.nomTask)) {
                        eventTasksDaily.push(task);
                    }
                }
            }
        });
    });

    eventTasksDaily.forEach(function (t) {
        let i = getIndexTask(t);

        htmlTachesEvent += `
        <div class="card mb-3 cardEvent box-shadow text-gray" data-id="${i}" style="cursor: pointer;flex-grow: 1;">
            <div class="d-flex">
                <div class="card-body">
                    ${t.nomTask}
                </div>
            </div>
        </div>`;
    });

    $('#sectionEvent').html(htmlTachesEvent);
}

function showRapport() {
    let rapportTasks = getRapportTask();
    let htmlTachesRapport = ``;

    rapportTasks.forEach(function (task) {
        if (!task.statutTask) {
            let i = getIndexTask(task);

            htmlTachesRapport += `
                <div class="card mb-3 cardEvent box-shadow text-gray" data-id="${i}" style="cursor: pointer;flex-grow: 1;">
                    <div class="d-flex">
                        <div class="card-body">
                            ${task.nomTask}
                        </div>
                    </div>
                </div>
            `;
        }
    });

    $('#sectionRapport').html(htmlTachesRapport);
}

function showImportantFromOtherPerso() {
    let persos = getPersoFromGroupeInactif();
    let htmlOtherTask = '';
    console.log(persos);

    persos.forEach(function (p) {
        let tasks = getTachesImportanteFromPerso(p);

        tasks.sort((a, b) => {
            return a.prioTask - b.prioTask;
        });

        tasks.forEach(function (t) {
            let i = getIndexTask(t);

            htmlOtherTask += `
            <div class="card mb-3 cardEvent box-shadow text-gray" data-id="${i}" style="cursor: pointer;flex-grow: 1;">
                <div class="d-flex">
                    <div class="card-body">
                        ${t.nomTask}<br>
                        <i class="color-gray">${t.persoTask}</i>
                    </div>
                </div>
            </div>`;
        });
    });

    $('#sectionOtherPersos').html(htmlOtherTask);
}

function showCounter() {
    console.log(db.get('counterUna').value())
    $('#counterUna').html(db.get('counterUna').value());
    $('#counterChaos').html(db.get('counterChaos').value());
    $('#counterRaid').html(db.get('counterRaid').value());
}

function showSelection(data) {
    let typePerso = data.data('perso');
    let idImg = data.data('idimg');
    let htmlSelection = '';
    console.log(typePerso)
    let perso = getPersoFromType(typePerso);

    $('.imgSelection').css('filter', 'brightness(0.5)');
    
    $('#' + idImg).css('filter', 'brightness(1)');

    if (perso) {
        let tasks = getTachesActiveFromPerso(perso);

        tasks.sort((a, b) => {
            return a.prioTask - b.prioTask;
        });

        tasks.forEach(function (t) {
            let i = getIndexTask(t);
            let color = getColorFromTask(t);

            htmlSelection += `
            <div class="card mb-3 cardEvent box-shadow ${color}" data-id="${i}" style="cursor: pointer;">
                <div class="d-flex">
                    <div class="card-body">
                        ${t.nomTask}
                    </div>
                </div>
            </div>`;
        });

        $('#persoSelectionner').html(htmlSelection);
    } else {
        $('#persoSelectionner').html(`
        <div class="card mb-3 box-shadow text-gray">
            <div class="d-flex">
                <div class="card-body">
                    Perso non existant
                </div>
            </div>
        </div>`);
    }
}

function getPersoFromGroupe(g) {
    db.get("personnages").value().forEach(function (p) {
        if (g == p.groupePerso) {
            persoEnCours.push(p);
        }
    });
}

function getPersoFromGroupeInactif() {
    let persos = [];

    db.get("personnages").value().forEach(function (p) {
        if (p.groupePerso != 'Main' && p.groupePerso != db.get("groupeEnCours").value()) {
            persos.push(p);
        }
    });

    return persos;
}

function getPersoFromType(type) {
    let perso = null;

    db.get("personnages").value().forEach(function (p) {
        if (p.typePerso == type) {
            perso = p;
        }
    });

    return perso;
}

function getTachesActiveFromPerso(p) {
    let tasks = [];

    db.get("tasks").value().forEach(function (t) {
        if (t.persoTask == p.typePerso && !t.statutTask && t.typeTask != 'Rapport') {
            tasks.push(t);
        }
    });

    return tasks;
}

function getTachesImportanteFromPerso(p) {
    let tasks = [];

    db.get("tasks").value().forEach(function (t) {
        if (t.persoTask == p.typePerso && !t.statutTask && (t.typeTask == 'Guild Activities' || t.typeTask == 'Daily Una Task' || t.typeTask == 'Récupération Weekly Una Task')) {
            tasks.push(t);
        }
    });

    return tasks;
}

function getIndexTask(task) {
    let index = 0;

    db.get("tasks").value().forEach(function (t, i) {
        if (task == t) index = i;
    });

    return index;
}

function getColorFromTask(task) {
    switch (task.resetTask) {
        case 'Daily':
            return 'text-red';
        case 'Weekly':
            return 'text-blue';
        default:
            return 'text-gray';
    }
}

function getEventTask() {
    let eventTasks = [];

    db.get("tasks").value().forEach(function (task) {
        if (task.openingTask && task.openingTask.length > 0) eventTasks.push(task);
    });

    return eventTasks;
}

function getRapportTask() {
    let rapportTasks = [];

    db.get("tasks").value().forEach(function (task) {
        if (task.typeTask == 'Rapport') rapportTasks.push(task);
    });

    return rapportTasks;
}

function getTasksEventDaily() {
    let tasks = [];

    db.get("tasks").value().forEach(function (t, i) {
        if (task == t) index = i;
    });

    return tasks
}

function checkTask(index) {

    if (db.get('tasks').get(index).get('resetTask').value() == 'Unique') {
        db.get("tasks").get(index).delete(true);
        db.save();
    } else {
        db.get("tasks")
            .get(index)
            .get('statutTask')
            .set(true);
        db.save();

        let task = db.get("tasks").get(index).value();

        if (task.typeTask == 'Daily Una Task') {
            incrementeCounter('counterUna');
        } else if (task.typeTask == 'Chaos Dungeon') {
            incrementeCounter('counterChaos');
        } else if (task.typeTask == 'Guardian Raid') {
            incrementeCounter('counterRaid');
        }
    }
}

function incrementeCounter(counter) {
    db.get(counter).set(parseInt(db.get(counter).value()) + 1);
    db.save();

    showCounter();
}