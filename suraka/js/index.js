// TODO
// Reset quotidien hebdo -> gerer le repos

$(document).ready(function () {
    showCounter();
    showProgressBar();
    showTaches();
});

$(document).on('click', '.updateChecklist', function () {
    let index = $(this).data('index');
    let repetion = $(this).data('rep');
    let type = $(this).data('type');
    let champ = $(this).data('champ');

    let checklist = findChecklistByIndex(index);

    let done = parseInt(checklist.done) + 1

    db.get("checklist")
        .get(index)
        .get(champ)
        .set(done);
    db.save();

    if (done == repetion) {
        $(this).addClass('done-task');
        $(this).removeClass('td-task');
        $(this).removeClass('pointer'); 
        $(this).removeClass('updateChecklist'); 
        $(this).css('background-color', '');
        $(this).css('color', '');
        $(this).html('Done');
    } else {
        $(this).html(`${done} / ${repetion}`);
    }

    incrementeCounter(type);
    incrementerProgressBar(type);
});

function showTaches() {
    let body = `<tbody>`;
    let header = `<thead><tr>`;
    let nbperso = 0;
    let groupeEnCours = db.get('groupeEnCours').value();

    let tasks = db.get("taches").value();

    tasks.sort((a, b) => b.reset.localeCompare(a.reset) || a.scope.localeCompare(b.scope) || a.ordre - b.ordre || a.nom.localeCompare(b.nom));

    tasks.forEach((task, i) => {
        
        if (i == 0) {
            header += `<th colspan="2" class="text-gray"><span class="badge badge-color" style="background-color: gray;color: black;">TODO</span></th>`;
            db.get("personnages").value().forEach((perso, j) => {
                header += `<th class="text-gray" style="text-align: center;"><img src="${perso.icone}" /><span class="badge badge-color" style="background-color: ${groupeEnCours == perso.groupe ? 'ivory' : 'gray'};color: black;">${perso.nom} [${perso.gearlevel}]</span></th>`;
                nbperso++;
            });
        }
        
        // console.log(task);

        let r = hexdec(task.color.substr(1, 2));
        let g = hexdec(task.color.substr(3, 2));
        let b = hexdec(task.color.substr(5, 2));

        let style = '';

        if (r + g + b > 382) {
            style = `background-color: ${task.color};color: black;`;
        } else {
            style = `background-color: ${task.color};color: white;`;
        }

        body += `<tr><td class="text-gray"><span class="badge badge-color" style="${style}">${task.nom}</span></td><td><img style="width: 36px;" src="${task.icone}"/></td>`;

        if (task.scope == 'Personnage') {
            db.get("personnages").value().forEach((perso, j) => {
                let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, perso);
                let checklist = null;
                
                if (indexchecklist < 0) {
                    body += `<td class="text-gray"></td>`;
                } else {
                    checklist = findChecklistByIndex(indexchecklist);
                    
                    if (!checklist.tracking) {
                        body += `<td class="text-gray"></td>`;
                    } else if (checklist.done >= task.repetition) {
                        body += `<td class="text-gray"><span class="badge badge-color done-task">Done</span></td>`;
                    } else {
                        body += `<td class="text-gray"><span class="badge badge-color pointer updateChecklist" data-index="${indexchecklist}" data-champ="done" data-rep="${task.repetition}" data-type="${task.type}" style="${style}">${checklist.done} / ${task.repetition}</span></td>`;
                    }
                }
            });
        } else {
            let indexchecklist = findIndexChecklistRestBonusByTaskAndPersonnage(task, { nom: 'rooster' });
            let checklist = null;

            if (indexchecklist < 0) {
                body += `<td colspan="${nbperso}" class="text-gray"></td>`;
            } else {
                checklist = findChecklistByIndex(indexchecklist);

                // console.log(task, checklist, findTimeForTask(task), task.opening.length);
                
                if (!checklist.tracking) {
                    body += `<td colspan="${nbperso}" class="text-gray"></td>`;
                } else if (task.opening.length > 0 && !findTimeForTask(task)) {
                    body += `<td colspan="${nbperso}" class="text-gray"><span class="badge badge-color done-task">Pas aujourd'hui</span></td>`;
                } else if (checklist.done >= task.repetition) {
                    body += `<td colspan="${nbperso}" class="text-gray"><span class="badge badge-color done-task">Done</span></td>`;
                } else {
                    body += `<td colspan="${nbperso}" class="text-gray"><span class="badge badge-color pointer updateChecklist" data-index="${indexchecklist}" data-champ="done" data-rep="${task.repetition}" data-type="${task.type}" style="${style}">${checklist.done} / ${task.repetition}</span></td>`;
                }
            }
        }

        body += `</tr>`;
    });

    header += `</tr></thead>`;
    body += `</tbody>`;

    let html = `<table id="" class="table table-bordered table-condensed">${header}${body}</table>`;

    $('#sectionTaches').html(html);
}

function hexdec(hexString) {
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '')
    return parseInt(hexString, 16)
}

function showCounter() {
    $('#counterUna').html(db.get('counterUna').value());
    $('#counterChaos').html(db.get('counterChaos').value());
    $('#counterRaid').html(db.get('counterRaid').value());
    $('#counterLegion').html(db.get('counterLegion').value());
}

function showProgressBar() {
    db.get("progressBarDaily").value().forEach(function (bar) {
        let width = (bar.nb * 100) / bar.max;

        if (width > 100) {
            width = 100;
        }

        $(`#progress${bar.type}`).html(`<div class="progress-bar" style="width: ${width}%; background-color: ${bar.color};"></div>`);
    });
}

function rangeSlide(value) {
    // console.log(value);
    // document.getElementById('rangeValue').innerHTML = value;

    $('.tdborder-task').removeClass('selected-border');

    $('.tdborder-task').each(function (index) {
        let prio = $(this).data('prio')
        // console.log(index + ": " + $(this).data('prio'));

        if (value > prio) {
            $(this).addClass('selected-border');
        }
    });
}

function incrementeCounter(type) {
    // console.log(type)
    switch (type) {
        case 'chaos':
            counter = 'counterChaos';
            break;

        case 'raid':
            counter = 'counterRaid';
            break;

        case 'una':
            counter = 'counterUna';
            break;

        case 'legion':
            counter = 'counterLegion';
            break;
    
        default:
            break;
    }
    
    db.get(counter).set(parseInt(db.get(counter).value()) + 1);
    db.save();

    $('#counterUna').html(db.get('counterUna').value());
    $('#counterChaos').html(db.get('counterChaos').value());
    $('#counterRaid').html(db.get('counterRaid').value());
    $('#counterLegion').html(db.get('counterLegion').value());
}

function incrementerProgressBar(type) {
    let index = -1;
    let nb = 0

    db.get("progressBarDaily").value().forEach(function (bar, i) {
        if (bar.type == type) {
            index = i;
            nb = bar.nb + 1;
        }
    });

    if (index >= 0) {
        db.get("progressBarDaily")
            .get(index)
            .get('nb')
            .set(nb);
        db.save();
    }

    showProgressBar();
}

function findTimeForTask(task) {
    let result = false;
    
    db.get("horaires").value().forEach(function (time, i) {
        if (time.type == task.opening && moment().isoWeekday() == time.day) {
            result = true;
        }
    });

    return result;
}
