var corner = {
    TopLeft: 0,
    TopRight: 1,
    BottomLeft: 2,
    BottomRight: 3,
    VTopLeft: 5,
    VTopRight: 6,
    VBottomLeft: 7,
    VBottomRight: 8,
}

// Top left
$('#tl-range').on('input', function() {
    changeBorderRadiusCSS('border-top-left-radius', $(this).val() + '%', $('#v-tl-range').val() + '%');
    changeOutputValue(corner.TopLeft, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
    if (!$('#params').is(':checked')) {
        changeVerticalFromHorizontal($('#v-tl-range'), $(this).val());
    }
});

// Top right
$('#tr-range').on('input', function() {
    changeBorderRadiusCSS('border-top-right-radius', $(this).val() + '%', $('#v-tr-range').val() + '%');
    changeOutputValue(corner.TopRight, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
    if (!$('#params').is(':checked')) {
        changeVerticalFromHorizontal($('#v-tr-range'), $(this).val());
    }
});

// Bottom left
$('#bl-range').on('input', function() {
    changeBorderRadiusCSS('border-bottom-left-radius', $(this).val() + '%', $('#v-bl-range').val() + '%');
    changeOutputValue(corner.BottomLeft, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
    if (!$('#params').is(':checked')) {
        changeVerticalFromHorizontal($('#v-bl-range'), $(this).val());
    }
});

// Bottom right
$('#br-range').on('input', function() {
    changeBorderRadiusCSS('border-bottom-right-radius', $(this).val() + '%', $('#v-br-range').val() + '%');
    changeOutputValue(corner.BottomRight, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
    if (!$('#params').is(':checked')) {
        changeVerticalFromHorizontal($('#v-br-range'), $(this).val());
    }
});

// Change values

function changeBorderRadiusCSS(property, value, vValue) {
    $('.border-radius').css(property, value + ' ' + vValue);
}

function changeOutputValue(index, value) {
    var outputArrayValues = $('#outputBorder').val().split(' ');
    outputArrayValues[index] = value + '%';
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

function changeVerticalFromHorizontal(verticalInput, horizontalValue) {
    verticalInput.val(horizontalValue);
    changeLabelText(getLabel(verticalInput), verticalInput.val());
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



// Bonus Feature

// Vertical Top Left
$('#v-tl-range').on('input', function() {
    changeBorderRadiusCSS('border-top-left-radius', $('#tl-range').val() + '%', $(this).val() + '%');
    changeOutputValue(corner.VTopLeft, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Vertical Top right
$('#v-tr-range').on('input', function() {
    changeBorderRadiusCSS('border-top-right-radius', $('#tr-range').val() + '%', $(this).val() + '%');
    changeOutputValue(corner.VTopRight, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Vertical Bottom left
$('#v-bl-range').on('input', function() {
    changeBorderRadiusCSS('border-bottom-left-radius', $('#bl-range').val() + '%', $(this).val() + '%');
    changeOutputValue(corner.VBottomLeft, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

// Vertical Bottom right
$('#v-br-range').on('input', function() {
    changeBorderRadiusCSS('border-bottom-right-radius', $('#br-range').val() + '%', $(this).val() + '%');
    changeOutputValue(corner.VBottomRight, $(this).val());
    changeLabelText(getLabel($(this)), $(this).val());
});

$('#params').change(function() {
    if (this.checked) {
        // Change label text
        changeLabelTextToHorizontal('tl-range');
        changeLabelTextToHorizontal('tr-range');
        changeLabelTextToHorizontal('bl-range');
        changeLabelTextToHorizontal('br-range');
        
        // Show params
        $('#v-tl-range').parent().attr('hidden', false);
        $('#v-tr-range').parent().attr('hidden', false);
        $('#v-bl-range').parent().attr('hidden', false);
        $('#v-br-range').parent().attr('hidden', false);

        // Change output values
        $('#outputBorder').val($('#outputBorder').val() + ' / ' + $('#outputBorder').val());
        
        // Update CSS
        changeBorderRadiusCSS('border-top-left-radius', $('#tl-range').val() + '%', $('#tl-range').val() + '%');
        changeBorderRadiusCSS('border-top-right-radius', $('#tr-range').val() + '%', $('#tr-range').val() + '%');
        changeBorderRadiusCSS('border-bottom-left-radius', $('#bl-range').val() + '%', $('#bl-range').val() + '%');
        changeBorderRadiusCSS('border-bottom-right-radius', $('#br-range').val() + '%', $('#br-range').val() + '%');
    } else {
        // Change label text
        changeLabelTextToDefault('tl-range');
        changeLabelTextToDefault('tr-range');
        changeLabelTextToDefault('bl-range');
        changeLabelTextToDefault('br-range');

        // Show params
        $('#v-tl-range').parent().attr('hidden', true);
        $('#v-tr-range').parent().attr('hidden', true);
        $('#v-bl-range').parent().attr('hidden', true);
        $('#v-br-range').parent().attr('hidden', true);
        
        // Change output values
        $('#outputBorder').val(removeFromEnd($('#outputBorder').val(), 4));

        // Update the vertical values to horizontal values
        changeVerticalFromHorizontal($('#v-tl-range'), $('#tl-range').val());
        changeVerticalFromHorizontal($('#v-tr-range'), $('#tr-range').val());
        changeVerticalFromHorizontal($('#v-bl-range'), $('#bl-range').val());
        changeVerticalFromHorizontal($('#v-br-range'), $('#br-range').val());

        // Update CSS
        changeBorderRadiusCSS('border-top-left-radius', $('#tl-range').val() + '%', $('#tl-range').val() + '%');
        changeBorderRadiusCSS('border-top-right-radius', $('#tr-range').val() + '%', $('#tr-range').val() + '%');
        changeBorderRadiusCSS('border-bottom-left-radius', $('#bl-range').val() + '%', $('#bl-range').val() + '%');
        changeBorderRadiusCSS('border-bottom-right-radius', $('#br-range').val() + '%', $('#br-range').val() + '%');
    }
});

function changeLabelTextToHorizontal(id) {
    var tlRange =getLabelById(id);
    tlRange.text('horizontal ' + tlRange.text());
}

function changeLabelTextToDefault(id) {
    var label = getLabelById(id);
    label.text(removeFirstElement(label.text().split(' ')).join(' '));
}

function removeFirstElement(array) {
    array.shift();
    return array;
}

function getLabelById(id) {
    return $('label[for="' + id + '"]');
}

function removeFromEnd(text, length) {
    var outputValue = text.split(' ');
    outputValue.length = length;
    return outputValue.join(' ');
}