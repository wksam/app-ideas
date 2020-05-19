const city = [ { "Version": 1, "Key": "41645", "Type": "City", "Rank": 45, "LocalizedName": "Ubatuba", "EnglishName": "Ubatuba", "PrimaryPostalCode": "", "Region": { "ID": "SAM", "LocalizedName": "South America", "EnglishName": "South America" }, "Country": { "ID": "BR", "LocalizedName": "Brazil", "EnglishName": "Brazil" }, "AdministrativeArea": { "ID": "SP", "LocalizedName": "São Paulo", "EnglishName": "São Paulo", "Level": 1, "LocalizedType": "State", "EnglishType": "State", "CountryID": "BR" }, "TimeZone": { "Code": "BRT", "Name": "America/Sao_Paulo", "GmtOffset": -3, "IsDaylightSaving": false, "NextOffsetChange": null }, "GeoPosition": { "Latitude": -23.436, "Longitude": -45.072, "Elevation": { "Metric": { "Value": 2, "Unit": "m", "UnitType": 5 }, "Imperial": { "Value": 6, "Unit": "ft", "UnitType": 0 } } }, "IsAlias": false, "SupplementalAdminAreas": [ { "Level": 2, "LocalizedName": "Ubatuba", "EnglishName": "Ubatuba" }, { "Level": 3, "LocalizedName": "Ubatuba", "EnglishName": "Ubatuba" } ], "DataSets": [ "AirQualityCurrentConditions", "AirQualityForecasts", "Alerts" ] } ];
const cities = [ { "Version":1, "Key":"53286", "Type":"City", "Rank":35, "LocalizedName":"Vancouver", "EnglishName":"Vancouver", "PrimaryPostalCode":"V6C", "Region":{ "ID":"NAM", "LocalizedName":"North America", "EnglishName":"North America" }, "Country":{ "ID":"CA", "LocalizedName":"Canada", "EnglishName":"Canada" }, "AdministrativeArea":{ "ID":"BC", "LocalizedName":"British Columbia", "EnglishName":"British Columbia", "Level":1, "LocalizedType":"Province", "EnglishType":"Province", "CountryID":"CA" }, "TimeZone":{ "Code":"PDT", "Name":"America/Vancouver", "GmtOffset":-7, "IsDaylightSaving":true, "NextOffsetChange":"2020-11-01T09:00:00Z" }, "GeoPosition":{ "Latitude":49.283, "Longitude":-123.118, "Elevation":{ "Metric":{ "Value":33, "Unit":"m", "UnitType":5 }, "Imperial":{ "Value":108, "Unit":"ft", "UnitType":0 } } }, "IsAlias":false, "SupplementalAdminAreas":[ { "Level":2, "LocalizedName":"Greater Vancouver", "EnglishName":"Greater Vancouver" } ], "DataSets":[ "AirQualityCurrentConditions", "AirQualityForecasts", "Alerts", "ForecastConfidence", "MinuteCast", "Radar" ] }, { "Version":1, "Key":"331419", "Type":"City", "Rank":45, "LocalizedName":"Vancouver", "EnglishName":"Vancouver", "PrimaryPostalCode":"98663", "Region":{ "ID":"NAM", "LocalizedName":"North America", "EnglishName":"North America" }, "Country":{ "ID":"US", "LocalizedName":"United States", "EnglishName":"United States" }, "AdministrativeArea":{ "ID":"WA", "LocalizedName":"Washington", "EnglishName":"Washington", "Level":1, "LocalizedType":"State", "EnglishType":"State", "CountryID":"US" }, "TimeZone":{ "Code":"PDT", "Name":"America/Los_Angeles", "GmtOffset":-7, "IsDaylightSaving":true, "NextOffsetChange":"2020-11-01T09:00:00Z" }, "GeoPosition":{ "Latitude":45.639, "Longitude":-122.661, "Elevation":{ "Metric":{ "Value":62, "Unit":"m", "UnitType":5 }, "Imperial":{ "Value":203, "Unit":"ft", "UnitType":0 } } }, "IsAlias":false, "SupplementalAdminAreas":[ { "Level":2, "LocalizedName":"Clark", "EnglishName":"Clark" } ], "DataSets":[ "AirQualityCurrentConditions", "AirQualityForecasts", "Alerts", "DailyAirQualityForecast", "DailyPollenForecast", "ForecastConfidence", "MinuteCast", "Radar" ] } ];
const forecast = [ { "DateTime": "2020-05-18T16:00:00-07:00", "EpochDateTime": 1589842800, "WeatherIcon": 4, "IconPhrase": "Intermittent clouds", "HasPrecipitation": false, "IsDaylight": true, "Temperature": { "Value": 18.4, "Unit": "C", "UnitType": 17 }, "RealFeelTemperature": { "Value": 21.5, "Unit": "C", "UnitType": 17 }, "WetBulbTemperature": { "Value": 12.2, "Unit": "C", "UnitType": 17 }, "DewPoint": { "Value": 7.3, "Unit": "C", "UnitType": 17 }, "Wind": { "Speed": { "Value": 7.4, "Unit": "km/h", "UnitType": 7 }, "Direction": { "Degrees": 234, "Localized": "SW", "English": "SW" } }, "WindGust": { "Speed": { "Value": 11.1, "Unit": "km/h", "UnitType": 7 } }, "RelativeHumidity": 48, "IndoorRelativeHumidity": 44, "Visibility": { "Value": 16.1, "Unit": "km", "UnitType": 6 }, "Ceiling": { "Value": 9815, "Unit": "m", "UnitType": 5 }, "UVIndex": 4, "UVIndexText": "Moderate", "PrecipitationProbability": 37, "RainProbability": 37, "SnowProbability": 0, "IceProbability": 0, "TotalLiquid": { "Value": 0, "Unit": "mm", "UnitType": 3 }, "Rain": { "Value": 0, "Unit": "mm", "UnitType": 3 }, "Snow": { "Value": 0, "Unit": "cm", "UnitType": 4 }, "Ice": { "Value": 0, "Unit": "mm", "UnitType": 3 }, "CloudCover": 55, "MobileLink": "http://m.accuweather.com/en/ca/vancouver/v6c/hourly-weather-forecast/53286?day=1&hbhhour=16&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/ca/vancouver/v6c/hourly-weather-forecast/53286?day=1&hbhhour=16&unit=c&lang=en-us" } ];

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

    fetchCity(cityName) {
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