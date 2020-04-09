const MessageType = Object.freeze({
    'info': 'alert-info',
    'success': 'alert-success',
    'fail': 'alert-danger'
})

$('.load').click(function() {
    clearTable();
    loadDB();

    $(this).prop('disabled', true);
    $('.clear').prop('disabled', false);
});

$('.query').click(function() {
    clearTable();
    retrieveDB();
});

$('.clear').click(function() {
    clearTable();
    clearDB();

    $(this).prop('disabled', true);
    $('.load').prop('disabled', false);
});

function changeNotificationMessage(message, type = MessageType.info) {
    $('.notification')
        .removeClass(MessageType.info)
        .removeClass(MessageType.success)
        .removeClass(MessageType.fail);

    $('.notification')
        .addClass(type)
        .html(message);
    
    addLogMessage(message);
}

function addLogMessage(message) {
    $('.log').prepend(paragraph(message));
}

function paragraph(text) {
    return '<p>' + text + '</p>';
}

function addTableRow(data) {
    const html = '<tr>' + addTableData(data) + '</tr>';
    $('tbody').append(html);
}

function addTableData(data) {
    let html = '';
    Object.keys(data).forEach(function(key) {
        html += '<td>' + data[key] + '</td>'
    });
    return html;
}

function clearTable() {
    $('tbody').html('');
}