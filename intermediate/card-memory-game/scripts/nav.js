document.querySelector('.btn-start').addEventListener('click', onStart);
function onStart() {
    document.querySelector('.menu-home').hidden = true;
    document.querySelector('.menu-level').hidden = false;
}

document.querySelector('.btn-stats').addEventListener('click', onStats);
function onStats() {
    document.querySelector('.menu-home').hidden = true;
    document.querySelector('.menu-stats').hidden = false;

    fillStats();
}

document.querySelectorAll('.btn-back').forEach(function(btn) {
    btn.addEventListener('click', onBack);
});
function onBack(e) {
    e.target.parentNode.parentNode.hidden = true;
    document.querySelector('.menu-home').hidden = false;
}