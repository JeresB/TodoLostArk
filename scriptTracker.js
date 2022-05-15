// https://github.com/TomPrograms/stormdb

// CREATION DE LA TABLE PERSONNAGE
const enginePerso = new BrowserEngine("dbperso");
const dbPerso = new StormDB(enginePerso);

// CREATION DE LA TABLE TASKS
const engineTask = new BrowserEngine("dbtask");
const dbTask = new StormDB(engineTask);

// AJOUT, MAJ, SUPPRESSION D'UN PERSONNAGE
$(document).on('change', '.inputMajPerso', function () { updatePerso($(this)) });
$(document).on('click', '.deletePerso', function () { deletePerso($(this)) });
$(document).on('click', '#savePerso', function () { addPerso() });

// AJOUT, MAJ, SUPPRESSION D'UNE TACHE
$(document).on('change', '.inputMajTask', function () { updateTask($(this)) });
$(document).on('change', '.switchMajTask', function () { updateSwitchTask($(this)) });
$(document).on('click', '.deleteTask', function () { deleteTask($(this)) });
$(document).on('click', '#saveTask', function () { addTask() });


$(document).on('click', '#btnNextTask', function () { nextEvent() });

$(document).ready(function () {
    var nextTaskModal = new bootstrap.Modal(document.getElementById('nextTaskModal'), {});
    nextTaskModal.show();

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

    nextEvent();
});

function nextEvent() {
    let prioPerso = 1;
    let prioTask = 1;
    let prioMax = 10;

    let task = null;

    let persos = dbPerso.get("personnages").value();

    // console.log(persos)

    let persoEnPrio = null;
    let taskEnPrio = null;
    let i = 0;
    let j = 0;

    while (taskEnPrio == null && prioPerso < prioMax) {

        for (i = 0; i < persos.length; i++) {
            if (persos[i].prioPerso == prioPerso) {
                // __FOUND is set to the index of the element
                persoEnPrio = persos[i];
                break;
            }
        }

        // console.log(persoEnPrio)


        let tasks = dbTask.get("tasks").value();

        // console.log(tasks)
        prioTask = 1;

        while (taskEnPrio == null && prioTask < prioMax) {

            for (j = 0; j < tasks.length; j++) {
                if (tasks[j].prioTask == prioTask && persoEnPrio.typePerso == tasks[j].persoTask && !tasks[j].statutTask) {
                    // __FOUND is set to the index of the element
                    taskEnPrio = tasks[j];
                    break;
                }
            }


            // console.log(prioPerso, prioTask)

            prioTask++;
        }

        prioPerso++;
    }

    console.log(persoEnPrio)
    console.log(taskEnPrio)
    console.log(i)
    console.log(j)

    if (taskEnPrio) {
        $('#nextTaskPersoImg').attr('src', `images/${persoEnPrio.imagePerso}`);
        $('#nextTaskImg').attr('src', `images/${taskEnPrio.imageTask}`);
        $('#nextTaskName').html(`
            ${taskEnPrio.nomTask}<br>
            <i class="color-gray">${taskEnPrio.typeTask} - ${taskEnPrio.dureeTask} min</i>
            <div class="form-check form-switch float-end">
                <input class="form-check-input switchMajTask" data-index="${j}" data-champs="statutTask" type="checkbox" id="statutTask${j}">
            </div>
        `);
    } else {
        $('#nextTaskImg').attr('src', `images/success.avif`);
        $('#nextTaskName').html(`DONE`);
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
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Personnage</th>
                <th scope="col">Type</th>
                <th scope="col">Reset Type</th>
                <th scope="col">Nom</th>
                <th scope="col">Priorité</th>
                <th scope="col">Durée</th>
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
}

function addTask() {
    let persoTask = $('#persoTask').val();
    let typeTask = $('#typeTask').val();
    let resetTask = $('#resetTask').val();
    let nomTask = $('#nomTask').val();
    let prioTask = $('#prioTask').val();
    let dureeTask = $('#dureeTask').val();
    let imageTask = $(`option[value="${typeTask}"]`).data('image');

    let task = {
        'persoTask': persoTask,
        'typeTask': typeTask,
        'resetTask': resetTask,
        'nomTask': nomTask,
        'prioTask': prioTask,
        'dureeTask': dureeTask,
        'imageTask': imageTask,
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

    console.log(value, index, champs)

    dbTask.get("tasks")
        .get(index)
        .get(champs)
        .set(value);
    dbTask.save();

    nextEvent();
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