class AccuWeatherAPI {
    constructor() {
        if(!AccuWeatherAPI.instance) {
            AccuWeatherAPI.instance = this;
        }
        this.apikey = typeof config !== 'undefined' ? config.API_KEY : '';
        this.urlIcon = 'https://developer.accuweather.com/sites/default/files/ICONNUMBER-s.png';
        this.domain = 'http://dataservice.accuweather.com';
        this.paths = {
            search: '/locations/v1/cities/search',
            forecast: '/forecasts/v1/hourly/1hour/'
        };
        return AccuWeatherAPI.instance;
    }

    set apikey(apikey) { this.apikey = apikey; }

    fetchCity(cityName) {
        if(this.apikey == '') { showAlert(['alert', 'alert-danger'], 'No API Key provided.'); return; }
        const params = '?apikey=' + this.apikey + '&q=' + cityName;
        const url = this.domain + this.paths.search + params;
        fetch(url).then(response => response.json()).then(data => {
            if(data.length == 0) showAlert(['alert', 'alert-info'], 'City not found.');
            else if(data.length == 1) this.fetchForecast(data[0].Key, data[0].LocalizedName + ', ' + data[0].AdministrativeArea.ID + ' - ' + data[0].Country.LocalizedName);
            else fillList(data);
        });
    }

    fetchForecast(cityKey, localized) {
        const params = '?apikey=' + this.apikey + '&metric=true';
        const url = this.domain + this.paths.forecast + cityKey + params;
        fetch(url).then(response => response.json()).then(data => {
            fillCard(data[0], localized);
        });
    }
}

const api = new AccuWeatherAPI();