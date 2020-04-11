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

const bodyStyle = window.getComputedStyle(document.body);

$('button').click(function(e) {
    const card = $(this).parents('.card');
    changeRotation($(this), card);
    changeScale($(this), card);
});

function changeRotation(btn, card) {
    if(btn.hasClass('horizontal'))
        card.toggleClass('rotate-x');
    else
        card.toggleClass('rotate-y');
}

function changeScale(btn, card) {
    if(btn.hasClass('horizontal'))
        if(card.hasClass('scale'))
            card.removeClass('scale').addClass('scale-x');
        else if(card.hasClass('scale-x'))
            card.removeClass('scale-x').toggleClass('scale');
        else
            card.toggleClass('scale-y');
    else
        if(card.hasClass('scale'))
            card.removeClass('scale').addClass('scale-y');
        else if(card.hasClass('scale-y'))
            card.removeClass('scale-y').toggleClass('scale');
        else
            card.toggleClass('scale-x');
}