// Submit
var input = $('#binaryInput');
input.keypress(e => {
    // console.log(e.which);
    if (e.which == '13') {
        input.removeClass('is-invalid');
        convert();
    }
    else if (e.which == '48' || e.which == '49') {
        input.removeClass('is-invalid');
    } else {
        // User must be notified if anything other than a 0 or 1 was entered
        input.addClass('is-invalid');
        return false;
    }
});

input.on('paste', function(e) {
    console.log('paste');
    var pasteData = e.originalEvent.clipboardData.getData('Text');
    if(!isBinary(pasteData)) {
        input.addClass('is-invalid');
        return false;
    } else {
        input.removeClass('is-invalid');
    }
});

function isBinary(value) {
    for (var i = 0; i < value.length; i++) {
        if(value[i] == '1' || value[i] == '0') continue;
        else return false;
    }
    return true;
}

// Converter
function convert() {
    var input = $('#binaryInput');
    var baseInput = parseInt(input.attr('base'));
    // Arrays may not be used to contain the binary digits entered by the user
    var value = input.val();

    var output = $('#output');
    var baseOutput = parseInt(output.attr('base'));

    switch(baseOutput) {
        case 10:
            result = calculate(value, baseInput);
            break;
    }
    output.val(result);
    input.val('');
};

/* Determining the decimal equivalent of a particular binary digit 
    in the sequence must be calculated using a single mathematical function, 
    for example the natural logarithm. It's up to you to figure out 
    which function to use. */
function calculate(value, base) {
    var result = 0;
    var powVal = 0;
    console.log(value);
    for(var i = value.length - 1; i >= 0; i--) {
        result += parseInt(value[i]) * Math.pow(base, powVal);
        powVal++;
    }
    return result;
}