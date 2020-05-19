document.querySelector('form').addEventListener('submit', search)

function search(e) {
    e.preventDefault();
    hideAll();

    const formData = new FormData(e.target);
    if(formData.get('key') != '') api.setApikey = formData.get('key');
    api.fetchCity(formData.get('city'));
}

function showAlert(classList, message) {
    console.log('show alert')
    const alert = document.querySelector('.alert');
    alert.className = '';
    alert.hidden = false;
    alert.classList.add(...classList);
    alert.textContent = message;
}

function hideAlert() {
    document.querySelector('.alert').hidden = true;
}

function hideCard() {
    document.querySelector('.card').hidden = true;
}

function hideCityList() {
    document.querySelector('.city-list').hidden = true;
}

function hideAll() {
    hideAlert();
    hideCard();
    hideCityList();
}

function fillCard(forecastData, localized) {
    document.querySelector('.card').hidden = false;
    document.querySelector('.icon').src = api.urlIcon.replace('ICONNUMBER', forecastData.WeatherIcon < 10 ? '0' + forecastData.WeatherIcon : forecastData.WeatherIcon);
    document.querySelector('.localized').textContent = localized;
    document.querySelector('.phrase').textContent = forecastData.IconPhrase;
    document.querySelector('.temperature').textContent = forecastData.Temperature.Value + '°';
}

function fillList(cities) {
    const cityList = document.querySelector('.city-list');
    cityList.hidden = false;
    cityList.textContent = '';
    for (const city of cities) {
        cityList.appendChild(createButton(city));
    }
}

function createButton(city) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'list-group-item list-group-item-action');
    button.setAttribute('data-key', city.Key)
    button.addEventListener('click', getForecast);
    button.textContent = city.LocalizedName + ', ' + city.AdministrativeArea.ID + ' - ' + city.Country.LocalizedName;
    return button;
}

function getForecast() {
    hideCityList();
    api.fetchForecast(this.dataset.key, this.textContent);
}