// Affichage des tâches
showTasks();

// -----------------------------------------------------------------------------------
// -- Ajout d'une tâche --------------------------------------------------------------
// -----------------------------------------------------------------------------------
$('#ajoutTask').on('click', function () {
    let id = $('#id').val();
    let nom = $('#nom').val();
    let type = $('#type').val();
    let icone = $('#icone').val();
    let scope = $('#scope').val();
    let repetition = $('#repetition').val();
    let minilevel = $('#minilevel').val();
    let maxilevel = $('#maxilevel').val();
    let reset = $('#reset').val();
    let color = $('#color').val();
    let opening = $('#opening').val();

    let task = {
        'id': id,
        'nom': nom,
        'type': type,
        'icone': icone,
        'scope': scope,
        'repetition': repetition,
        'minilevel': minilevel,
        'maxilevel': maxilevel,
        'reset': reset,
        'color': color,
        'actif': true,
        'opening': opening
    }

    db.get("taches").push(task).save();

    showTasks();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Modification d'une tâche -------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('change propertyChange', '.updateTask', function () {
    let value = $(this).val();
    let index = $(this).data('index');
    let champ = $(this).data('champ');

    if (champ == 'actif') value = $(this).prop('checked');
    
    db.get("taches")
        .get(index)
        .get(champ)
        .set(value);
    db.save();

    showTasks();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Suppression d'une tâche --------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('click', '.deleteTask', function () {
    let index = $(this).data('index');

    db.get("taches").get(index).delete(true);
    db.save();

    showTasks();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Affichage des tâches sauvegardées ----------------------------------------------
// -----------------------------------------------------------------------------------
function showTasks() {
    let html = `
            <table id="tabletasks" class="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th class="text-gray" scope="col">Id</th>
                        <th class="text-gray" scope="col">Nom</th>
                        <th class="text-gray" scope="col">Type</th>
                        <th class="text-gray" scope="col">Icone</th>
                        <th class="text-gray" scope="col">Scope</th>
                        <th class="text-gray" scope="col">Repetition</th>
                        <th class="text-gray" scope="col">Min iLevel</th>
                        <th class="text-gray" scope="col">Max iLevel</th>
                        <th class="text-gray" scope="col">Reset</th>
                        <th class="text-gray" scope="col">Color</th>
                        <th class="text-gray" scope="col">Ouverture</th>
                        <th class="text-gray" scope="col">Actif</th>
                        <th class="text-gray" scope="col">Suppression</th>
                        <th class="text-gray" scope="col">hiddenid</th>
                        <th class="text-gray" scope="col">hiddennom</th>
                        <th class="text-gray" scope="col">hiddentype</th>
                        <th class="text-gray" scope="col">hiddenicone</th>
                        <th class="text-gray" scope="col">hiddenscope</th>
                        <th class="text-gray" scope="col">hiddenrepetition</th>
                        <th class="text-gray" scope="col">hiddenminilevel</th>
                        <th class="text-gray" scope="col">hiddenmaxilevel</th>
                        <th class="text-gray" scope="col">hiddenreset</th>
                        <th class="text-gray" scope="col">hiddencolor</th>
                        <th class="text-gray" scope="col">hiddenouverture</th>
                    </tr>
                </thead>
                <tbody>`;


    // <input class="form-control box-shadow-inset" type="text" id="id" placeholder="Identifiant" />
    // <input class="form-control box-shadow-inset" type="text" id="nom" placeholder="Nom" />
    // <input class="form-control box-shadow-inset" list="listscope" id="scope" placeholder="Scope" />
    // <input class="form-control box-shadow-inset" type="number" id="repetition" placeholder="Repetition" />
    // <input class="form-control box-shadow-inset" type="number" id="minilevel" placeholder="Min iLevel" />
    // <input class="form-control box-shadow-inset" type="number" id="maxilevel" placeholder="Max iLevel" />
    // <input class="form-control box-shadow-inset" list="listreset" id="reset" placeholder="Reset" />
    // <input class="form-control box-shadow-inset" list="listopening" id="opening" placeholder="Ouverture" />

    db.get("taches").value().forEach((task, index) => {
        html += `
            <tr>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="id" value="${task.id}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="nom" value="${task.nom}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="type" value="${task.type}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="icone" value="${task.icone}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" list="listscope" data-index="${index}" data-champ="scope" value="${task.scope}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="number" data-index="${index}" data-champ="repetition" value="${task.repetition}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="number" data-index="${index}" data-champ="minilevel" value="${task.minilevel}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="number" data-index="${index}" data-champ="maxilevel" value="${task.maxilevel}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" list="listreset" data-index="${index}" data-champ="reset" value="${task.reset}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="color" value="${task.color}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" list="listopening" data-index="${index}" data-champ="opening" value="${task.opening}" /></td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input updateTask" type="checkbox" data-index="${index}" data-champ="actif" ${(task.actif ? 'checked' : '')}>
                    </div>
                </td>
                <td><button class="btn btn-danger btn-sm deleteTask" data-index="${index}" style="white-space:nowrap;"><i class="fa-solid fa-minus"></i>&nbsp;&nbsp;&nbsp;Supprimer</button></td>
                <td>${task.id}</td>
                <td>${task.nom}</td>
                <td>${task.type}</td>
                <td>${task.icone}</td>
                <td>${task.scope}</td>
                <td>${task.repetition}</td>
                <td>${task.minilevel}</td>
                <td>${task.maxilevel}</td>
                <td>${task.reset}</td>
                <td>${task.color}</td>
                <td>${task.opening}</td>
            </tr>`;
    });

    html += `</tbody></table>`;

    $('#sectionTasks').html(html);

    $('#tabletasks').DataTable({
        dom: 'Plfrtip',
        columnDefs: [
            {
                targets: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                visible: false,
                searchable: true
            }
        ],
        stateSave: false,
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