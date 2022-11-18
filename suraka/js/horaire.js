// Affichage des horaires
showHoraires();
// Affichage de la liste des types
showListeType();

// -----------------------------------------------------------------------------------
// -- Alimentation de la liste des types ---------------------------------------------
// -----------------------------------------------------------------------------------
function showListeType() {
    let types = [];
    
    db.get("taches").value().forEach((task, index) => {
        if (task.opening != '' && !types.includes(task.opening)) {
            types.push(task.opening);
        }
    });

    let html = '';

    types.forEach((type, index) => {
        html += `<option value="${type}">`;
    });

    $('#listTypeHoraire').html(html);
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Ajout d'un horaire -------------------------------------------------------------
// -----------------------------------------------------------------------------------
$('#ajoutHoraire').on('click', function () {
    let type = $('#type').val();
    let day = $('#day').val();
    let hour = $('#hour').val();
    let min = $('#min').val();

    let horaire = {
        'type': type,
        'day': day,
        'hour': hour,
        'min': min
    }

    db.get("horaires").push(horaire).save();

    console.log(db.get("horaires").value())
    showHoraires();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Modification d'un horaire ------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('change propertyChange', '.updateHoraire', function () {
    let value = $(this).val();
    let index = $(this).data('index');
    let champ = $(this).data('champ');

    db.get("horaires")
        .get(index)
        .get(champ)
        .set(value);
    db.save();

    showHoraires();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Suppression d'un horaire -------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('click', '.deleteHoraire', function () {
    let index = $(this).data('index');

    db.get("horaires").get(index).delete(true);
    db.save();

    showHoraires();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Affichage des horaires sauvegardés ---------------------------------------------
// -----------------------------------------------------------------------------------
function showHoraires() {
    let html = `
            <table id="tablehoraires" class="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th class="text-gray" scope="col">Type</th>
                        <th class="text-gray" scope="col">Jour</th>
                        <th class="text-gray" scope="col">Heures</th>
                        <th class="text-gray" scope="col">Minutes</th>
                        <th class="text-gray" scope="col">Suppression</th>
                        <th class="text-gray" scope="col">hiddentype</th>
                        <th class="text-gray" scope="col">hiddenday</th>
                        <th class="text-gray" scope="col">hiddenhour</th>
                        <th class="text-gray" scope="col">hiddenmin</th>
                    </tr>
                </thead>
                <tbody>`;

    db.get("horaires").value().forEach((time, index) => {
        html += `
            <tr>
                <td><input class="form-control box-shadow-inset updateHoraire" list="listTypeHoraire" data-index="${index}" data-champ="type" value="${time.type}" /></td>
                <td><input class="form-control box-shadow-inset updateHoraire" type="number" data-index="${index}" data-champ="day" value="${time.day}" /></td>
                <td><input class="form-control box-shadow-inset updateHoraire" type="number" data-index="${index}" data-champ="hour" value="${time.hour}" /></td>
                <td><input class="form-control box-shadow-inset updateHoraire" type="number" data-index="${index}" data-champ="min" value="${time.min}" /></td>
                <td><button class="btn btn-danger btn-sm deleteHoraire" data-index="${index}" style="white-space:nowrap;"><i class="fa-solid fa-minus"></i>&nbsp;&nbsp;&nbsp;Supprimer</button></td>
                <td>${time.type} /></td>
                <td>${time.day} /></td>
                <td>${time.hour} /></td>
                <td>${time.min} /></td>
            </tr>`;
    });

    html += `</tbody></table>`;

    $('#sectionHoraires').html(html);

    $('#tablehoraires').DataTable({
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
