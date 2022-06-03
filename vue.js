const engine = new BrowserEngine("db");
const db = new StormDB(engine);

var persoEnCours = [];

$(document).ready(function () {
    
    getPersoFromGroupe('Main');
    getPersoFromGroupe(db.get("groupeEnCours").value());

    persoEnCours.forEach(function (p) {
        let htmlTaches = '';

        getTachesFromPerso(p).forEach(function (t) {
            let i = getIndexTask(t);

            htmlTaches += `
            <div class="card mb-3">
                <div class="d-flex">
                    <div class="card-body">
                        ${t.nomTask}<br>
                        <i class="color-gray">${t.typeTask} - ${t.dureeTask} min - ${t.persoTask}</i>
                        <div class="form-check form-switch float-end">
                            <input class="form-check-input switchMajTask" data-index="${i}" data-champs="statutTask" type="checkbox" id="statutTaskDetail${i}" ${t.statutTask ? 'checked' : ''}>
                        </div>
                    </div>
                </div>
            </div>`;
        });

        let html = `
            <section style="background-color: red;width: 20vw;height: 100vh;">
                <img src="images/${p.imagePerso}" alt="" style="width: 18vw;">

                <section id="main-taches" style="width: 18vw;background-color: blue;">
                    ${htmlTaches}
                </section>
            </section>`;

        $('#sectionPersoEnCours').html(html);
    });
});

function getPersoFromGroupe(g) {
    db.get("personnages").value().forEach(function (p) {
        if (g == p.groupePerso) {
            persoEnCours.push(p);
        }
    });
}

function getTachesFromPerso(p) {
    let tasks = [];

    db.get("tasks").value().forEach(function (t) {
        if (t.persoTask == p.typePerso) {
            tasks.push(t);
        }
    });

    return tasks;
}

function getIndexTask(task) {
    let index = 0;

    db.get("tasks").value().forEach(function (t, i) {
        if (task == t) index = i;
    });

    return index;
}