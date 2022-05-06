var checkboxs = [
    'una1deathblade',
    'una2deathblade',
    'una3deathblade',
    'choas1deathblade',
    'choas2deathblade',
    'raid1deathblade',
    'raid2deathblade',
    'una1shadowhunter',
    'una2shadowhunter',
    'una3shadowhunter',
    'chaos1shadowhunter',
    'chaos2shadowhunter',
    'raid1shadowhunter',
    'raid2shadowhunter',
    'una1sorceress',
    'una2sorceress',
    'una3sorceress',
    'chaos1sorceress',
    'chaos2sorceress',
    'raid1sorceress',
    'raid2sorceress',
    'una1paladin',
    'una2paladin',
    'una3paladin',
    'chaos1paladin',
    'chaos2paladin',
    'raid1paladin',
    'raid2paladin',
    'una1bard',
    'una2bard',
    'una3bard',
    'chaos1bard',
    'chaos2bard',
    'raid1bard',
    'raid2bard',
    'una1sharpshooter',
    'una2sharpshooter',
    'una3sharpshooter',
    'chaos1sharpshooter',
    'chaos2sharpshooter',
    'raid1sharpshooter',
    'raid2sharpshooter',
    'chaosgate',
    'worldboss',
    'adventureisland1',
    'adventureisland2',
    'emote1',
    'emote2',
    'emote3',
    'emote4',
    'emote5',
    'emote6',
    'song1',
    'song2',
    'song3',
    'song4',
    'song5',
    'song6',
    'lifeskill',
    'guilddeathblade',
    'raidedeathblade',
    'raideshadowhunter',
    'raidesorceress',
    'raidepaladin',
    'raidebard',
    'raidesharpshooter'
];

var checkboxWeekly = [
    'unaw1deathblade',
    'unaw2deathblade',
    'unaw3deathblade', 
    'unaw1shadowhunter',
    'unaw2shadowhunter',
    'unaw3shadowhunter', 
    'unaw1sorceress',
    'unaw2sorceress',
    'unaw3sorceress',
    'unaw1paladin',
    'unaw2paladin',
    'unaw3paladin',
    'unaw1bard',
    'unaw2bard',
    'unaw3bard',
    'unaw1sharpshooter',
    'unaw2sharpshooter',
    'unaw3sharpshooter',
    
    'unawg1deathblade',
    'unawg2deathblade',
    'unawg3deathblade', 
    'unawg1shadowhunter',
    'unawg2shadowhunter',
    'unawg3shadowhunter', 
    'unawg1sorceress',
    'unawg2sorceress',
    'unawg3sorceress',
    'unawg1paladin',
    'unawg2paladin',
    'unawg3paladin',
    'unawg1bard',
    'unawg2bard',
    'unawg3bard',
    'unawg1sharpshooter',
    'unawg2sharpshooter',
    'unawg3sharpshooter',
    'ghostship',
    'marchanteventt2',
    'marchanteventt3',
    'cubedeathblade',
    'cubeshadowhunter',
    'cubesorceress',
    'cubepaladin',
    'cubebard',
    'cubesharpshooter',
    //'t1dbcdeathblade',
    //'t1dbcshadowhunter',
    //'t1dbcsorceress',
    //'t1dbcpaladin',
    //'t1dbcbard',
    //'t1dbcsharpshooter',
    //'t1nodeathblade',
    //'t1noshadowhunter',
    //'t1nosorceress',
    //'t1nopaladin',
    //'t1nobard',
    //'t1nosharpshooter',
    //'t1htwdeathblade',
    //'t1htwshadowhunter',
    //'t1htwsorceress',
    //'t1htwpaladin',
    //'t1htwbard',
    //'t1htwsharpshooter',
    //'t1hpdeathblade',
    //'t1hpshadowhunter',
    //'t1hpsorceress',
    //'t1hppaladin',
    //'t1hpbard',
    //'t1hpsharpshooter'
    't3haodeathblade',
    't3naoshadowhunter',
    't3hopdeathblade',
    // 't3nopshadowhunter',
    't2rlsorceress',
    't2rlsharpshooter',
    't2ffpsorceress',
    't2ffpsharpshooter',
    't2sisorceress',
    't2sipaladin',
    't2sibard',
    // 't2sisharpshooter',
    't2tksorceress',
    't2tkpaladin',
    't2tkbard',
    // 't2tksharpshooter',
    't2assorceress',
    't2aspaladin',
    't2asbard',
    // 't2assharpshooter',
    'argosp1deathblade',
    // 'argosp1shadowhunter'
];

var othercheckbox = [
    'feitonsorceress',
    'papunikapaladin',
    'papunikabard',
    'feitonsharpshooter',
    'southverndeathblade'
];

var progressRepos = [
    'reposraidsharpshooter',
    'reposraidbard',
    'reposraidpaladin',
    'reposraidsorceress',
    'reposraidshadowhunter',
    'reposraiddeathblade'
];

var igears = [
    'igeardeathblade',
    'igearshadowhunter',
    'igearsorceress',
    'igearpaladin',
    'igearbard',
    'igearsharpshooter',
];

$(document).ready(function () {
    $('#resetdaily').html('Reset le ' + localStorage.getItem('resetdaily'));
    $('#resetweekly').html('Reset le ' + localStorage.getItem('resetweekly'));
    
    setProgressBarDaily();
    setProgressBarWeekly();
    setProgressRepos();

    $('#forceResetDaily').on('click', function() {
        resetDaily();
    });

    if (localStorage.getItem('initialisation')) {
        console.log('Données initialisées')

        if (moment().format("DD/MM/YYYY") != localStorage.getItem('resetdaily') && moment().format("HH") > 11) {
            resetDaily();

            localStorage.setItem('resetdaily', moment().format("DD/MM/YYYY"));
        }
       
        console.log(moment().format("dd"));
        
        if (moment().format("DD/MM/YYYY") != localStorage.getItem('resetweekly') && moment().format("dd") == 'Th') {
            checkboxWeekly.forEach(checkbox => localStorage.setItem(checkbox, false));
            localStorage.setItem('resetweekly', moment().format("DD/MM/YYYY"));
        }

        checkboxs.forEach(checkbox => localStorage.getItem(checkbox) == true ? $('#' + checkbox).attr('checked', true) : null);
        checkboxWeekly.forEach(checkbox => localStorage.getItem(checkbox) == true ? $('#' + checkbox).attr('checked', true) : null);
        othercheckbox.forEach(checkbox => localStorage.getItem(checkbox) == true ? $('#' + checkbox).attr('checked', true) : null);
    } else {
        console.log('Données non initialisées')

        localStorage.setItem('initialisation', true);
        localStorage.setItem('resetdaily', moment().format("DD/MM/YYYY"));
        localStorage.setItem('resetweekly', moment().format("DD/MM/YYYY"));

        checkboxs.forEach(checkbox => localStorage.setItem(checkbox, false));
        checkboxWeekly.forEach(checkbox => localStorage.setItem(checkbox, false));
        othercheckbox.forEach(checkbox => localStorage.setItem(checkbox, false));
    }

    $('.form-check-input').on('click', function () {
        console.log($(this).attr('id'));

        let val = $(this).prop('checked');
        let id = $(this).attr('id');

        localStorage.setItem(id, val ? 1 : 0);
        
        setProgressBarDaily();
        setProgressBarWeekly();

        let progress = $(this).data('progress');

        let value = $(`#${progress}`).attr('aria-valuenow');

        if(val && parseInt(value) >= 20) {
            value = parseInt(value) - 20;
        } else if (!val) {
            value = parseInt(value) + 20;
        }

        if (value > 100) {
            value = 100;
        }

        $(`#${progress}`).attr('aria-valuenow', value);
        $(`#${progress}`).html(value);
        $(`#${progress}`).attr('style', `width: ${value}%`);
    });

    igears.forEach(function(igear) {
        let value = localStorage.getItem(igear);

        if (!value) {
            value = 0;
            localStorage.setItem(igear, value);
        }

        $(`#${igear}`).html(value);
    });

    $('.plusigear').on('click', function() {
        let igear = $(this).data('igear');
        let value = localStorage.getItem(igear);
        value = parseInt(value) + 1;

        console.log(igear, value)

        localStorage.setItem(igear, value);

        $(`#${igear}`).html(value);
    });
});

function resetDaily() {
    checkboxs.forEach(function(checkbox) {
        let progress = $(`#${checkbox}`).data('progress');

        if(progress) {
            let checked = $(`#${checkbox}`).prop('checked');
            let value = 0;
            value = localStorage.getItem(progress);

            console.log(checkbox, checked);
            console.log(progress, value);

            if(checked && parseInt(value) >= 20) {
                value = parseInt(value) - 20;
            } else if (!checked) {
                value = parseInt(value) + 10;
            }

            if (value > 100) {
                value = 100;
            }

            console.log(progress, value);

            localStorage.setItem(progress, value);
        }

        localStorage.setItem(checkbox, false);
    });
}

function setProgressRepos() {
    console.log('progressRepos');

    progressRepos.forEach(function(repos) {
        let value = localStorage.getItem(repos);
        console.log(repos, value);

        if (value == null) {
            value = 0;
            localStorage.setItem(repos, value);
        }

        console.log(repos, value);

        $(`#${repos}`).attr('aria-valuenow', value);
        $(`#${repos}`).html(value);
        $(`#${repos}`).attr('style', `width: ${value}%`);
    });
}

function setProgressBarDaily() {
    let nbCheckboxDaily = checkboxs.length;
    let nbCheckedDaily = 0;
    let colorProgressBarDaily = '';

    checkboxs.forEach(checkbox => localStorage.getItem(checkbox) == 1 ? nbCheckedDaily++ : '');

    let pourcentageDaily = (nbCheckedDaily / nbCheckboxDaily) * 100;
        
    if (pourcentageDaily < 50) {
        colorProgressBarDaily = 'bg-danger';
    } else if (pourcentageDaily < 90) {
        colorProgressBarDaily = 'bg-warning';
    } else {
        colorProgressBarDaily = 'bg-success';
    }
        
    $('#progressBarDaily').attr('style', `width: ${pourcentageDaily}%`)
    $('#progressBarDaily').attr('class', `progress-bar ${colorProgressBarDaily}`);
}

function setProgressBarWeekly() {
    let nbCheckboxWeekly = checkboxWeekly.length;
    let nbCheckedWeekly = 0;
    let colorProgressBarWeekly = '';

    checkboxWeekly.forEach(checkbox => localStorage.getItem(checkbox) == 1 ? nbCheckedWeekly++ : '');

    let pourcentageWeekly = (nbCheckedWeekly / nbCheckboxWeekly) * 100;
        
    if (pourcentageWeekly < 50) {
        colorProgressBarWeekly = 'bg-danger';
    } else if (pourcentageWeekly < 90) {
        colorProgressBarWeekly = 'bg-warning';
    } else {
        colorProgressBarWeekly = 'bg-success';
    }
        
    $('#progressBarWeekly').attr('style', `width: ${pourcentageWeekly}%`)
    $('#progressBarWeekly').attr('class', `progress-bar ${colorProgressBarWeekly}`);
}


document.addEventListener('DOMContentLoaded', () =>
  requestAnimationFrame(updateTime)
)

function updateTime() {
  document.documentElement.style.setProperty('--timer-day', "'" + moment().format("dd") + "'");
  document.documentElement.style.setProperty('--timer-hours', "'" + moment().format("k") + "'");
  document.documentElement.style.setProperty('--timer-minutes', "'" + moment().format("mm") + "'");
  document.documentElement.style.setProperty('--timer-seconds', "'" + moment().format("ss") + "'");
  requestAnimationFrame(updateTime);
}

// document.getElementById('testaffichage').innerHTML = localStorage.getItem('info', 1);
