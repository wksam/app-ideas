const MessageType = Object.freeze({
    "info": "alert-info",
    "success": "alert-success",
    "fail": "alert-danger"
})

$(".load").click(function() {
    clearTable();
    loadDB();
});

$(".query").click(function() {
    clearTable();
    retrieveDB();
});

$(".clear").click(function() {
    clearTable();
    clearDB();
});

function changeNotificationMessage(message, type = MessageType.info) {
    $(".notification")
        .removeClass(MessageType.info)
        .removeClass(MessageType.success)
        .removeClass(MessageType.fail);

    $(".notification")
        .addClass(type)
        .html(message);
    
    addLogMessage(message);
}

function addLogMessage(message) {
    $(".log").prepend(paragraph(message));
}

function paragraph(text) {
    return "<p>" + text + "</p>";
}

function fillTableRow(userid, name, email) {
    const html = 
        '<tr>' +
            '<td>' + userid + '</td>' +
            '<td>' + name + '</td>' +
            '<td>' + email + '</td>' +
        '</tr>';
    $('tbody').append(html);
}

function clearTable() {
    $('tbody').html('');
}