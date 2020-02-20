// Tooltip
$('[data-toggle="tooltip"]').tooltip()

let btnCopy = $('#btn-copy');
btnCopy.mouseenter(() => btnCopy.tooltip('dispose').tooltip({ title: 'Copy to clipboard' }).tooltip('show'));
btnCopy.mouseleave(() => btnCopy.tooltip('hide'));

// Copy text
function copy() {
    var copyText = $('#output')[0];

    copyText.select();
    copyText.setSelectionRange(0, 999999);

    document.execCommand('copy');

    $('#btn-copy').tooltip('dispose').tooltip({ title: 'Copied!' }).tooltip('show');
}

// Submit
var input = $('#binaryInput');
$('#binaryInput').keypress(e => {
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
            var result = 0;
            var powVal = 0;
            /* Determining the decimal equivalent of a particular binary digit 
               in the sequence must be calculated using a single mathematical function, 
               for example the natural logarithm. It's up to you to figure out 
               which function to use. */
            for(var i = value.length - 1; i >= 0; i--) {
                result += parseInt(value[i]) * Math.pow(baseInput, powVal);
                powVal++;
            }
            break;
    }
    output.val(result);
    input.val('');
};

// TODO: User must be notified if anything other than a 0 or 1 was entered