/*Handles intent calls. See string_constants file to change messages.*/

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.c9b5b951-64c3-4ce8-8662-05b613077860'; //"Weather Radar" ASK APP ID
const weather_intent = require('./intents/weather_intent');
const SC = require('./string_constants');

const handlers = {
    'LaunchRequest': function() {
      this.emit(':tell', SC.WELCOME_MESSAGE);
    },

    //Custom intent to handel API call and response
    'WeatherServiceIntent': weather_intent,

    //Built-in intents below this
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', SC.HELP_MESSAGE, '');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', SC.STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', SC.STOP_MESSAGE);
    },
    'Unhandled': function() {
        this.emit(':tell', SC.UNHANDLED_MESSAGE);
    }
}

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
