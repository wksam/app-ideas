$('.alert').hide();

function disableSave() {
    $('#save').prop('disabled', true);
}

function enableSave() {
    $('#save').prop('disabled', false);
}

function showAlert(message) {
    $('.alert').text(message).fadeIn();
}

function hideAlert() {
    $('.alert').fadeOut();
}

$('button:reset').click(function() {
    $('#input').text('');
    $('#output').text('');
    disableSave();
})

$('input[type=radio][name=type]').change(function() {
    const names = this.value.split('2').map((currentValue) => currentValue.toUpperCase());
    $('label[for=input]').text(names[0]);
    $('label[for=output]').text(names[1]);

    const title = names[0] + ' to ' + names[1];
    $('h1').text(title);
    document.title = title;
});