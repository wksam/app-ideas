function showRestartMenu() {
    document.querySelector('.cards').textContent = '';
    document.querySelector('.menu-restart').hidden = false;
    document.querySelector('.title').hidden = false;
    document.querySelector('.progress').hidden = true;

    if(game.endTime < 0) {
        document.querySelector('.timer').textContent = 'You lost';
    } else {
        const currentTime = game.endTime - game.startTime;
        const recordedTime = game.getTimer()[game.difficult.name];
        game.setTimer(currentTime);
        console.log(recordedTime, currentTime < recordedTime);
        const best = recordedTime == -1 || currentTime < recordedTime ? '(Best) ' : '';
        document.querySelector('.timer').textContent = best + 'Your time: ' + formatTime(currentTime);
    }
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

function updateTimer() {
    const progress = document.querySelector('.progress-bar');
    const percent = game.percentGone();
    if(percent < 1) {
        progress.style.width = ((percent + 0.01) * 100) + '%';
        progress.setAttribute('aria-valuenow', percent * 100);
    } else {
        progress.style.width = '0%';
        progress.setAttribute('aria-valuenow', 0);
        game.lost++;
        game.stopTimer();
        showRestartMenu();
    }
}