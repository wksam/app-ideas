document.querySelectorAll('input[type=radio]').forEach(function(elem) {
    elem.addEventListener('click', onChangeTypeSystem);
});

function onChangeTypeSystem() {
    const temperatureAddon = document.querySelector('#temperature-addon');
    const windSpeedAddon = document.querySelector('#speed-addon');

    const temperatureInput = document.querySelector('#temperature');
    const windSpeedInput = document.querySelector('#speed');

    if(this.value != 'imperial') {
        temperatureAddon.textContent = '°C';
        windSpeedAddon.textContent = 'km/h';

        temperatureInput.max = 10;
        windSpeedInput.min = 4.8;
    } else {
        temperatureAddon.textContent = '°F';
        windSpeedAddon.textContent = 'mph';

        temperatureInput.max = 50;
        windSpeedInput.min = 3;
    }

    temperatureInput.value = '';
    windSpeedInput.value = '';
}

document.querySelector('form').addEventListener('submit', startCalculation);

function startCalculation(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const system = formData.get('system');
    const temperature = formData.get('temperature');
    const windSpeed = formData.get('speed');
    const result = system == 'metric' ? Math.round(metricCalculation(temperature, windSpeed)) : Math.round(imperialCalculation(temperature, windSpeed));
    
    let resultText = 'The wind chill index is ' + result + ', based on the TS scale.';
    resultText = system == 'metric' ? resultText.replace('TS', 'Celsius') : resultText.replace('TS', 'Fahrenheit')

    const alert = document.querySelector('.alert');
    alert.textContent = resultText;
    alert.hidden = false;
}

function metricCalculation(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

function imperialCalculation(temperature, windSpeed) {
    return 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
}