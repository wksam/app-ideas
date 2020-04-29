document.querySelector('.start').addEventListener('click', startClock);
document.querySelector('.stop').addEventListener('click', stopClock);
document.querySelector('.reset').addEventListener('click', resetClock);
document.querySelector('form').addEventListener('submit', applyConfig);
document.querySelector('form').addEventListener('reset', cancelConfig);

const config = { work: 25, break: 5, long: 10, delay: 2000 };
const textHeader = Object.freeze({ work: 'Working Session', break: 'Break Session', long: 'Long Break Session'});
const state = Object.freeze({ WORK: 'work', BREAK: 'break', LONG: 'long' });
let intervalId = -1;
let timeoutId = -1;
let isPaused = true;
let currentState = state.WORK;
let workCount = 0;

initClock();

function startClock() {
    if(intervalId < 0) {
        stopAudio();
        isPaused = false;
        if(currentState == state.WORK) workCount++;
        if(timeoutId != -1) { clearTimeout(timeoutId); timeoutId = -1; }
        document.querySelector('.config').disabled = true;
        initClock();
        
        intervalId = setInterval(updateClock, 1000);
    }
    else 
        isPaused = !isPaused;

    changeStartButtonState();
}

function stopClock() {
    softReset();
    initClock();
}

function resetClock() {
    document.querySelector('.config').disabled = false;
    hardReset();
    initClock();
}

function softReset() {
    document.title = 'Pomodoro Clock'
    if(intervalId != -1) { clearInterval(intervalId); intervalId = -1; }
    if(timeoutId != -1) { clearTimeout(timeoutId); timeoutId = -1; }
    stopAudio();

    isPaused = true;
    changeStartButtonState();
}

function hardReset() {
    softReset();
    currentState = state.WORK;
    workCount = 0;

    initClock();
}

function initClock() {
    const header = document.querySelector('.session');
    header.textContent = textHeader[currentState];
    
    const clock = document.querySelector('.clock');
    clock.textContent = config[currentState] + ':00';
}

function updateClock() {
    if(isPaused) return;

    const clock = document.querySelector('.clock');
    const timer = clock.textContent.split(':').map(v => parseInt(v));

    if(timer[1] != 0) {
        timer[1]--;
    } else {
        if(timer[0] != 0) {
            timer[0]--;
            timer[1] = 59;
        } else {
            clearInterval(intervalId);
            intervalId = -1;

            isPaused = true;
            changeStartButtonState();

            playAudio();
            nextState();
            timeoutId = setTimeout(startClock, config.delay);
        }
    }

    updateClockUI(timer);
}

function updateClockUI(timer) {
    const textTime = (timer[0] > 9 ? timer[0] : '0' + timer[0]) + ':' + (timer[1] > 9 ? timer[1] : '0' + timer[1]);
    document.querySelector('.clock').textContent = textTime;
    document.title = textTime + ' - ' + textHeader[currentState];
}

function nextState() {
    if(workCount > 3) {
        currentState = state.LONG;
        workCount = 0;
    } else {
        if(currentState == state.BREAK) {
            currentState = state.WORK;
        } else {
            currentState = state.BREAK;
        }
    }
}

function applyConfig(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    config.work = formData.get('work');
    config.break = formData.get('break');
    config.long = formData.get('long');
    config.delay = formData.get('delay') * 1000;

    initClock();
    $('.collapse').collapse('toggle');
}

function cancelConfig(e) {
    e.preventDefault();

    document.querySelector('#work').value = config.work;
    document.querySelector('#break').value = config.break;
    document.querySelector('#long').value = config.long;
    document.querySelector('#delay').value = config.delay / 1000;

    $('.collapse').collapse('toggle');
}

function changeStartButtonState() {
    if(isPaused) {
        const startIcon = 
            '<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>' +
            '</svg>';
        $('.start svg').remove();
        $('.start').append(startIcon);
    } else {
        const pauseIcon = 
            '<svg class="bi bi-pause-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5zm5 0A1.5 1.5 0 0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5z"/>' +
            '</svg>';
        $('.start svg').remove();
        $('.start').append(pauseIcon);
    }
}

function playAudio() {
    document.querySelector('audio').play();
}

function stopAudio() {
    const audio = document.querySelector('audio');
    audio.pause();
    audio.currentTime = 0;
}