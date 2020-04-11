function cloneCard() {
    $('.scene').clone().appendTo('.row');
}

function cloneRow() {
    $('.row').clone().appendTo('.container');
}

function initPane() {
    cloneCard();
    cloneRow();
}

initPane();