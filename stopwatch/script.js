const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

document.querySelector('.start').addEventListener('click', start);
document.querySelector('.laps').addEventListener('click', laps);
document.querySelector('.reset').addEventListener('click', reset);

let startTime;
let isPause = true;
let intervalId;

function start() {
    if(isNaN(startTime)) startTime = Date.now();
    
    if(isPause) {
        intervalId = setInterval(updateStopwatch, 4);
        isPause = false;
    } else {
        clearInterval(intervalId);
        isPause = true;
    }
    changeButton();
}

function laps() {
    console.log('laps');
}

function reset() {
    clearInterval(intervalId);
    startTime = undefined;
    isPause = true;
    updateStopwatch({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    changeButton();
}

function updateStopwatch(time) {
    if(time === undefined) time = getTime();
    document.querySelector('.hours').textContent        = formatNumber(time.hours);
    document.querySelector('.minutes').textContent      = formatNumber(time.minutes);
    document.querySelector('.seconds').textContent      = formatNumber(time.seconds);
    document.querySelector('.milliseconds').textContent = formatMilli(time.milliseconds);
}

function getTime() {
    const time = Date.now() - startTime;
    const milliseconds = time % SECOND;
    const seconds      = Math.floor(time / SECOND);
    const minutes      = Math.floor(time / MINUTE);
    const hours        = Math.floor(time / HOUR);
    return { hours, minutes, seconds, milliseconds }
}

function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

function formatMilli(milli) {
    if(milli < 10) return '00' + milli;
    else if(milli < 100) return '0' + milli;
    else return milli;
}

function changeButton() {
    const startButton = document.querySelector('.start');
    if(isPause)
        startButton.textContent = 'Start';
    else
        startButton.textContent = 'Pause';
}