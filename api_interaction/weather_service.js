/*Sends a GET request to the API and sends back the JSON response to weather_intent*/

const rp = require('request-promise');

const options = {
  uri: 'http://api.openweathermap.org/data/2.5/weather',
  qs: {
    q: null,
    units: 'imperial', //API alows unit to be standard (Kelvin), imperial (Fahrenheit) or metric (Celsius)
    APPID: 'b4a7ea98af44fbbb8a44438b52015bac', //Used "Weather Radar" APPID
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

//Fills in the city name provided by the user in the form
function weather(city_name) {
  options.qs.q = city_name;
  return rp(options);
}

//Handles callback
function getWeatherData(city_name, callback) {
    weather(city_name).then(res => {
        callback(null, res)
    });
}

module.exports = getWeatherData;
