document.querySelectorAll('input[type=radio]').forEach(function(elem) {
    elem.addEventListener('click', onChangeTypeSystem);
});

function onChangeTypeSystem() {
    const temperatureAddon = document.querySelector('#temperature-addon');
    const windSpeedAddon = document.querySelector('#speed-addon');
    if(this.value != 'imperial') {
        temperatureAddon.textContent = '°C';
        windSpeedAddon.textContent = 'm/s';
    } else {
        temperatureAddon.textContent = '°F';
        windSpeedAddon.textContent = 'mph';
    }
}