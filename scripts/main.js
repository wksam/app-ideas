// Top left
$('#tl-range').on('input', function() {
    $('.border-radius').css({ 'border-top-left-radius': $(this).val() + '%' });
    changeOutputValue('top-left', $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Top right
$('#tr-range').on('input', function() {
    $('.border-radius').css({ 'border-top-right-radius': $(this).val() + '%' });
    changeOutputValue('top-right', $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Bottom left
$('#bl-range').on('input', function() {
    $('.border-radius').css({ 'border-bottom-left-radius': $(this).val() + '%' });
    changeOutputValue('bottom-left', $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Bottom right
$('#br-range').on('input', function() {
    $('.border-radius').css({ 'border-bottom-right-radius': $(this).val() + '%' });
    changeOutputValue('bottom-right', $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Change values
function changeOutputValue(corner, value) {
    var outputArrayValues = $('#outputBorder').val().split(' ');
    switch(corner) {
        case 'top-left':
            outputArrayValues[0] = value + '%';
            break;
        case 'top-right':
            outputArrayValues[1] = value + '%';
            break;
        case 'bottom-left':
            outputArrayValues[2] = value + '%';
            break;
        case 'bottom-right':
            outputArrayValues[3] = value + '%';
            break;
    }
    $('#outputBorder').val(outputArrayValues.join(' '));
}

function changeLabelText(label, value) {
    var labelText = label.text().split(' ');
    labelText[labelText.length - 1] = value + '%';
    label.text(labelText.join(' '));
}

function getLabel(input) {
    return $("label[for='" + input.attr('id') + "']");
}

// Copy to clipboard
function copy(elem) {
    var copyText = $('#outputBorder')[0];

    copyText.select();
    copyText.setSelectionRange(0, 999999);

    document.execCommand('copy');
    
    elem.value = 'Copied!';
}

$('#copy').mouseleave(() => $('#copy').val('Copy to clipboard'));