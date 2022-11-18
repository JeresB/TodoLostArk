// console.log(db.get("checklist").value());

// -----------------------------------------------------------------------------------
// -- Ajout d'une checklist --------------------------------------------------------------
// -----------------------------------------------------------------------------------
function addChecklist(task, perso) {
    let checklist = {
        'task': task,
        'personnage': perso,
        'rest': 0,
        'done': 0,
        'prio': 0,
        'tracking': true
    }

    console.log('Ajout de la checklist', checklist);

    db.get("checklist").push(checklist).save();

    return checklist;
};
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Modification d'une tâche -------------------------------------------------------
// -----------------------------------------------------------------------------------
$(document).on('change propertyChange', '.updateChecklist', function () {
    let value = $(this).val();
    let index = $(this).data('index');
    let champ = $(this).data('champ');

    if (champ == 'tracking') value = $(this).prop('checked');
    
    db.get("checklist")
        .get(index)
        .get(champ)
        .set(value);
    db.save();

    showChecklistRest();
    showChecklistTracking();
    showChecklistPrio();
});
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Fonction d'affichage RestBonus, Tracking, Priority -----------------------------
// -----------------------------------------------------------------------------------
function showChecklistRest() {
    let body = `<tbody>`;
    let header = `<thead><tr>`;

    db.get("taches").value().forEach((task, i) => {
        if (task.id == 'chaosdonjon' || task.id == 'unadaily' || task.id == 'raidguardian') {
            body += `<tr><td class="text-gray">${task.nom}</td>`;
            if (i == 0) header += `<th class="text-gray">Rest Bonus</th>`;
            
            db.get("personnages").value().forEach((perso, j) => {
                let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, perso);
                let checklist = null;
    
                if (indexchecklist < 0) {
                    checklist = addChecklist(task.id, perso.nom);
                } else {
                    checklist = findChecklistByIndex(indexchecklist);
                }
    
                if (i == 0) header += `<th class="text-gray">${perso.nom}</th>`;
    
                body += `<td class="text-gray"><input class="form-control box-shadow-inset updateChecklist" type="number" data-index="${indexchecklist}" data-champ="rest" value="${checklist.rest}" /></td>`;
            });
    
            body += `</tr>`;
        }
    });

    header += `</tr></thead>`;
    body += `</tbody>`;

    let html = `<table id="" class="table table-bordered table-condensed">${header}${body}</table>`;

    $('#sectionChecklistRest').html(html);
}

function showChecklistTracking() {
    let body = `<tbody>`;
    let header = `<thead><tr>`;
    let nbperso = 0;

    let tasks = db.get("taches").value();

    tasks.sort((a, b) => b.reset.localeCompare(a.reset) || a.scope.localeCompare(b.scope) || a.nom.localeCompare(b.nom));

    tasks.forEach((task, i) => {
        if (i == 0) {
            header += `<th class="text-gray">Tracking</th>`;

            db.get("personnages").value().forEach((perso, j) => {
                header += `<th class="text-gray">${perso.nom}</th>`;
                nbperso = nbperso + 1;
            });
        }

        body += `<tr><td class="text-gray">${task.nom}</td>`;
        
        if (task.scope == 'Personnage') {
            db.get("personnages").value().forEach((perso, j) => {
                let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, perso);
                let checklist = null;
                
                if (indexchecklist < 0) {
                    checklist = addChecklist(task.id, perso.nom);
                } else {
                    checklist = findChecklistByIndex(indexchecklist);
                }
                
                body += `<td class="text-gray"><div class="form-check form-switch"><input class="form-check-input updateChecklist" type="checkbox" data-index="${indexchecklist}" data-champ="tracking" ${(checklist.tracking ? 'checked' : '')}></div></td>`;
            });  
        } else {
            let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, { nom: 'rooster' });
            let checklist = null;
            
            if (indexchecklist < 0) {
                checklist = addChecklist(task.id, 'rooster');
            } else {
                checklist = findChecklistByIndex(indexchecklist);
            }
            
            body += `<td colspan="${nbperso}" class="text-gray"><div class="form-check form-switch"><input class="form-check-input updateChecklist" type="checkbox" data-index="${indexchecklist}" data-champ="tracking" ${(checklist.tracking ? 'checked' : '')}></div></td>`;
        }

        body += `</tr>`;
    });

    header += `</tr></thead>`;
    body += `</tbody>`;

    let html = `<table id="" class="table table-bordered table-condensed">${header}${body}</table>`;

    $('#sectionChecklistTracking').html(html);
}

function showChecklistPrio() {
    let body = `<tbody>`;
    let header = `<thead><tr>`;
    let nbperso = 0;

    let tasks = db.get("taches").value();

    tasks.sort((a, b) => b.reset.localeCompare(a.reset) || a.scope.localeCompare(b.scope) || a.nom.localeCompare(b.nom));
    
    tasks.forEach((task, i) => {
        if (i == 0) {
            header += `<th class="text-gray">Priority</th>`;

            db.get("personnages").value().forEach((perso, j) => {
                header += `<th class="text-gray">${perso.nom}</th>`;
                nbperso = nbperso + 1;
            });
        }
        
        body += `<tr><td class="text-gray">${task.nom}</td>`;
        
        if (task.scope == 'Personnage') {
            db.get("personnages").value().forEach((perso, j) => {
                let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, perso);
                let checklist = null;
                
                if (indexchecklist < 0) {
                    checklist = addChecklist(task.id, perso.nom);
                } else {
                    checklist = findChecklistByIndex(indexchecklist);
                }

                body += `<td class="text-gray"><input class="form-control box-shadow-inset updateChecklist" type="number" data-index="${indexchecklist}" data-champ="prio" value="${checklist.prio}" /></td>`;
            });
        } else {
            let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, { nom: 'rooster' });
            let checklist = null;
            
            if (indexchecklist < 0) {
                checklist = addChecklist(task.id, 'rooster');
            } else {
                checklist = findChecklistByIndex(indexchecklist);
            }
            
            body += `<td colspan="${nbperso}" class="text-gray"><input class="form-control box-shadow-inset updateChecklist" type="number" data-index="${indexchecklist}" data-champ="prio" value="${checklist.prio}" /></td>`;
        }

        body += `</tr>`;
    });

    header += `</tr></thead>`;
    body += `</tbody>`;

    let html = `<table id="" class="table table-bordered table-condensed">${header}${body}</table>`;

    $('#sectionChecklistPrio').html(html);
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------
// -- Fonction de recherche ----------------------------------------------------------
// -----------------------------------------------------------------------------------
function findIndexChecklistRestBonusByTaskAndPersonnage(task, perso) {
    return (db.get("checklist").value()) ? db.get("checklist").value().findIndex((checklist) => checklist.personnage == perso.nom && checklist.task == task.id) : null;
}

function findChecklistByIndex(index) {
    return (db.get("checklist").value()) ? db.get("checklist").get(index).value() : null;
}
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------