/*Handles the process of getting the city name from the user, sending it for API call and reading the response to the user*/

const getWeatherData = require('../api_interaction/weather_service')

//Reads the weather description to the user
function readWeather(err, res) {
  if (err) throw err;
  this.emit(':tell', res.weather[0].description + 'is expected in' + res.name + 'with a minimum temperature of '
  + ':<say-as interpret-as="cardinal">' + res.main.temp_min + ':</say-as>' + 'degrees Fahrenheit and a maximum temperature of'
  + ':<say-as interpret-as="cardinal">' + res.main.temp_max + ':</say-as>' + 'degrees.')
}

//Gets the name of the city from the user and passes it to weather_service for API call
function getWeather() {
  var intent = this.event.request.intent;
    var city_name = null;

    try {city_name = intent.slots.city_name.value;} catch(err) {}

    //If not city name is provided by the user, emits an error message
    if (!city_name) {
      this.emit(':tell', 'Please provide a valid city name.')
    } else {
      getWeatherData(city_name, readWeather.bind(this));
    }
}

module.exports = getWeather;
