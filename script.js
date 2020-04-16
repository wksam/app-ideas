$('.alert').hide();

$('form').submit(function(e) {
    e.preventDefault();

    const inputValue = $(this).serializeArray()[0].value.trim();
    if(inputValue == '') { showAlert("JSON text area is empty"); return; }

    try {
        const jsonValue = JSON.parse(inputValue);
        if(isNested(jsonValue)) { showAlert("Nested JSON structures are not supported."); return; }
        $('#output').text(convertToCSV(jsonValue));
        hideAlert();
    } catch (error) {
        showAlert("It doesn't contain valid JSON");
    }
});

function isNested(json) {
    return isObject(json);
}

function isObject(json) {
    return Object.keys(json).some(function(key) {
        return json[key] && typeof json[key] === 'object';
    });
}

function convertToCSV(json) {
    const keys = Object.keys(json);
    const values = Object.values(json);

    const header = keys.map(csvRules).join(',');
    const body = values.map(csvRules).join(',');
    
    return header.concat('\n', body);
}

function csvRules(currentValue) {
    // Convert to string and replace quote to double-quote
    currentValue = currentValue.toString().replace(/"/g, '""');

    // Embedded with quote if exists commas, double-quote, line-breaks, spaces
    if(currentValue.includes(',') || currentValue.includes('"') || currentValue.includes('\n') || currentValue.startsWith(' ') || currentValue.endsWith(' '))
        currentValue = '"' + currentValue + '"';

    return currentValue;
}

function showAlert(message) {
    $('.alert').text(message).fadeIn();
}

function hideAlert() {
    $('.alert').fadeOut();
}

$('button:reset').click(function() {
    $('#output').text('');
})