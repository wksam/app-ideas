document.querySelector('.btn-start').addEventListener('click', onStart);
document.querySelector('.btn-stats').addEventListener('click', onStats);

document.querySelector('.btn-easy').addEventListener('click', onStartEasy);
document.querySelector('.btn-medium').addEventListener('click', onStartMedium);
document.querySelector('.btn-hard').addEventListener('click', onStartHard);

document.querySelector('.btn-restart').addEventListener('click', onRestart);

document.querySelectorAll('.btn-back').forEach(function(btn) {
    btn.addEventListener('click', onBack);
});

function onStart(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.menu-level').hidden = false;
}


function onStats(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.menu-stats').hidden = false;
    fillStats();
}

function onBack(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.menu-home').hidden = false;
}

function onStartEasy(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.title').hidden = true;
    document.querySelector('.progress').hidden = false;
    game.difficult = { name: 'easy', imgs: easySvg };
    game.startTimer();
    init(easySvg, 'easy');
}

function onStartMedium(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.title').hidden = true;
    document.querySelector('.progress').hidden = false;
    game.difficult = { name: 'medium', imgs: mediumSvg };
    game.startTimer();
    init(mediumSvg, 'medium');
}

function onStartHard(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.title').hidden = true;
    document.querySelector('.progress').hidden = false;
    game.difficult = { name: 'hard', imgs: hardSvg };
    game.startTimer();
    init(hardSvg, 'hard');
}

function onRestart(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.title').hidden = true;
    document.querySelector('.progress').hidden = false;
    game.startTimer();
    init(game.difficult.imgs, game.difficult.name);
}