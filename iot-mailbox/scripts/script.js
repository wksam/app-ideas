function addNotification(message) {
    $('.notification').html(message);
}

function addLog(message) {
    const html = '<p>' + message + '</p>'
    $('.log').prepend(html);
}

const mailbox = new IOTMailbox(1000, checkDoor);

$('.start').click(() => {
    mailbox.startMonitoring();
    $('.start').prop('disabled', true);
    $('.stop').prop('disabled', false);
});

$('.stop').click(() => {
    mailbox.stopMonitoring();
    $('.stop').prop('disabled', true);
    $('.start').prop('disabled', false);
});

$('.reset').click(() => {
    
});

function checkDoor(level) {
    if(level < 0)
        addNotification('Door is closed');
    else
        addNotification('Door is opened');
}