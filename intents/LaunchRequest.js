const { LAUNCH_STRING } = require('../utils/FunctionsAndStrings');

// Initial launch message upon "Alexa, open fizz buzz game"
exports.LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
    sessionAttributes.counter = 2;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(LAUNCH_STRING)
      .reprompt(LAUNCH_STRING)
      .getResponse();
  }
};