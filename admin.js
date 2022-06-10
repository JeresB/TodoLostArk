const engine = new BrowserEngine("db");
const db = new StormDB(engine);

$(document).ready(function () {
    // SHOW PERSOS
    if (db.get("personnages").value() === undefined) db.set("personnages", []).save();
    else if (db.get("personnages").value().length > 0) showPerso();

    // SHOW TASKS
    if (db.get("tasks").value() === undefined) db.set("tasks", []).save();
    else if (db.get("tasks").value().length > 0) showTask();
});

// AJOUT, MAJ, SUPPRESSION D'UN PERSONNAGE
$(document).on('change', '.inputMajPerso', function () { updatePerso($(this)) });
$(document).on('click', '.deletePerso', function () { deletePerso($(this)) });
$(document).on('click', '#savePerso', function () { addPerso() });

function showPerso() {
    let listeHtmlPerso = ``;

    db.get("personnages").value().forEach((perso, index) => {

        listeHtmlPerso += `
        <tr>
            <th scope="row">${perso.typePerso}</th>
            <td>${perso.nom}</td>
            <td><input type="number" class="form-control fields inputMajPerso" data-index="${index}" data-champs="prioPerso" value="${perso.prioPerso}"/></td>
            <td><input type="number" class="form-control fields inputMajPerso" data-index="${index}" data-champs="level" value="${perso.level}"/></td>
            <td><input type="number" class="form-control fields inputMajPerso" data-index="${index}" data-champs="gearlevel" value="${perso.gearlevel}"/></td>
            <td><input list="groupeOptions" class="form-control fields inputMajPerso" data-index="${index}" data-champs="groupePerso" value="${perso.groupePerso}"/></td>
            <td><input type="text" class="form-control fields inputMajPerso" data-index="${index}" data-champs="imagePerso" value="${perso.imagePerso}"/></td>
            <!-- <td><button class="btn btn-success modalDetailPerso" data-index="${index}" data-bs-toggle="modal" data-bs-target="#detailPersoModal"><i class="fa-solid fa-eye"></i></button></td> -->
            <td><button class="btn btn-danger deletePerso" data-index="${index}"><i class="fa-solid fa-minus"></i></button></td>
        </tr>`;
    });

    $('#sectionPersonnage').html(listeHtmlPerso);
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
    let listeHtmlTask = ``;

    db.get("tasks").value().forEach((task, index) => {

        listeHtmlTask += `
            <tr>
                <th scope="row">${task.persoTask}</th>
                <td>${task.typeTask}</td>
                <td><input list="resetTypeOptions" class="form-control fields inputMajTask" data-index="${index}" data-champs="resetTask" value="${task.resetTask}"/></td>
                <td><input type="text" class="form-control fields inputMajTask" data-index="${index}" data-champs="nomTask" value="${task.nomTask}"/></td>
                <td><input type="number" class="form-control fields inputMajTask" data-index="${index}" data-champs="prioTask" value="${task.prioTask}"/></td>
                <td><input type="number" class="form-control fields inputMajTask" data-index="${index}" data-champs="dureeTask" value="${task.dureeTask}"/></td>
                <td><input type="number" class="form-control fields inputMajTask" data-index="${index}" data-champs="importanceTask" value="${task.importanceTask}"/></td>
                <td><input list="openingOptions" class="form-control fields inputMajTask" data-index="${index}" data-champs="openingTask" value="${task.openingTask}"/></td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input switchMajTask" data-index="${index}" data-champs="statutTask" type="checkbox" id="statutTask${index}" ${task.statutTask ? 'checked' : ''}>
                    </div>
                </td>
                <td><button class="btn btn-danger deleteTask" data-index="${index}"><i class="fa-solid fa-minus"></i></button></td>
                <td>${task.resetTask}</td>
                <td>${task.nomTask}</td>
            </tr>`;
    });

    $('#sectionTasks').html(listeHtmlTask);
    
    table = $('#tableTask').DataTable({
        stateSave: true,
        dom: 'Pfrtip',
        columnDefs: [
            {
                target: [10, 11],
                visible: false,
                searchable: true,
            }
        ]
    });
}