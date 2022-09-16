// Affichage des tâches
showTasks();
// Affichage des persos dans la modal de génération des tâches
showListPersoInModal();
// Affichage de la liste des caractères
showListeCaracteres();

// -----------------------------------------------------------------------------------
// -- Alimentation de la liste des caractères ----------------------------------------
// -----------------------------------------------------------------------------------
function showListeCaracteres() {
    let caracteres = [];
    
    db.get("persos").value().forEach((perso, index) => {
        if (perso.nom != '' && !caracteres.includes(perso.nom)) {
            caracteres.push(perso.nom);
        }
    });

    let html = '';

    caracteres.forEach((caractere, index) => {
        html += `<option value="${caractere}">`;
    });

    $('#listperso').html(html);
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Ajout d'une tâche --------------------------------------------------------------
// -----------------------------------------------------------------------------------
$('#ajoutTask').on('click', function () {
    let nom = $('#nom').val();
    let perso = $('#perso').val();
    let type = $('#type').val();
    let reset = $('#reset').val();
    let prio = $('#prio').val();
    let importance = $('#importance').val();
    let opening = $('#opening').val();

    let task = {
        'nom': nom,
        'perso': perso,
        'type': type,
        'reset': reset,
        'prio': prio,
        'importance': importance,
        'statut': false,
        'opening': opening
    }

    db.get("tasks").push(task).save();

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

    if (champ == 'statut') value = $(this).prop('checked');

    db.get("tasks")
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

    db.get("tasks").get(index).delete(true);
    db.save();

    showTasks();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Génération des tâches ----------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('click', '#generateTasks', function () {
    let persos = [];

    // Récupération de la liste des persos cochés ------------------------------------
    $(".persos").each(function (index) {
        let val = $(this).prop('checked');
        let nom = $(this).data('nom');

        if (val) {
            persos.push(nom);
        }
    });
    // -------------------------------------------------------------------------------

    // Boucle sur la liste des tâches ------------------------------------------------
    $(".tasks").each(function (index) {
        // Récupération des données de la tâche dans une variable
        let task = $(this);

        // Boucle sur les persos
        // On ajoute la tâche en cours pour chaque persos cochés
        persos.forEach(function (perso) {
            // Tâche cochée ?
            let val = task.prop('checked');

            // Si oui
            if (val) {
                // Création d'un objet tâche avec les données             
                let newTask = {
                    'nom': task.data('nom'),
                    'perso': perso,
                    'type': task.data('type'),
                    'reset': task.data('reset'),
                    'prio': task.data('prio'),
                    'importance': task.data('importance'),
                    'statut': false,
                    'opening': ''
                }

                // Récupération du nombre de doublon à créer
                let nb = task.data('nb');

                // Boucle pour créer la tâche avec ses doublons
                // Ex : chaos donjon x2
                for (let i = 0; i < nb; i++) {
                    // Pour valtan, on duplique x2 (2 Portes)
                    if (newTask.nom.includes('Valtan')) {
                        let g1 = JSON.parse(JSON.stringify(newTask));
                        let g2 = JSON.parse(JSON.stringify(newTask));

                        g1.nom = g1.nom + ' Porte 1';
                        db.get("tasks").push(g1);

                        g2.nom = g2.nom + ' Porte 2';
                        db.get("tasks").push(g2);

                        // Pour Vykas et kakul, on duplique x3 (3 Portes)
                    } else if (newTask.nom.includes('Vykas') || newTask.nom.includes('Kakul')) {
                        let g1 = JSON.parse(JSON.stringify(newTask));
                        let g2 = JSON.parse(JSON.stringify(newTask));
                        let g3 = JSON.parse(JSON.stringify(newTask));

                        g1.nom = g1.nom + ' Porte 1';
                        db.get("tasks").push(g1);

                        g2.nom = g2.nom + ' Porte 2';
                        db.get("tasks").push(g2);

                        g3.nom = g3.nom + ' Porte 3';
                        db.get("tasks").push(g3);

                        // Pour Brel, on duplique x6 (6 Portes)
                    } else if (newTask.nom.includes('Brel')) {
                        let g1 = JSON.parse(JSON.stringify(newTask));
                        let g2 = JSON.parse(JSON.stringify(newTask));
                        let g3 = JSON.parse(JSON.stringify(newTask));
                        let g4 = JSON.parse(JSON.stringify(newTask));
                        let g5 = JSON.parse(JSON.stringify(newTask));
                        let g6 = JSON.parse(JSON.stringify(newTask));

                        g1.nom = g1.nom + ' Porte 1';
                        db.get("tasks").push(g1);

                        g2.nom = g2.nom + ' Porte 2';
                        db.get("tasks").push(g2);

                        g3.nom = g3.nom + ' Porte 3';
                        db.get("tasks").push(g3);

                        g4.nom = g4.nom + ' Porte 4';
                        db.get("tasks").push(g4);

                        g5.nom = g5.nom + ' Porte 5';
                        db.get("tasks").push(g5);

                        g6.nom = g6.nom + ' Porte 6';
                        db.get("tasks").push(g6);

                    } else {
                        // On ajoute la tâche en base
                        db.get("tasks").push(newTask);
                    }
                }
            }
        });
    });

    // Sauvegarde de la base StormDB après l'ajout de toutes les tâches
    db.save();

    // On décoche tout le formulaire de la modal
    $('.btn-check').prop('checked', false);

    // On actualise l'affichage des tâches
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
                        <th class="text-gray" scope="col">Nom</th>
                        <th class="text-gray" scope="col">Caractère</th>
                        <th class="text-gray" scope="col">Type</th>
                        <th class="text-gray" scope="col">Reset</th>
                        <th class="text-gray" scope="col">Priorité</th>
                        <th class="text-gray" scope="col">Importance</th>
                        <th class="text-gray" scope="col">Ouverture</th>
                        <th class="text-gray" scope="col">Statut</th>
                        <th class="text-gray" scope="col">Suppression</th>
                        <th class="text-gray" scope="col">hiddennom</th>
                        <th class="text-gray" scope="col">hiddenperso</th>
                        <th class="text-gray" scope="col">hiddentype</th>
                        <th class="text-gray" scope="col">hiddenreset</th>
                        <th class="text-gray" scope="col">hiddenprio</th>
                        <th class="text-gray" scope="col">hiddenimportance</th>
                        <th class="text-gray" scope="col">hiddenouverture</th>
                    </tr>
                </thead>
                <tbody>`;

    db.get("tasks").value().forEach((task, index) => {
        html += `
            <tr>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="nom" value="${task.nom}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="text" data-index="${index}" data-champ="perso" value="${task.perso}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" list="listtype" data-index="${index}" data-champ="type" value="${task.type}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" list="listreset" data-index="${index}" data-champ="reset" value="${task.reset}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="number" data-index="${index}" data-champ="prio" value="${task.prio}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" type="number" data-index="${index}" data-champ="importance" value="${task.importance}" /></td>
                <td><input class="form-control box-shadow-inset updateTask" list="listopening" data-index="${index}" data-champ="opening" value="${task.opening}" /></td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input updateTask" type="checkbox" data-index="${index}" data-champ="statut" ${(task.statut ? 'checked' : '')}>
                    </div>
                </td>
                <td><button class="btn btn-danger btn-sm deleteTask" data-index="${index}" style="white-space:nowrap;"><i class="fa-solid fa-minus"></i>&nbsp;&nbsp;&nbsp;Supprimer</button></td>
                <td>${task.nom}</td>
                <td>${task.perso}</td>
                <td>${task.type}</td>
                <td>${task.reset}</td>
                <td>${task.prio}</td>
                <td>${task.importance}</td>
                <td>${task.opening}</td>
            </tr>`;
    });

    html += `</tbody></table>`;

    $('#sectionTasks').html(html);

    $('#tabletasks').DataTable({
        dom: 'Plfrtip',
        columnDefs: [
            {
                targets: [9, 10, 11, 12, 13, 14, 15],
                visible: false,
                searchable: true
            }
        ],
        stateSave: true,
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
// -- Affichage de la liste des caractères existants ---------------------------------
// -- dans la modal de génération des tâches -----------------------------------------
// -----------------------------------------------------------------------------------
function showListPersoInModal() {
    console.log('showListPersoInModal')

    let html = ``;

    db.get("persos").value().forEach((perso, index) => {
        html += `
            <input type="checkbox" class="btn-check persos flex-grow-1" id="${perso.nom}Check" data-nom="${perso.nom}" autocomplete="off">
            <label class="btn btn-outline-success" for="${perso.nom}Check">${perso.nom}</label>`;
    });

    html += ``;

    $('#listeCaracteresModalGenerationTaches').html(html);
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------