const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR   = MINUTE * 60;
const DAY    = HOUR * 24;

function createCountdown(name) {
    const html = 
        '<div class="countdown d-flex flex-row">' +
            '<div class="d-flex flex-column p-2">' +
                '<div class="text-center">' + name + '</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' +
                '<div class="text-center days">0</div>' +
                '<div class="text-center">days</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' +
                '<div class="text-center hours">00</div>' +
                '<div class="text-center">hours</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' +
                '<div class="text-center">:</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' +
                '<div class="text-center minutes">00</div>' +
                '<div class="text-center">minutes</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' +
                '<div class="text-center">:</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' + 
                '<div class="text-center seconds">00</div>' +
                '<div class="text-center">seconds</div>' +
            '</div>' +
            '<div class="d-flex flex-column p-2">' +
                '<button class="btn btn-primary">' +
                    '<svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                        '<path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>' +
                    '</svg>' +
                '</button>' +
            '</div>' +
        '</div>';
    $(".container").append(html);
    const lastElement = $(".countdown").last();
    lastElement.find("button").on("click", remove);
    return lastElement.uniqueId().attr("id");
}

$("form").submit(function(e) {
    const submit = $(this).serializeArray();
    const eventName = getData(submit, "event");

    let inputDate = getData(submit, "date");
    let inputTime = getData(submit, "time");
    inputTime = inputTime != "" ? inputTime : "00:00";
    const date = new Date(formatDate(inputDate, inputTime)).getTime();
    const id = createCountdown(eventName);

    function updateCountdown() {
        const now = Date.now();

        const remaining = date - now;
        let days = parseInt(remaining / DAY);
        let hours = parseInt(remaining % DAY / HOUR);
        let minutes = parseInt(remaining % HOUR / MINUTE);
        let seconds = parseInt(remaining % MINUTE / SECOND);
        days = days < 0 ? 0 : days;
        hours = hours < 0 ? "00" : addZero(hours);
        minutes = minutes < 0 ? "00" : addZero(minutes);
        seconds = seconds < 0 ? "00" : addZero(seconds);
    
        $("#" + id).find(".days").html(days);
        $("#" + id).find(".hours").html(hours);
        $("#" + id).find(".minutes").html(minutes);
        $("#" + id).find(".seconds").html(seconds);
        
        if(isFinished(days, hours, minutes, seconds)) stopCountdown(id);
    }

    function startCountdown() {
        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
        $("#" + id).data("intervalId", intervalId);
    }
    setTimeout(startCountdown, 1000 - (Date.now() % 1000));
    
    e.preventDefault();
});

function remove() {
    const id = getCountdownId($(this));
    const intervalId = getCountdownIntervalId($(this));
    const countdown = $("#" + id);
    
    clearInterval(intervalId);
    countdown.removeUniqueId();
    countdown.remove();
}

function getCountdownId(e) {
    return e.closest(".countdown").attr("id");
}

function getCountdownIntervalId(e) {
    return e.closest(".countdown").data("intervalId");
}

function getData(array, name) {
    for(let i = 0; i < array.length; i++) {
        if(array[i].name == name) return array[i].value;
    }
}

// format ECMAScript 5 ISO-8601
function formatDate(date, time) {
    return date + "T" + time;
}

function isFinished(days, hours, minutes, seconds) {
    return days == 0 && hours == 0 && minutes == 0 && seconds == 0;
}

function stopCountdown(id) {
    const intervalId = $("#" + id).data("intervalId");
    clearInterval(intervalId);
}

function addZero(number) {
    if(number < 10) {
        return "0" + number;
    }
    return number;
}