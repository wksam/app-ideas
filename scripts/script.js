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
$('#binaryInput').keypress(e => {
    if (e.which == '13')
        convert();
});

// Convert
function convert() {
    var output = $('#output');
    var baseOutput = parseInt(output.attr('base'));

    var input = $('#binaryInput');
    var baseInput = parseInt(input.attr('base'));
    var value = input.val();

    switch(baseOutput) {
        case 10:
            var result = 0;
            var powVal = 0;
            for(var i = value.length - 1; i >= 0; i--) {
                result += parseInt(value[i]) * Math.pow(baseInput, powVal);
                powVal++;
            }
            break;
    }
    output.val(result);
};
