const engine = new BrowserEngine("db");
const db = new StormDB(engine);

const CHAOS_GATE_OPENING = [{ day: "1", hour: "05", min: "00" }, { day: "1", hour: "06", min: "00" }, { day: "1", hour: "07", min: "00" }, { day: "1", hour: "08", min: "00" }, { day: "1", hour: "09", min: "00" }, { day: "1", hour: "10", min: "00" }, { day: "1", hour: "11", min: "00" }, { day: "1", hour: "12", min: "00" }, { day: "1", hour: "13", min: "00" }, { day: "1", hour: "14", min: "00" }, { day: "1", hour: "15", min: "00" }, { day: "1", hour: "16", min: "00" }, { day: "1", hour: "17", min: "00" }, { day: "1", hour: "18", min: "00" }, { day: "1", hour: "19", min: "00" }, { day: "1", hour: "20", min: "00" }, { day: "1", hour: "21", min: "00" }, { day: "1", hour: "22", min: "00" }, { day: "1", hour: "23", min: "00" }], WORLD_BOSS_OPENING = [{ day: "2", hour: "05", min: "00" }], ALAKKIR_OPENING = [{ day: "1", hour: "18", min: "50" }, { day: "1", hour: "21", min: "50" }, { day: "2", hour: "18", min: "50" }, { day: "2", hour: "21", min: "50" }, { day: "3", hour: "18", min: "50" }, { day: "3", hour: "21", min: "50" }, { day: "4", hour: "18", min: "50" }, { day: "4", hour: "21", min: "50" }, { day: "5", hour: "18", min: "50" }, { day: "5", hour: "21", min: "50" }, { day: "6", hour: "18", min: "50" }, { day: "6", hour: "21", min: "50" }, { day: "7", hour: "18", min: "50" }, { day: "7", hour: "21", min: "50" }], ADVENTURE_ISLAND_OPENING = [{ day: "1", hour: "21", min: "00" }, { day: "1", hour: "23", min: "00" }, { day: "2", hour: "21", min: "00" }, { day: "2", hour: "23", min: "00" }, { day: "3", hour: "21", min: "00" }, { day: "3", hour: "23", min: "00" }, { day: "4", hour: "21", min: "00" }, { day: "4", hour: "23", min: "00" }, { day: "5", hour: "21", min: "00" }, { day: "5", hour: "23", min: "00" }, { day: "6", hour: "21", min: "00" }, { day: "6", hour: "23", min: "00" }, { day: "7", hour: "21", min: "00" }, { day: "7", hour: "23", min: "00" }], GESBROY_OPENING = [{ day: "1", hour: "18", min: "20" }, { day: "1", hour: "19", min: "20" }, { day: "1", hour: "20", min: "20" }, { day: "2", hour: "18", min: "20" }, { day: "2", hour: "19", min: "20" }, { day: "2", hour: "20", min: "20" }, { day: "3", hour: "18", min: "20" }, { day: "3", hour: "19", min: "20" }, { day: "3", hour: "20", min: "20" }, { day: "4", hour: "18", min: "20" }, { day: "4", hour: "19", min: "20" }, { day: "4", hour: "20", min: "20" }, { day: "5", hour: "18", min: "20" }, { day: "5", hour: "19", min: "20" }, { day: "5", hour: "20", min: "20" }, { day: "6", hour: "18", min: "20" }, { day: "6", hour: "19", min: "20" }, { day: "6", hour: "20", min: "20" }, { day: "7", hour: "18", min: "20" }, { day: "7", hour: "19", min: "20" }, { day: "7", hour: "20", min: "20" }];

var prioTaskEnCours = 1;
var prioTaskEnCoursMax = 130;

$(document).ready(function () {
    // SHOW MODAL NEXT EVENT
    let nextTaskModal = new bootstrap.Modal(document.getElementById('nextTaskModal'), {});
    nextTaskModal.show();

    // RESET DAILY
    if (db.get("resetDaily").value() === undefined) db.set("resetDaily", "").save();
    else resetDaily();

    // RESET WEEKLY
    if (db.get("resetWeekly").value() === undefined) db.set("resetWeekly", "").save();
    else resetWeekly();

    // SHOW PERSOS
    if (db.get("personnages").value() === undefined) db.set("personnages", []).save();
    else if (db.get("personnages").value().length > 0) showPerso();

    // SHOW TASKS
    if (db.get("tasks").value() === undefined) db.set("tasks", []).save();
    else if (db.get("tasks").value().length > 0) showTask();

    // SHOW TIMES
    if (db.get("times").value() === undefined) db.set("times", []).save();
    else if (db.get("times").value().length > 0) showTimes();

    // GROUPE
    if (db.get("groupeEnCours").value() === undefined) db.set("groupeEnCours", 1).save();

    // SHOW TIME ON MODAL
    showTime();

    $(`#sectionEvent`).html('');
    nextEventTask();

    taskEnCours = [];
    $(`#sectionDaily`).html('');
    nextTask();
});

// AJOUT, MAJ, SUPPRESSION D'UN PERSONNAGE
$(document).on('change', '.inputMajPerso', function () { updatePerso($(this)) });
$(document).on('click', '.deletePerso', function () { deletePerso($(this)) });
$(document).on('click', '#savePerso', function () { addPerso() });
$(document).on('click', '.modalDetailPerso', function () { modalDetailPerso($(this).data('index')) });

// AJOUT, MAJ, SUPPRESSION D'UNE TACHE
$(document).on('change', '.inputMajTask', function () { updateTask($(this)) });
$(document).on('change', '.switchMajTask', function () { updateSwitchTask($(this)) });
$(document).on('click', '.deleteTask', function () { deleteTask($(this)) });
$(document).on('click', '#saveTask', function () { addTask() });

// AJOUT, MAJ, SUPPRESSION D'UN TEMPS
$(document).on('change', '.inputMajTimes', function () { updateTimes($(this)) });
$(document).on('click', '.deleteTimes', function () { deleteTimes($(this)) });
$(document).on('click', '#saveTime', function () { addTimes() });

// IMPORT EXPORT JSON DATA
$(document).on('click', '#btnExportJson', function () { exportToJsonFile({ personnage: db.get("personnages").value(), tasks: db.get("tasks").value() }) });
$(document).on('change', '#importFile', function (e) { startRead(e); });

function nextEventTask() {
    let eventTasks = getEventTask();

    minutesBeforeNextEvent = 55;
    eventTaskPrio = null;
    indexEventTaskPrio = 0;
    isEventTask = false;

    $(`#sectionEvent`).html('');

    eventTasks.forEach(function (task) {
        minutesBeforeNextEvent = 55;
        // console.log('nextEventTask task => ', task);
        db.get("times").value().forEach(function (time) {
            // console.log('nextEventTask time => ', time);

            if (task.openingTask == time.typeEvent) {
                // console.log('nextEventTask calcul => ', calculMinBeforeEvent(time, task));
                if (calculMinBeforeEvent(time, task)) {
                    // console.log('nextEventTask showOnModal => ', task);
                    showOnModal('Event', task);
                }
            }
        });
    });

    // showOnModal('Event', eventTaskPrio);
}

function nextTask() {

    db.get("tasks").value().forEach(function (task) {
        // console.log(task);
        if (task.prioTask == prioTaskEnCours && !task.statutTask && task.openingTask.length == 0 && taskEnCours.length < 3) {
            // console.log(task);
            taskEnCours.push(task);
        }
    });

    if (taskEnCours.length < 3 && prioTaskEnCours < prioTaskEnCoursMax) {
        prioTaskEnCours++
        nextTask();
    } else {
        // console.log('nextTask => ', taskEnCours);
        taskEnCours.forEach(function (task) {
            showOnModal('Daily', task, getPerso(taskEnCours[0]));
            showStatsOnModal(getPerso(taskEnCours[0]), 'sectionStatsPerso');
        });
    }
}

function getEventTask() {
    let eventTasks = [];

    db.get("tasks").value().forEach(function (task) {
        if (task.openingTask && task.openingTask.length > 0) eventTasks.push(task);
    });

    return eventTasks;
}

function getIndexTask(task) {
    let index = 0;

    db.get("tasks").value().forEach(function (t, i) {
        if (task == t) index = i;
    });

    return index;
}

function getTasksFromPersoIndex(index) {
    let tasks = [];
    let perso = null;

    db.get("personnages").value().forEach(function (p, i) {
        if (index == i) perso = p;
    });

    db.get("tasks").value().forEach(function (t, i) {
        if (t.persoTask == perso.typePerso) tasks.push(t);
    });

    return tasks;
}

function getPerso(task) {
    let perso = null;

    db.get("personnages").value().forEach(function (p, index) {
        if (task.persoTask == p.typePerso) {
            perso = p;
        }
    });

    return perso;
}

function showOnModal(resetType, task, perso = null) {
    let htmlevent = '';

    if (perso) {
        $('#nextTaskPersoImg').attr('src', `images/${perso.imagePerso}`);
        $('#badge-gearlevel-nextTaskModal').html(perso.gearlevel);
    }

    if (task) {
        let index = getIndexTask(task);
        htmlevent = `<div><div class="card-body" style="padding: 0rem 1rem;">
            <div class="card mb-3">
                <div class="d-flex">
                    <img src="images/${task.imageTask}" class="img-fluid rounded-start" alt="" style="max-height: 120px; min-width: 80px; max-width:180px;">
                    <div class="card-body">
                        ${task.nomTask}<br>
                        <i class="color-gray">${task.typeTask} - ${task.dureeTask} min - ${task.persoTask}</i>
                        <div class="form-check form-switch float-end">
                            <input class="form-check-input switchMajTask" data-index="${index}" data-champs="statutTask" type="checkbox" id="statutTask${index}">
                        </div>
                    </div>
                </div>
            </div>
        </div></div>`;

    } else {
        htmlevent = `<div class="card-body" style="padding: 0rem 1rem;">
            <div class="card mb-3">
                <div class="d-flex">
                    <img src="images/success.avif" class="img-fluid rounded-start" alt="" style="max-height: 120px; min-width: 80px; max-width:180px;">
                    <div class="card-body">Aucune tâche restante !</div>
                </div>
            </div>
        </div>`;
    }

    $(`#section${resetType}`).append(htmlevent);
}

function showStatsOnModal(perso, div) {
    if (perso) {
        let dureeTotalWeeklyPerso = 0;
        let dureeTotalDailyPerso = 0;
        let dureeDoneWeeklyPerso = 0;
        let dureeDoneDailyPerso = 0;
        let nbTotalWeeklyTask = 0;
        let nbTotalDailyTask = 0;
        let nbDoneWeeklyTask = 0;
        let nbDoneDailyTask = 0;

        db.get("tasks").value().forEach(function (task) {
            // console.log('showStatsOnModal task => ', task.persoTask)
            // console.log('showStatsOnModal perso => ', perso.persoTask)

            if (task.persoTask === perso.typePerso) {
                // console.log('showStatsOnModal perso => ', perso)

                if (task.statutTask) {
                    if (task.resetTask == 'Daily') {
                        dureeDoneDailyPerso += parseInt(task.dureeTask);
                        nbDoneDailyTask++;
                    } else {
                        dureeDoneWeeklyPerso += parseInt(task.dureeTask);
                        nbDoneWeeklyTask++;
                    }

                }

                if (task.resetTask == 'Daily') {
                    dureeTotalDailyPerso += parseInt(task.dureeTask);
                    nbTotalDailyTask++;
                } else {
                    dureeTotalWeeklyPerso += parseInt(task.dureeTask);
                    nbTotalWeeklyTask++;
                }

            }
        });

        // console.log('showStatsOnModal dureeTotalPerso => ', dureeTotalPerso)
        // console.log('showStatsOnModal dureeRestantePerso => ', dureeRestantePerso)
        // console.log('showStatsOnModal nbTotalTask => ', nbTotalTask)
        // console.log('showStatsOnModal nbRestanteTask => ', nbRestanteTask)

        let pDailyTask = (nbDoneDailyTask * 100) / nbTotalDailyTask;
        let pWeeklyTask = (nbDoneWeeklyTask * 100) / nbTotalWeeklyTask;

        let html = `
            <div style="display: flex;gap: 10px;justify-content: space-evenly;margin-left: 15px;margin-right: 15px;">
                <div class="card" style="width: 18rem;flex-grow: 1;">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Daily ${toHoursAndMinutes(dureeDoneDailyPerso)} / ${toHoursAndMinutes(dureeTotalDailyPerso)} --- ${nbDoneDailyTask} / ${nbTotalDailyTask}</h6>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${pDailyTask}%" aria-valuenow="${pDailyTask}" aria-valuemin="0" aria-valuemax="${nbTotalDailyTask}"></div>
                        </div>
                    </div>
                </div>

                <div class="card" style="width: 18rem;flex-grow: 1;">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Weekly ${toHoursAndMinutes(dureeDoneWeeklyPerso)} / ${toHoursAndMinutes(dureeTotalWeeklyPerso)} --- ${nbDoneWeeklyTask} / ${nbTotalWeeklyTask}</h6>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${pWeeklyTask}%" aria-valuenow="${pWeeklyTask}" aria-valuemin="0" aria-valuemax="${nbTotalWeeklyTask}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $(`#${div}`).html(html);
    }
}

function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function calculMinBeforeEvent(opening, task) {
    // console.log('-------- calculMinBeforeEvent ----------');
    // console.log('opening => ', opening);
    // console.log('task => ', task);

    let now = moment();
    let end = moment().isoWeekday(parseInt(opening.day)).set('hour', opening.hour).set('minute', opening.minute).set('second', 00);


    // console.log('now => ', now);
    // console.log('end => ', end);

    let diff = moment.duration(end.diff(now));

    let minutesBeforeEvent = Math.round(diff.as('minutes'));

    // console.log('calculMinBeforeEvent => ', minutesBeforeEvent);

    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0 && !task.statutTask) {
        return true;
    } else {
        return false;
    }
}

function getNextOpening(task) {
    switch (task.openingTask) {
        case 'Chaos Gate':
            CHAOS_GATE_OPENING.forEach(function (opening) {
                calculMinBeforeEvent(opening, task);
            });
            break;

        case 'Alakkir':
            ALAKKIR_OPENING.forEach(function (opening) {
                calculMinBeforeEvent(opening, task);
            });
            break;

        case 'Adventure Island Daily':
            ADVENTURE_ISLAND_OPENING.forEach(function (opening) {
                calculMinBeforeEvent(opening, task);
            });
            break;

        case 'World Boss':
            WORLD_BOSS_OPENING.forEach(function (opening) {
                calculMinBeforeEvent(opening, task);
            });
            break;

        case 'Gesbroy':
            GESBROY_OPENING.forEach(function (opening) {
                calculMinBeforeEvent(opening, task);
            });
            break;

        default:
            break;
    }
}

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

        showTask();

        let groupeEnCours = parseInt(db.get("groupeEnCours").value());

        groupeEnCours++;
        if (groupeEnCours > 3) {
            groupeEnCours = 1;
        }

        db.get('groupeEnCours').set(groupeEnCours);
        db.save();
    }

    let main = null;
    let groupe1 = [];
    let groupe2 = [];
    let groupe3 = [];

    db.get("personnages").value().forEach(function (p, i) {

        switch (p.groupePerso) {
            case 'Main':
                main = p;
                break;

            case '1':
                groupe1.push(p);
                break;

            case '2':
                groupe2.push(p);
                break;

            case '3':
                groupe3.push(p);
                break;

            default:
                break;
        }
    });

    let htmlg1 = 'Groupe 1 :<br>';

    groupe1.forEach(function (p, i) {
        htmlg1 += `&nbsp;- ${p.typePerso}<br>`;
    });

    let htmlg2 = 'Groupe 2 :<br>';

    groupe2.forEach(function (p, i) {
        htmlg2 += `&nbsp;- ${p.typePerso}<br>`;
    });

    let htmlg3 = 'Groupe 3 :<br>';

    groupe3.forEach(function (p, i) {
        htmlg3 += `&nbsp;- ${p.typePerso}<br>`;
    });

    let html = `
            <div>
                <div style="padding: 10px;background-color: green;color: white">Main -> ${main.typePerso}</div>
                <hr>
                <div style="padding: 10px;color: white;${ parseInt(db.get("groupeEnCours").value()) == 1 ? 'background-color: green;' : 'background-color: darkgoldenrod;' }">${htmlg1}</div>
                <hr>
                <div style="padding: 10px;color: white;${ parseInt(db.get("groupeEnCours").value()) == 2 ? 'background-color: green;' : 'background-color: darkgoldenrod;' }">${htmlg2}</div>
                <hr>
                <div style="padding: 10px;color: white;${ parseInt(db.get("groupeEnCours").value()) == 3 ? 'background-color: green;' : 'background-color: darkgoldenrod;' }">${htmlg3}</div>
            </div>
        `;

    $('#sectionGroupe').html(html);
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

function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function startRead(evt) {
    let file = document.getElementById('importFile').files[0];
    if (file) {
        getAsText(file);
        // console.log("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
    }
}

function getAsText(readFile) {
    let reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
}

function loaded(evt) {
    let fileString = evt.target.result;
    fileJSON = JSON.parse(fileString);

    db.get("personnages").set(fileJSON.personnage);
    db.get("tasks").set(fileJSON.tasks);

    db.save();

    showPerso();
    showTask();
}

function showPerso() {
    let listeHtmlPerso = `
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Nom</th>
                <th scope="col">Priorité</th>
                <th scope="col">Niveau</th>
                <th scope="col">Equipement</th>
                <th scope="col">Groupe</th>
                <th scope="col">Image</th>
                <th scope="col">Détail</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>`;

    db.get("personnages").value().forEach((perso, index) => {

        listeHtmlPerso += `
        <tr>
            <th scope="row">${perso.typePerso}</th>
            <td>${perso.nom}</td>
            <td><input type="number" class="form-control inputMajPerso" data-index="${index}" data-champs="prioPerso" value="${perso.prioPerso}"/></td>
            <td><input type="number" class="form-control inputMajPerso" data-index="${index}" data-champs="level" value="${perso.level}"/></td>
            <td><input type="number" class="form-control inputMajPerso" data-index="${index}" data-champs="gearlevel" value="${perso.gearlevel}"/></td>
            <td><input list="groupeOptions" class="form-control inputMajPerso" data-index="${index}" data-champs="groupePerso" value="${perso.groupePerso}"/></td>
            <td><input type="text" class="form-control inputMajPerso" data-index="${index}" data-champs="imagePerso" value="${perso.imagePerso}"/></td>
            <td><button class="btn btn-success modalDetailPerso" data-index="${index}" data-bs-toggle="modal" data-bs-target="#detailPersoModal"><i class="fa-solid fa-eye"></i></button></td>
            <td><button class="btn btn-danger deletePerso" data-index="${index}"><i class="fa-solid fa-minus"></i></button></td>
        </tr>`;
    });

    listeHtmlPerso += `</tbody></table>`;

    $('#sectionPersonnage').html(listeHtmlPerso);
}

function getColorFromTask(task) {
    console.log('getColorFromTask => ', task.resetTask)
    switch (task.resetTask) {
        case 'Daily':
            return 'taskRed';
        case 'Weekly':
            return 'taskBlue';
        default:
            return 'taskGray';
    }
}

function modalDetailPerso(index) {
    let tasks = getTasksFromPersoIndex(index);
    let html = '';

    if (tasks) {
        tasks.sort((a, b) => {
            return a.prioTask - b.prioTask;
        });

        tasks.forEach((task, i) => {
            if (!task.statutTask) {
                let j = getIndexTask(task);
                let color = getColorFromTask(task);
                html += `
                <div style="flex-grow: 1;>
                    <div class="card-body " style="padding: 0rem 1rem;">
                        <div class="card mb-3">
                            <div class="d-flex">
                                <div class="card-body ${color}">
                                    ${task.nomTask}<br>
                                    <i class="color-gray">${task.typeTask} - ${task.dureeTask} min - ${task.persoTask}</i>
                                    <div class="form-check form-switch float-end">
                                        <input class="form-check-input switchMajTask" data-index="${j}" data-champs="statutTask" type="checkbox" id="statutTaskDetail${j}" ${task.statutTask ? 'checked' : ''}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        });

    }

    $(`#divDetailPersoModal`).html(html);

    showStatsOnModal(getPerso(tasks[0]), 'sectionStatsDetailPerso');
}

function addPerso() {
    let typePerso = $('#typePerso').val();
    let nom = $('#nom').val();
    let prioPerso = $('#prioPerso').val();
    let level = $('#level').val();
    let gearlevel = $('#gearlevel').val();
    let groupePerso = $('#groupePerso').val();
    let imagePerso = $('#imagePerso').val();

    let perso = {
        'typePerso': typePerso,
        'nom': nom,
        'prioPerso': prioPerso,
        'level': level,
        'gearlevel': gearlevel,
        'groupePerso': groupePerso,
        'imagePerso': imagePerso,
    };

    db.get("personnages").push(perso).save();
    db.save();

    showPerso();
}

function updatePerso(data) {
    let value = data.val();
    let index = data.data('index');
    let champs = data.data('champs');

    db.get("personnages")
        .get(index)
        .get(champs)
        .set(value);
    db.save();

    showPerso();
}

function deletePerso(data) {
    let index = data.data('index');

    db.get("personnages").get(index).delete(true);
    db.save();

    showPerso();
}

function showTask() {
    let listeHtmlTask = `
    <table id="tableTask" class="table">
        <thead>
            <tr>
                <th scope="col">Personnage</th>
                <th scope="col">Type</th>
                <th scope="col">Reset Type</th>
                <th scope="col">Nom</th>
                <th scope="col">Priorité</th>
                <th scope="col">Durée</th>
                <th scope="col">Ouverture</th>
                <th scope="col">Image</th>
                <th scope="col">Statut</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>`;

    db.get("tasks").value().forEach((task, index) => {

        listeHtmlTask += `
        <tr>
            <th scope="row">${task.persoTask}</th>
            <td>${task.typeTask}</td>
            <td><input list="resetTypeOptions" class="form-control inputMajTask" data-index="${index}" data-champs="resetTask" value="${task.resetTask}"/></td>
            <td><input type="text" class="form-control inputMajTask" data-index="${index}" data-champs="nomTask" value="${task.nomTask}"/></td>
            <td><input type="number" class="form-control inputMajTask" data-index="${index}" data-champs="prioTask" value="${task.prioTask}"/></td>
            <td><input type="number" class="form-control inputMajTask" data-index="${index}" data-champs="dureeTask" value="${task.dureeTask}"/></td>
            <td><input list="openingOptions" class="form-control inputMajTask" data-index="${index}" data-champs="openingTask" value="${task.openingTask}"/></td>
            <td><input type="text" class="form-control inputMajTask" data-index="${index}" data-champs="imageTask" value="${task.imageTask}"/></td>
            <td>
                <div class="form-check form-switch">
                    <input class="form-check-input switchMajTask" data-index="${index}" data-champs="statutTask" type="checkbox" id="statutTask${index}" ${task.statutTask ? 'checked' : ''}>
                </div>
            </td>
            <td><button class="btn btn-danger deleteTask" data-index="${index}"><i class="fa-solid fa-minus"></i></button></td>
        </tr>`;
    });

    listeHtmlTask += `</tbody></table>`;

    $('#sectionTasks').html(listeHtmlTask);
    table = $('#tableTask').DataTable({
        stateSave: true
    });
}

function addTask() {
    let persoTask = $('#persoTask').val();
    let typeTask = $('#typeTask').val();
    let resetTask = $('#resetTask').val();
    let nomTask = $('#nomTask').val();
    let prioTask = $('#prioTask').val();
    let dureeTask = $('#dureeTask').val();
    let openingTask = $('#openingTask').val();
    let imageTask = $(`option[value="${typeTask}"]`).data('image');

    let task = {
        'persoTask': persoTask,
        'typeTask': typeTask,
        'resetTask': resetTask,
        'nomTask': nomTask,
        'prioTask': prioTask,
        'dureeTask': dureeTask,
        'imageTask': imageTask,
        'openingTask': openingTask,
        'statutTask': false
    };

    db.get("tasks").push(task).save();
    db.save();

    showTask();
}

function updateTask(data) {
    let value = data.val();
    let index = data.data('index');
    let champs = data.data('champs');

    db.get("tasks")
        .get(index)
        .get(champs)
        .set(value);
    db.save();

    showTask();
}

function updateSwitchTask(data) {
    let value = data.prop('checked');
    let index = data.data('index');
    let champs = data.data('champs');

    db.get("tasks")
        .get(index)
        .get(champs)
        .set(value);
    db.save();

    if (db.get('tasks').get(index).get('openingTask').value().length > 0) {
        nextEventTask();
    }

    if (db.get('tasks').get(index).get('openingTask').value().length == 0) {
        if (db.get('tasks').get(index).get('resetTask').value() == 'Unique') {
            db.get("tasks").get(index).delete(true);
            db.save();
        }

        taskEnCours = [];
        prioTaskEnCours = 1;
        $(`#sectionDaily`).html('');
        nextTask();
    }
}

function deleteTask(data) {
    let index = data.data('index');

    db.get("tasks").get(index).delete(true);
    db.save();

    showTask();
}

function showTimes() {
    $('#typeEventOptions').html('');
    let typeEventOptions = [];

    db.get("times").value().forEach(function (time, index) {
        // console.log("times.forEach => ", time);
        if (typeEventOptions.indexOf(time.typeEvent) === -1) {
            typeEventOptions.push(time.typeEvent);
        }
    });

    // console.log("typeEventOptions => ", typeEventOptions);

    typeEventOptions.forEach(function (time, index) {
        // console.log("typeEventOptions.forEach => ", time);
        $('#typeEventOptions').append(`<option value="${time}"></option>`);
    });


    let listeHtmlTimes = `
    <table id="tableTimes" class="table">
        <thead>
            <tr>
                <th scope="col">Type Event</th>
                <th scope="col">Day</th>
                <th scope="col">Hour</th>
                <th scope="col">Minute</th>
            </tr>
        </thead>
        <tbody>`;

    db.get("times").value().forEach((time, index) => {

        listeHtmlTimes += `
        <tr>
            <th scope="row">${time.typeEvent}</th>
            <td><input type="number" class="form-control inputMajTimes" data-index="${index}" data-champs="day" value="${time.day}"/></td>
            <td><input type="number" class="form-control inputMajTimes" data-index="${index}" data-champs="hour" value="${time.hour}"/></td>
            <td><input type="number" class="form-control inputMajTimes" data-index="${index}" data-champs="minute" value="${time.minute}"/></td>
            <td><button class="btn btn-danger deleteTimes" data-index="${index}"><i class="fa-solid fa-minus"></i></button></td>
        </tr>`;
    });

    listeHtmlTimes += `</tbody></table>`;

    $('#sectionTimes').html(listeHtmlTimes);
}

function addTimes() {
    let typeEvent = $('#typeEvent').val();
    let day = $('#day').val();
    let hour = $('#hour').val();
    let minute = $('#minute').val();

    let time = {
        'typeEvent': typeEvent,
        'day': day,
        'hour': hour,
        'minute': minute
    };

    db.get("times").push(time).save();
    db.save();

    showTimes();
}

function updateTimes(data) {
    let value = data.val();
    let index = data.data('index');
    let champs = data.data('champs');

    db.get("times")
        .get(index)
        .get(champs)
        .set(value);
    db.save();

    showTimes();
}

function deleteTimes(data) {
    let index = data.data('index');

    db.get("times").get(index).delete(true);
    db.save();

    showTimes();
}

function showTime() {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let time = h + ":" + m + ":" + s;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);
}

