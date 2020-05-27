function showRestartMenu() {
    document.querySelector('.cards').textContent = '';
    document.querySelector('.menu-restart').hidden = false;
    document.querySelector('.title').hidden = false;
    document.querySelector('.progress').hidden = true;

    const currentTime = game.endTime - game.startTime;
    const recordedTime = game.getTimer()[game.difficult.name];
    game.setTimer(currentTime);
    const best = recordedTime != null && currentTime < recordedTime ? '(Best) ' : '';
    document.querySelector('.timer').textContent = best + 'Your time: ' + formatTime(currentTime);
}

function formatTime(time) {
    
    const milliseconds = formatMillisecond(time % SECOND);
    const seconds = format(Math.floor(time / SECOND));
    const minutes = format(Math.floor(time / MINUTE));

    return minutes + ':' + seconds + ':' + milliseconds;
}

function formatMillisecond(milliseconds) {
    if(milliseconds < 10)
        return '00' + milliseconds;
    else if(milliseconds < 100)
        return '0' + milliseconds;
    else
        return milliseconds;
}

function format(time) {
    return time < 10 ? '0' + time : time;
}