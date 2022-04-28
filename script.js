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
    'guilddeathblade'
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
];

$(document).ready(function () {
    $('#resetdaily').html('Reset le ' + localStorage.getItem('resetdaily'));

    if (localStorage.getItem('initialisation')) {
        console.log('Données initialisées')

        if (moment().format("DD/MM/YYYY") != localStorage.getItem('resetdaily') && moment().format("HH") > 10) {
            checkboxs.forEach(checkbox => localStorage.setItem(checkbox, false));
            localStorage.setItem('resetdaily', moment().format("DD/MM/YYYY"));
        }
        
        if (moment().format("DD/MM/YYYY") != localStorage.getItem('resetweekly') && moment().format("dd") == 'TH') {
            checkboxWeekly.forEach(checkbox => localStorage.setItem(checkbox, false));
            localStorage.setItem('resetweekly', moment().format("DD/MM/YYYY"));
        }

        checkboxs.forEach(checkbox => localStorage.getItem(checkbox) == true ? $('#' + checkbox).attr('checked', true) : null);
        checkboxWeekly.forEach(checkbox => localStorage.getItem(checkbox) == true ? $('#' + checkbox).attr('checked', true) : null);
    } else {
        console.log('Données non initialisées')

        localStorage.setItem('initialisation', true);
        localStorage.setItem('resetdaily', moment().format("DD/MM/YYYY"));
        localStorage.setItem('resetweekly', moment().format("DD/MM/YYYY"));

        checkboxs.forEach(checkbox => localStorage.setItem(checkbox, false));
        checkboxWeekly.forEach(checkbox => localStorage.setItem(checkbox, false));
    }

    $('.form-check-input').on('click', function () {
        console.log($(this).attr('id'));

        let val = $(this).prop('checked');
        let id = $(this).attr('id');

        localStorage.setItem(id, val ? 1 : 0);

        let nbCheckboxDaily = checkboxs.length;
        let nbCheckedDaily = 0

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
        
        
        let nbCheckboxWeekly = checkboxWeekly.length;
        let nbCheckedWeekly = 0

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
        
        console.log(nbCheckboxDaily);
        console.log(nbCheckedDaily);
        console.log(pourcentageDaily);
    });
});


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
