function cloneCard() {
    $('.image > .scene').clone().appendTo('.image.row');
}

function cloneRow() {
    $('.image.row').clone().appendTo('.container');
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
            card.removeClass('scale-x').addClass('scale');
        else
            card.toggleClass('scale-y');
    else
        if(card.hasClass('scale'))
            card.removeClass('scale').addClass('scale-y');
        else if(card.hasClass('scale-y'))
            card.removeClass('scale-y').addClass('scale');
        else
            card.toggleClass('scale-x');
}

$('form').submit(function(e) {
    const url = $(this).serializeArray()[0].value;

    $('button').prop('disabled', true);
    changeAlert('Testing if the url is valid', 'alert-info');
    tryGetUrlImage(url);
    e.preventDefault();
});

function tryGetUrlImage(url) {
    $.ajax({
        type: 'GET',
        url: url,
        statusCode: {
            404: notFoundHandler,
        },
        success: () => {
            changeAlert('The request has succeeded', 'alert-success');
            setBackgrounImage(url);
        },
        complete: onComplete,
        error: onError
    })
}

function onComplete() {
    $('button').prop('disabled', false);
    $('form :input').val('');
}

function notFoundHandler() {
    changeAlert('404 Not found, try again.', 'alert-danger')
}

function onError() {
    changeAlert('Something is wrong, try again.', 'alert-danger')
}

function changeAlert(text, className) {
    removeAlertClass();
    $('.alert').addClass(className).html(text);
}

function removeAlertClass() {
    $('.alert').removeClass('alert-info').removeClass('alert-danger').removeClass('alert-success');
}

function setBackgrounImage(url) {
    document.documentElement.style.setProperty('--bg-image', 'url(' + url + ')');
}