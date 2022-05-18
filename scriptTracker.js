// https://github.com/TomPrograms/stormdb

// CREATION DE LA TABLE PERSONNAGE
const enginePerso = new BrowserEngine("dbperso");
const dbPerso = new StormDB(enginePerso);

// CREATION DE LA TABLE TASKS
const engineTask = new BrowserEngine("dbtask");
const dbTask = new StormDB(engineTask);

const CHAOS_GATE_OPENING = [
    {
        'day': '1',
        'hour': '05',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '06',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '07',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '08',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '09',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '10',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '11',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '12',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '13',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '14',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '15',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '16',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '17',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '18',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '19',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '20',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '22',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '23',
        'min': '00'
    }
];

const WORLD_BOSS_OPENING = [
    {
        'day': '2',
        'hour': '05',
        'min': '00'
    }
]

const ALAKKIR_OPENING = [
    {
        'day': '1',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '1',
        'hour': '21',
        'min': '50'
    },
    {
        'day': '2',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '2',
        'hour': '21',
        'min': '50'
    },
    {
        'day': '3',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '3',
        'hour': '21',
        'min': '50'
    },
    {
        'day': '4',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '4',
        'hour': '21',
        'min': '50'
    },
    {
        'day': '5',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '5',
        'hour': '21',
        'min': '50'
    },
    {
        'day': '6',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '6',
        'hour': '21',
        'min': '50'
    },
    {
        'day': '7',
        'hour': '18',
        'min': '50'
    },
    {
        'day': '7',
        'hour': '21',
        'min': '50'
    },
];

const ADVENTURE_ISLAND_OPENING = [
    {
        'day': '1',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '1',
        'hour': '23',
        'min': '00'
    },
    {
        'day': '2',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '2',
        'hour': '23',
        'min': '00'
    },
    {
        'day': '3',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '3',
        'hour': '23',
        'min': '00'
    },
    {
        'day': '4',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '4',
        'hour': '23',
        'min': '00'
    },
    {
        'day': '5',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '5',
        'hour': '23',
        'min': '00'
    },
    {
        'day': '6',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '6',
        'hour': '23',
        'min': '00'
    },
    {
        'day': '7',
        'hour': '21',
        'min': '00'
    },
    {
        'day': '7',
        'hour': '23',
        'min': '00'
    },
];

const GESBROY_OPENING = [
    {
        'day': '1',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '1',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '1',
        'hour': '20',
        'min': '20'
    },
    {
        'day': '2',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '2',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '2',
        'hour': '20',
        'min': '20'
    },
    {
        'day': '3',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '3',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '3',
        'hour': '20',
        'min': '20'
    },
    {
        'day': '4',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '4',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '4',
        'hour': '20',
        'min': '20'
    },
    {
        'day': '5',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '5',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '5',
        'hour': '20',
        'min': '20'
    },
    {
        'day': '6',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '6',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '6',
        'hour': '20',
        'min': '20'
    },
    {
        'day': '7',
        'hour': '18',
        'min': '20'
    },
    {
        'day': '7',
        'hour': '19',
        'min': '20'
    },
    {
        'day': '7',
        'hour': '20',
        'min': '20'
    },
]


var minutesBeforeNextEvent = 300;
var persoPrio = null;
var intervalEvent = null;
var table = null;
var eventTasks = [];
var eventTaskPrio = null;
var indexEventTaskPrio = 0;
var isEventTask = false;
var prioPersoEnCours = 1;
var prioTaskEnCours = 1;
var prioTaskWeeklyEnCours = 1;
var prioTaskUniqueEnCours = 1;
var persoEnCours = null;
var persoTempEnCours = null;
var taskEnCours = null;
var taskWeeklyEnCours = null;
var taskUniqueEnCours = null;
var indexTaskEnCours = 0;
var indexTaskWeeklyEnCours = 0;
var indexTaskUniqueEnCours = 0;
var resetTypes = ['Daily'];
var prioMaximumTask = 10;
var prioMaximumTaskWeekly = 10;
var prioMaximumTaskUnique = 10;
var prioMaximumPerso = 10;

// AJOUT, MAJ, SUPPRESSION D'UN PERSONNAGE
$(document).on('change', '.inputMajPerso', function () { updatePerso($(this)) });
$(document).on('click', '.deletePerso', function () { deletePerso($(this)) });
$(document).on('click', '#savePerso', function () { addPerso() });

// AJOUT, MAJ, SUPPRESSION D'UNE TACHE
$(document).on('change', '.inputMajTask', function () { updateTask($(this)) });
$(document).on('change', '.switchMajTask', function () { updateSwitchTask($(this)) });
$(document).on('click', '.deleteTask', function () { deleteTask($(this)) });
$(document).on('click', '#saveTask', function () { addTask() });


// $(document).on('click', '#btnNextTask', function () { nextEvent() });

$(document).on('click', '#btnExportJson', function () { exportToJsonFile({ personnage: dbPerso.get("personnages").value(), tasks: dbTask.get("tasks").value() }) });
$(document).on('change', '#importFile', function (e) { startRead(e); });

$(document).ready(function () {
    var nextTaskModal = new bootstrap.Modal(document.getElementById('nextTaskModal'), {});
    nextTaskModal.show();

    if (dbTask.get("resetDaily").value() === undefined) {
        dbTask.set("resetDaily", "").save();
    } else {
        resetDaily();
    }

    if (dbTask.get("resetWeekly").value() === undefined) {
        dbTask.set("resetWeekly", "").save();
    } else {
        resetWeekly();
    }

    if (dbPerso.get("personnages").value() === undefined) {
        dbPerso.set("personnages", []).save();
    } else if (dbPerso.get("personnages").value().length > 0) {
        showPerso();
    }

    if (dbTask.get("tasks").value() === undefined) {
        dbTask.set("tasks", []).save();
    } else if (dbTask.get("tasks").value().length > 0) {
        showTask();
    }

    // nextEvent();
    // refreshEvent();
    showTime();
    calculTask();
    // console.log(dbTask.get("tasks").value()) 
});

function refreshEvent() {
    intervalEvent = setInterval(nextEvent, 100000);
}

function stopRefreshEvent() {
    clearInterval(intervalEvent);
}

function nextEvent() {
    minutesBeforeNextEvent = 9999;
    nextTypeEvent('Daily');
    nextTypeEvent('Weekly');
    nextTypeEvent('Unique');
}

function resetDaily(resetVar, resetType) {
    if (dbTask.get('resetDaily').value() != moment().format('DD/MM/YYYY')) {
        dbTask.get('resetDaily').set(moment().format('DD/MM/YYYY'));
        dbTask.save();

        console.log(dbTask.get('resetDaily').value())

        let tasks = dbTask.get("tasks").value();

        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].resetTask == 'Daily') {
                dbTask.get("tasks")
                    .get(j)
                    .get('statutTask')
                    .set(false);

                dbTask.save();
            }
        }

        showTask();
    }
}

function resetWeekly() {
    if (dbTask.get('resetWeekly').value() != moment().format('DD/MM/YYYY') && moment().format('E') == 4) {
        dbTask.get('resetWeekly').set(moment().format('DD/MM/YYYY'));
        dbTask.save();

        console.log(dbTask.get('resetWeekly').value())

        let tasks = dbTask.get("tasks").value();

        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].resetTask == 'Weekly') {
                dbTask.get("tasks")
                    .get(j)
                    .get('statutTask')
                    .set(false);

                dbTask.save();
            }
        }

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
        console.log("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
    }
}

function getAsText(readFile) {
    let reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
}

function loaded(evt) {
    console.log("File Loaded Successfully");
    let fileString = evt.target.result;
    console.log(fileString)

    fileJSON = JSON.parse(fileString);

    dbPerso.get("personnages").set(fileJSON.personnage);
    dbTask.get("tasks").set(fileJSON.tasks);

    dbPerso.save();
    dbTask.save();

    showPerso();
    showTask();
}

function getOpening(type) {


    switch (type) {
        case 'Chaos Gate':
            return CHAOS_GATE_OPENING.filter(
                function (data) {
                    // console.log(data.day)
                    // console.log(moment().isoWeekday(parseInt(data.day)).set('hour', 12).set('minute', 00).set('second', 00))
                    let now = moment();
                    let end = moment().isoWeekday(parseInt(data.day)).set('hour', parseInt(data.hour)).set('minute', parseInt(data.min)).set('second', 00)

                    // console.log(now)
                    // console.log(end)

                    let diff = moment.duration(end.diff(now));

                    let minutesBeforeEvent = Math.round(diff.as('minutes'));

                    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0) {
                        minutesBeforeNextEvent = minutesBeforeEvent;
                    }

                    // console.log(minutesBeforeEvent)
                    return minutesBeforeEvent >= 0 && minutesBeforeEvent <= 50
                }
            );

        case 'Alakkir':
            return ALAKKIR_OPENING.filter(
                function (data) {
                    // console.log(data.day)
                    // console.log(moment().isoWeekday(parseInt(data.day)).set('hour', 12).set('minute', 00).set('second', 00))
                    let now = moment();
                    let end = moment().isoWeekday(parseInt(data.day)).set('hour', parseInt(data.hour)).set('minute', parseInt(data.min)).set('second', 00)

                    // console.log(now)
                    // console.log(end)

                    let diff = moment.duration(end.diff(now));

                    let minutesBeforeEvent = Math.round(diff.as('minutes'));

                    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0) {
                        minutesBeforeNextEvent = minutesBeforeEvent;
                    }

                    // console.log(minutesBeforeEvent)
                    return minutesBeforeEvent >= 0 && minutesBeforeEvent <= 50
                }
            );

        case 'Adventure Island Daily':
            return ADVENTURE_ISLAND_OPENING.filter(
                function (data) {
                    // console.log(data.day)
                    // console.log(moment().isoWeekday(parseInt(data.day)).set('hour', 12).set('minute', 00).set('second', 00))
                    let now = moment();
                    let end = moment().isoWeekday(parseInt(data.day)).set('hour', parseInt(data.hour)).set('minute', parseInt(data.min)).set('second', 00)

                    // console.log(now)
                    // console.log(end)

                    let diff = moment.duration(end.diff(now));

                    let minutesBeforeEvent = Math.round(diff.as('minutes'));

                    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0) {
                        minutesBeforeNextEvent = minutesBeforeEvent;
                    }

                    // console.log(minutesBeforeEvent)
                    return minutesBeforeEvent >= 0 && minutesBeforeEvent <= 50
                }
            );

        case 'World Boss':
            return WORLD_BOSS_OPENING.filter(
                function (data) {
                    // console.log(data.day)
                    // console.log(moment().isoWeekday(parseInt(data.day)).set('hour', 12).set('minute', 00).set('second', 00))
                    let now = moment();
                    let end = moment().isoWeekday(parseInt(data.day)).set('hour', parseInt(data.hour)).set('minute', parseInt(data.min)).set('second', 00)

                    // console.log(now)
                    // console.log(end)

                    let diff = moment.duration(end.diff(now));

                    let minutesBeforeEvent = Math.round(diff.as('minutes'));

                    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0) {
                        minutesBeforeNextEvent = minutesBeforeEvent;
                    }

                    // console.log(minutesBeforeEvent)
                    return minutesBeforeEvent >= 0 && minutesBeforeEvent <= 50
                }
            );

        case 'Gesbroy':
            return GESBROY_OPENING.filter(
                function (data) {
                    // console.log(data.day)
                    // console.log(moment().isoWeekday(parseInt(data.day)).set('hour', 12).set('minute', 00).set('second', 00))
                    let now = moment();
                    let end = moment().isoWeekday(parseInt(data.day)).set('hour', parseInt(data.hour)).set('minute', parseInt(data.min)).set('second', 00)

                    // console.log(now)
                    // console.log(end)

                    let diff = moment.duration(end.diff(now));

                    let minutesBeforeEvent = Math.round(diff.as('minutes'));

                    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0) {
                        minutesBeforeNextEvent = minutesBeforeEvent;
                    }

                    // console.log(minutesBeforeEvent)
                    return minutesBeforeEvent >= 0 && minutesBeforeEvent <= 50
                }
            );

        default:
            break;
    }
}

function calculTask() {
    console.log('CALCUL TASK');

    let tasks = dbTask.get("tasks").value();

    if (eventTasks.length == 0) getEventTask();

    // tasks.forEach(function (task) {
    //     console.log(task)
    // });

    console.log('eventTasks => ', eventTasks);

    minutesBeforeNextEvent = 300;
    eventTaskPrio = null;
    indexEventTaskPrio = 0;
    isEventTask = false;
    eventTasks.forEach(function (task) {
        getNextOpening(task);
    });

    console.log('minutesBeforeNextEvent => ', minutesBeforeNextEvent);
    console.log('eventTaskPrio => ', eventTaskPrio);

    if (taskEnCours == 'done') {
        getPersoPrio();
        console.log('All task done perso prio => ', persoEnCours)
    } else if (persoEnCours == null) {
        prioTaskEnCours = 1;
        prioTaskWeeklyEnCours = 1;
        prioTaskUniqueEnCours = 1;
        taskEnCours = null;
        taskWeeklyEnCours = null;
        taskUniqueEnCours = null;
        indexTaskEnCours = 0;
        indexTaskWeeklyEnCours = 0;
        indexTaskUniqueEnCours = 0;
        getPersoPrio();
    }

    console.log('persoEnCours => ', persoEnCours);

    if (taskEnCours == null) {
        prioTaskEnCours = 1;
        indexTaskEnCours = 0;
        getNextDailyTask(persoEnCours);
    }
    // clique sur la validation de la tache -> remettre taskEnCours a null et relancer function

    console.log('NextDailyTask => ', taskEnCours);

    if (taskEnCours && taskEnCours != 'done') {
        prioTaskWeeklyEnCours = 1;
        indexTaskWeeklyEnCours = 0;
        getNextWeeklyTask(persoEnCours);

        prioTaskUniqueEnCours = 1;
        indexTaskUniqueEnCours = 0;
        getNextUniqueTask(persoEnCours);

        showOnModal('Daily', taskEnCours, indexTaskEnCours, persoEnCours);
        showOnModal('Weekly', taskWeeklyEnCours, indexTaskWeeklyEnCours, persoEnCours);
        showOnModal('Unique', taskUniqueEnCours, indexTaskUniqueEnCours, persoEnCours);

        let keepGoing = true;

        if (isEventTask) {
            // do {
                setTimeout(refreshNextEvent, (minutesBeforeNextEvent - 1) * 60000);

                if ((parseInt(taskEnCours.dureeTask) + 2) < minutesBeforeNextEvent) {
                    keepGoing = true;
                } else {
                    getPerso(eventTaskPrio);

                    prioTaskWeeklyEnCours = 1;
                    indexTaskWeeklyEnCours = 0;
                    getNextWeeklyTask(persoTempEnCours);

                    prioTaskUniqueEnCours = 1;
                    indexTaskUniqueEnCours = 0;
                    getNextUniqueTask(persoTempEnCours);

                    showOnModal('Daily', eventTaskPrio, getIndexTask(eventTaskPrio), persoTempEnCours);
                    showOnModal('Weekly', taskWeeklyEnCours, indexTaskWeeklyEnCours, persoTempEnCours);
                    showOnModal('Unique', taskUniqueEnCours, indexTaskUniqueEnCours, persoTempEnCours);

                    keepGoing = false;
                }


            // } while (keepGoing);
        }

    } else if (isEventTask) {
        getPerso(eventTaskPrio);
        prioTaskWeeklyEnCours = 1;
        indexTaskWeeklyEnCours = 0;
        getNextWeeklyTask(persoTempEnCours);

        prioTaskUniqueEnCours = 1;
        indexTaskUniqueEnCours = 0;
        getNextUniqueTask(persoTempEnCours);

        showOnModal('Daily', eventTaskPrio, getIndexTask(eventTaskPrio), persoTempEnCours);
        showOnModal('Weekly', taskWeeklyEnCours, indexTaskWeeklyEnCours, persoTempEnCours);
        showOnModal('Unique', taskUniqueEnCours, indexTaskUniqueEnCours, persoTempEnCours);
    } else if (taskEnCours == 'done') {
        console.log('ALL DAILY TASK DONE')
        // search weekly and unique for champ
        // find -> show
        // not found 
            // -> prioPersoEnCours = 1;
            // -> calculTask();
    } else {
        console.log('SET ALL DAILY TASK DONE')
        taskEnCours = 'done';
        prioPersoEnCours = 1;
        calculTask();
    }
}

function showOnModal(resetType, task, index, perso) {
    if (task) {
        $('#nextTaskPersoImg').attr('src', `images/${perso.imagePerso}`);
        $('#badge-gearlevel-nextTaskModal').html(perso.gearlevel);
        $(`#next${resetType}TaskImg`).attr('src', `images/${task.imageTask}`);
        $(`#next${resetType}TaskName`).html(`
            ${task.nomTask}<br>
            <i class="color-gray">${task.typeTask} - ${task.dureeTask} min</i>
            <div class="form-check form-switch float-end">
                <input class="form-check-input switchMajTask" data-index="${index}" data-champs="statutTask" type="checkbox" id="statutTask${index}">
            </div>
        `);
    } else {
        $(`#next${resetType}TaskImg`).attr('src', `images/success.avif`);
        $(`#next${resetType}TaskName`).html(`DONE`);
    }
}

function refreshNextEvent() {
    minutesBeforeNextEvent = 300;
    eventTaskPrio = null;
    indexEventTaskPrio = 0;
    isEventTask = false;
    eventTasks.forEach(function (task) {
        getNextOpening(task);
    });
}

function getEventTask() {
    eventTasks = [];

    dbTask.get("tasks").value().forEach(function (task) {
        if (task.openingTask && task.openingTask.length > 0) eventTasks.push(task);
    });
}

function getIndexTask(task) {
    indexEventTaskPrio = 0;

    dbTask.get("tasks").value().forEach(function (t, index) {
        if (task.nomTask == t.nomTask) indexEventTaskPrio = index;
    });
}

function getPerso(task) {
    persoTempEnCours = null;

    dbPerso.get("personnages").value().forEach(function (p, index) {
        if (task.persoTask == p.typePerso) {
            persoTempEnCours = p;
        }
    });
}

function getPersoFromPrio(prio) {
    persoTempEnCours = null;

    dbPerso.get("personnages").value().forEach(function (p, index) {
        if (prio == p.prioPerso) {
            persoTempEnCours = p;
        }
    });
}

function getPersoPrio() {
    persoEnCours = null;

    dbPerso.get("personnages").value().forEach(function (perso) {
        if (perso.prioPerso == prioPersoEnCours) {
            persoEnCours = perso;
        }
    });
}

function getNextDailyTask(perso) {
    taskEnCours = null;
    // console.log('getNextDailyTask');
    if (!perso) {
        return;
    }

    dbTask.get("tasks").value().forEach(function (task, index) {
        // console.log('getNextDailyTask => ', task);
        if (task.prioTask == prioTaskEnCours && task.resetTask == 'Daily' && perso.typePerso == task.persoTask && !task.statutTask && task.openingTask.length == 0 && taskEnCours == null) {
            console.log('getNextDailyTask => ', task);
            if ((isEventTask && (parseInt(task.dureeTask) + 2) < minutesBeforeNextEvent) || !isEventTask) {
                taskEnCours = task;
                indexTaskEnCours = index;
            }
        }
    });

    if (taskEnCours == null) {
        if (prioTaskEnCours < prioMaximumTask) {
            console.log('call getNextDailyTask prio => ', prioTaskEnCours);
            prioTaskEnCours++;
            getNextDailyTask(perso);
        } else if (prioPersoEnCours < prioMaximumTask) {
            console.log('call getNextDailyTask prio => ', prioTaskEnCours);
            prioTaskEnCours = 1;
            prioPersoEnCours++;
            getPersoPrio()

            if (persoEnCours) getNextDailyTask(persoEnCours);
        }
    }
}

function getNextWeeklyTask(perso) {
    taskWeeklyEnCours = null;
    // console.log('getNextDailyTask');

    dbTask.get("tasks").value().forEach(function (task, index) {
        // console.log('getNextDailyTask => ', task);
        if (task.prioTask == prioTaskWeeklyEnCours && task.resetTask == 'Weekly' && perso.typePerso == task.persoTask && !task.statutTask && task.openingTask.length == 0 && taskWeeklyEnCours == null) {
            taskWeeklyEnCours = task;
            indexTaskWeeklyEnCours = index;
        }
    });

    if (taskWeeklyEnCours == null && prioTaskWeeklyEnCours < prioMaximumTaskWeekly) {
        prioTaskWeeklyEnCours++;
        getNextWeeklyTask(perso);
    }
}

function getNextUniqueTask(perso) {
    taskUniqueEnCours = null;
    // console.log('getNextDailyTask');

    dbTask.get("tasks").value().forEach(function (task, index) {
        // console.log('getNextDailyTask => ', task);
        if (task.prioTask == prioTaskUniqueEnCours && task.resetTask == 'Unique' && perso.typePerso == task.persoTask && !task.statutTask && task.openingTask.length == 0 && taskUniqueEnCours == null) {
            taskUniqueEnCours = task;
            indexTaskUniqueEnCours = index;
        }
    });

    if (taskUniqueEnCours == null && prioTaskUniqueEnCours < prioMaximumTaskUnique) {
        prioTaskUniqueEnCours++;
        getNextUniqueTask(perso);
    }
}

function calculMinBeforeEvent(opening, task) {
    let now = moment();
    let end = moment().isoWeekday(parseInt(opening.day)).set('hour', parseInt(opening.hour)).set('minute', parseInt(opening.min)).set('second', 00);

    let diff = moment.duration(end.diff(now));

    let minutesBeforeEvent = Math.round(diff.as('minutes'));

    if (minutesBeforeNextEvent > minutesBeforeEvent && minutesBeforeEvent > 0 && !task.statutTask) {
        minutesBeforeNextEvent = minutesBeforeEvent;
        eventTaskPrio = task;
        isEventTask = true;
    }
}

function getNextOpening(task) {
    // console.log('getNextOpening task => ', task);

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

function nextTypeEvent(resetType) {
    let prioPerso = 1;
    let prioTask = 1;
    let prioMax = 10;

    let persos = dbPerso.get("personnages").value();
    let tasks = dbTask.get("tasks").value();

    let persoEnPrio = null;
    let taskEnPrio = null;
    let i = 0;
    let j = 0;
    let k = 0;

    let taskEventPrio = null;
    let persoEventPrio = null;


    if (resetType == 'Daily') {
        for (k = 0; k < tasks.length; k++) {
            // console.log(tasks[k])

            if (!tasks[k].statutTask && tasks[k].openingTask.length > 0 && getOpening(tasks[k].openingTask).length > 0) {
                // console.log('EVENT')
                // console.log(tasks[k])
                // console.log(minutesBeforeNextEvent)
                findEventPrio = getOpening(tasks[k].openingTask);

                if (findEventPrio.length > 0) {
                    console.log(findEventPrio)

                    taskEventPrio = tasks[k];
                    // break;
                }
                // console.log(taskEventPrio)
            }
        }
    }

    console.log(taskEventPrio)
    console.log(minutesBeforeNextEvent)

    if (taskEventPrio) {
        for (i = 0; i < persos.length; i++) {
            if (persos[i].typePerso == taskEventPrio.persoTask) {
                persoEventPrio = persos[i];
                break;
            }
        }
    }


    while (taskEnPrio == null && prioPerso < prioMax) {

        if (persoPrio == null || resetType == 'Daily') {
            for (i = 0; i < persos.length; i++) {
                if (persos[i].prioPerso == prioPerso) {
                    persoEnPrio = persos[i];
                    persoPrio = persoEnPrio;
                    break;
                }
            }
        } else {
            persoEnPrio = persoPrio;
        }


        prioTask = 1;

        while (taskEnPrio == null && prioTask < prioMax) {

            for (j = 0; j < tasks.length; j++) {
                // console.log(tasks[j].nomTask, tasks[j].prioTask, prioTask, tasks[j].resetTask, resetType, persoEnPrio.typePerso, tasks[j].persoTask, tasks[j].statutTask)

                if (parseInt(tasks[j].prioTask) == prioTask && tasks[j].resetTask == resetType && persoEnPrio.typePerso == tasks[j].persoTask && !tasks[j].statutTask && tasks[j].openingTask.length == 0) {
                    // console.log(tasks[j].nomTask)
                    console.log(tasks[j].nomTask, tasks[j].resetTask, (parseInt(tasks[j].dureeTask) + 5), minutesBeforeNextEvent, (parseInt(tasks[j].dureeTask) + 5) < minutesBeforeNextEvent)

                    if (tasks[j].resetTask == 'Daily' && (parseInt(tasks[j].dureeTask) + 5) < minutesBeforeNextEvent) {
                        taskEnPrio = tasks[j];
                        break;
                    } else if (tasks[j].resetTask != 'Daily') {
                        taskEnPrio = tasks[j];
                        break;
                    }
                    // break;
                }
            }

            prioTask++;
        }

        prioPerso++;
    }

    // console.log(persoEnPrio)
    // console.log(taskEventPrio)
    // console.log(taskEnPrio)
    // console.log(i)
    // console.log(j)

    if (taskEnPrio) {
        refreshEvent();
        $('#nextTaskPersoImg').attr('src', `images/${persoEnPrio.imagePerso}`);
        $('#badge-gearlevel-nextTaskModal').html(persoEnPrio.gearlevel);
        $(`#next${resetType}TaskImg`).attr('src', `images/${taskEnPrio.imageTask}`);
        $(`#next${resetType}TaskName`).html(`
            ${taskEnPrio.nomTask}<br>
            <i class="color-gray">${taskEnPrio.typeTask} - ${taskEnPrio.dureeTask} min</i>
            <div class="form-check form-switch float-end">
                <input class="form-check-input switchMajTask" data-index="${j}" data-champs="statutTask" type="checkbox" id="statutTask${j}">
            </div>
        `);
    } else if (taskEventPrio) {
        stopRefreshEvent();
        $('#nextTaskPersoImg').attr('src', `images/${persoEventPrio.imagePerso}`);
        $('#badge-gearlevel-nextTaskModal').html(persoEventPrio.gearlevel);
        $(`#next${resetType}TaskImg`).attr('src', `images/${taskEventPrio.imageTask}`);
        $(`#next${resetType}TaskName`).html(`
            ${taskEventPrio.nomTask}<br>
            <i class="color-gray">${taskEventPrio.typeTask} - ${taskEventPrio.dureeTask} min</i>
            <div class="form-check form-switch float-end">
                <input class="form-check-input switchMajTask" data-index="${j}" data-champs="statutTask" type="checkbox" id="statutTask${j}">
            </div>
        `);
    } else {
        $(`#next${resetType}TaskImg`).attr('src', `images/success.avif`);
        $(`#next${resetType}TaskName`).html(`DONE`);
    }
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
                <th scope="col">Image</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>`;

    dbPerso.get("personnages").value().forEach((perso, index) => {

        listeHtmlPerso += `
        <tr>
            <th scope="row">${perso.typePerso}</th>
            <td>${perso.nom}</td>
            <td><input type="number" class="form-control inputMajPerso" data-index="${index}" data-champs="prioPerso" value="${perso.prioPerso}"/></td>
            <td><input type="number" class="form-control inputMajPerso" data-index="${index}" data-champs="level" value="${perso.level}"/></td>
            <td><input type="number" class="form-control inputMajPerso" data-index="${index}" data-champs="gearlevel" value="${perso.gearlevel}"/></td>
            <td><input type="text" class="form-control inputMajPerso" data-index="${index}" data-champs="imagePerso" value="${perso.imagePerso}"/></td>
            <td><button class="btn btn-danger deletePerso" data-index="${index}"><i class="fa-solid fa-minus"></i></button></td>
        </tr>`;
    });

    listeHtmlPerso += `</tbody></table>`;

    $('#sectionPersonnage').html(listeHtmlPerso);
}

function addPerso() {
    let typePerso = $('#typePerso').val();
    let nom = $('#nom').val();
    let prioPerso = $('#prioPerso').val();
    let level = $('#level').val();
    let gearlevel = $('#gearlevel').val();
    let imagePerso = $('#imagePerso').val();

    let perso = {
        'typePerso': typePerso,
        'nom': nom,
        'prioPerso': prioPerso,
        'level': level,
        'gearlevel': gearlevel,
        'imagePerso': imagePerso,
    };

    dbPerso.get("personnages").push(perso).save();
    dbPerso.save();

    showPerso();
    // location.reload();
    // return false;
}

function updatePerso(data) {
    let value = data.val();
    let index = data.data('index');
    let champs = data.data('champs');

    dbPerso.get("personnages")
        .get(index)
        .get(champs)
        .set(value);
    dbPerso.save();

    showPerso();
    // location.reload();
    // return false;
}

function deletePerso(data) {
    let index = data.data('index');

    dbPerso.get("personnages").get(index).delete(true);
    dbPerso.save();

    showPerso();
    // location.reload();
    // return false;
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

    dbTask.get("tasks").value().forEach((task, index) => {

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
    table = $('#tableTask').DataTable();
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

    dbTask.get("tasks").push(task).save();
    dbTask.save();

    showTask();
    // location.reload();
    // return false;
}

function updateTask(data) {
    let value = data.val();
    let index = data.data('index');
    let champs = data.data('champs');

    dbTask.get("tasks")
        .get(index)
        .get(champs)
        .set(value);
    dbTask.save();

    showTask();
    // location.reload();
    // return false;
}

function updateSwitchTask(data) {
    let value = data.prop('checked');
    let index = data.data('index');
    let champs = data.data('champs');

    // console.log(value, index, champs)

    dbTask.get("tasks")
        .get(index)
        .get(champs)
        .set(value);
    dbTask.save();

    // nextEvent();

    prioTaskEnCours = 1;
    taskEnCours = null;
    calculTask();

    // location.reload();
    // return false;
}

function deleteTask(data) {
    let index = data.data('index');

    dbTask.get("tasks").get(index).delete(true);
    dbTask.save();

    showTask();
    // location.reload();
    // return false;
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
