// Affichage des caractères
showPersos();

// -----------------------------------------------------------------------------------
// -- Ajout d'un caractère -----------------------------------------------------------
// -----------------------------------------------------------------------------------
$('#ajoutCaractere').on('click', function () {
    let nom = $('#nom').val();
    let classe = $('#classe').val();
    let gearlevel = $('#gearlevel').val();
    let groupe = $('#groupe').val();

    let perso = {
        'nom': nom,
        'classe': classe,
        'gearlevel': gearlevel,
        'groupe': groupe
    }

    db.get("persos").push(perso).save();

    showPersos();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Modification d'un caractere ----------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('change propertyChange', '.updateCaractere', function () {
    let value = $(this).val();
    let index = $(this).data('index');
    let champ = $(this).data('champ');

    db.get("persos")
        .get(index)
        .get(champ)
        .set(value);
    db.save();

    showPersos();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Suppression d'un caractère -----------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('click', '.deleteCaractere', function () {
    let index = $(this).data('index');

    db.get("persos").get(index).delete(true);
    db.save();

    showPersos();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Affichage des caractères sauvegardés -------------------------------------------
// -----------------------------------------------------------------------------------
function showPersos() {
    let html = `
            <table id="tablepersos" class="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th class="text-gray" scope="col">Nom</th>
                        <th class="text-gray" scope="col">Classe</th>
                        <th class="text-gray" scope="col">Gear Level</th>
                        <th class="text-gray" scope="col">Rotation</th>
                        <th class="text-gray" scope="col">Suppression</th>
                        <th class="text-gray" scope="col">hiddennom</th>
                        <th class="text-gray" scope="col">hiddenclasse</th>
                        <th class="text-gray" scope="col">hiddengearlevel</th>
                        <th class="text-gray" scope="col">hiddenrotation</th>
                    </tr>
                </thead>
                <tbody>`;

    db.get("persos").value().forEach((perso, index) => {
        html += `
            <tr>
                <td><input class="form-control box-shadow-inset updateCaractere" type="text" data-index="${index}" data-champ="nom" value="${perso.nom}" /></td>
                <td><input class="form-control box-shadow-inset updateCaractere" list="classes" data-index="${index}" data-champ="classe" value="${perso.classe}" /></td>
                <td><input class="form-control box-shadow-inset updateCaractere" type="number" data-index="${index}" data-champ="gearlevel" value="${perso.gearlevel}" /></td>
                <td><input class="form-control box-shadow-inset updateCaractere" list="groupe" data-index="${index}" data-champ="groupe" value="${perso.groupe}" /></td>
                <td><button class="btn btn-danger btn-sm deleteCaractere" data-index="${index}" style="white-space:nowrap;"><i class="fa-solid fa-minus"></i>&nbsp;&nbsp;&nbsp;Supprimer</button></td>
                <td>${perso.nom} /></td>
                <td>${perso.classe} /></td>
                <td>${perso.gearlevel} /></td>
                <td>${perso.groupe} /></td>
            </tr>`;
    });

    html += `</tbody></table>`;

    $('#sectionCaracteres').html(html);

    $('#tablepersos').DataTable({
        columnDefs: [
            {
                targets: [5, 6, 7, 8],
                visible: false,
                searchable: true
            }
        ],
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
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- EXPORT DATA JSON ---------------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('click', '#btnExportJson', function () {
    exportToJsonFile({
        persos: db.get("persos").value(),
        tasks: db.get("tasks").value(),
        times: db.get("times").value(),
        resetDaily: db.get("resetDaily").value(),
        resetWeekly: db.get("resetWeekly").value(),
        groupeEnCours: db.get("groupeEnCours").value(),
        counterUna: db.get("counterUna").value(),
        counterChaos: db.get("counterChaos").value(),
        counterRaid: db.get("counterRaid").value(),
        counterLegion: db.get("counterLegion").value(),
        progressBarDaily: db.get("progressBarDaily").value()
    })
});

/**
 * Download data into json file
 * 
 * @param {*} jsonData 
 */
function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- IMPORT DATA JSON ---------------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('change', '#importFile', function (e) { startRead(e); });

function startRead(evt) {
    let file = document.getElementById('importFile').files[0];
    if (file) {
        getAsText(file);
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

    db.get("persos").set(fileJSON.persos);
    db.get("tasks").set(fileJSON.tasks);
    db.get("times").set(fileJSON.times);
    db.get("resetDaily").set(fileJSON.resetDaily);
    db.get("resetWeekly").set(fileJSON.resetWeekly);
    db.get("groupeEnCours").set(fileJSON.groupeEnCours);
    db.get("counterUna").set(fileJSON.counterUna);
    db.get("counterChaos").set(fileJSON.counterChaos);
    db.get("counterRaid").set(fileJSON.counterRaid);
    db.get("counterLegion").set(fileJSON.counterLegion);
    db.get("progressBarDaily").set(fileJSON.progressBarDaily);

    db.save();

    window.location.reload();
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
