const engine = new BrowserEngine("db");
const db = new StormDB(engine);

$(document).ready(function () {
    if (db.get("persos").value() === undefined) db.set("persos", []).save();
    if (db.get("tasks").value() === undefined) db.set("tasks", []).save();
    if (db.get("times").value() === undefined) db.set("times", []).save();
    if (db.get("resetDaily").value() === undefined) db.set("resetDaily", '').save();
    if (db.get("resetWeekly").value() === undefined) db.set("resetWeekly", '').save();
    if (db.get("groupeEnCours").value() === undefined) db.set("groupeEnCours", 1).save();
    if (db.get("counterUna").value() === undefined || db.get("counterUna").value() == null) db.set("counterUna", 0).save();
    if (db.get("counterChaos").value() === undefined || db.get("counterChaos").value() == null) db.set("counterChaos", 0).save();
    if (db.get("counterRaid").value() === undefined || db.get("counterRaid").value() == null) db.set("counterRaid", 0).save();
    if (db.get("counterLegion").value() === undefined || db.get("counterLegion").value() == null) db.set("counterLegion", 0).save();
    if (db.get("progressBarDaily").value() === undefined || db.get("progressBarDaily").value() == null) db.set("progressBarDaily", [{ type: 'chaos', nb: 0, max: 12, reset: 'Quotidien', color: '#1562b9' }, { type: 'raid', nb: 0, max: 4, reset: 'Quotidien', color: '#a14949' }, { type: 'una', nb: 0, max: 24, reset: 'Quotidien', color: 'green' }, { type: 'legion', nb: 0, max: 25, reset: 'Hebdomadaire', color: '#fd7e14' }]).save();

    resetHebdomadaire();
    resetQuotidien();
});

function resetQuotidien() {
    if (db.get('resetDaily').value() != moment().format('DD/MM/YYYY') && moment().format("HH") > 10) {
        db.get('resetDaily').set(moment().format('DD/MM/YYYY'));
        db.save();

        db.get("tasks").value().forEach(function (task, i) {
            if (task.reset == 'Quotidien') {
                db.get("tasks")
                    .get(i)
                    .get('statut')
                    .set(false);

                db.save();
            }
        });

        let groupeEnCours = parseInt(db.get("groupeEnCours").value());

        groupeEnCours++;

        if (groupeEnCours > 3) {
            groupeEnCours = 1;
        }

        db.get('groupeEnCours').set(groupeEnCours);
        db.save();

        db.get("progressBarDaily").value().forEach(function (bar, i) {
            if (bar.reset == 'Quotidien') {
                db.get("progressBarDaily").get(i).get('nb').set(0);
            }
        });

        db.save();

        window.location.reload();
    }
}

function forceResetQuotidien() {
    db.get('resetDaily').set(moment().format('DD/MM/YYYY'));
    db.save();

    db.get("tasks").value().forEach(function (task, i) {
        if (task.reset == 'Quotidien') {
            db.get("tasks")
                .get(i)
                .get('statut')
                .set(false);

            db.save();
        }
    });

    let groupeEnCours = parseInt(db.get("groupeEnCours").value());

    groupeEnCours++;

    if (groupeEnCours > 3) {
        groupeEnCours = 1;
    }

    db.get('groupeEnCours').set(groupeEnCours);
    db.save();

    db.get("progressBarDaily").value().forEach(function (bar, i) {
        if (bar.reset == 'Quotidien') {
            db.get("progressBarDaily").get(i).get('nb').set(0);
        }
    });

    db.save();

    window.location.reload();
}

function resetHebdomadaire() {
    if (db.get('resetWeekly').value() != moment().format('DD/MM/YYYY') && moment().format('E') == 3 && moment().format("HH") > 10) {
        db.get('resetWeekly').set(moment().format('DD/MM/YYYY'));
        db.save();

        db.get("tasks").value().forEach(function (task, i) {
            if (task.reset == 'Hebdomadaire') {
                db.get("tasks")
                    .get(i)
                    .get('statut')
                    .set(false);

                db.save();
            }
        });

        db.get("progressBarDaily").value().forEach(function (bar, i) {
            if (bar.reset == 'Hebdomadaire') {
                db.get("progressBarDaily").get(i).get('nb').set(0);
            }
        });
    
        db.save();
    }
}

function forceResetHebdomadaire() {
    db.get('resetWeekly').set(moment().format('DD/MM/YYYY'));
    db.save();

    db.get("tasks").value().forEach(function (task, i) {
        if (task.reset == 'Hebdomadaire') {
            db.get("tasks")
                .get(i)
                .get('statut')
                .set(false);

            db.save();
        }
    });

    db.get("progressBarDaily").value().forEach(function (bar, i) {
        if (bar.reset == 'Hebdomadaire') {
            db.get("progressBarDaily").get(i).get('nb').set(0);
        }
    });

    db.save();
}