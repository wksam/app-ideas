const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;


function getDiffiultyBadge() {
    switch (quiz.currentDifficulty()) {
        case 'easy':
            return 'success';
        case 'medium':
            return 'warning';
        case 'hard':
            return 'danger';
        default:
            return '';
    }
}

function shuffle(array) {
    let n = array.length;
    let temp;
    let index;

    while (n > 0) {
        index = Math.floor(Math.random() * n);
        n--;
        temp = array[n];
        array[n] = array[index];
        array[index] = temp;
    }
    return array;
}

function getQuizDuration() {
    const duration = Date.now() - quiz.start;
    const seconds = Math.floor(duration / SECOND);
    const minutes = Math.floor(duration / MINUTE);
    const hours = Math.floor(duration / HOUR);

    return ((hours < 10) ? '0' + hours : hours) + ':' +
        ((minutes < 10) ? '0' + minutes : minutes) + ':' +
        ((seconds < 10) ? '0' + seconds : seconds);
}

function changeButtonToLoading(button) {
    button.prop('disabled', true);
    button.find('span').show();

    const temp = button.children();
    button.text(' Loading...').prepend(temp);
}

function changeButtonToReady(button, text, disabled) {
    button.prop('disabled', disabled);
    button.find('span').hide();

    const temp = button.children();
    button.text(text).prepend(temp);
}