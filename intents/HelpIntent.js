const { HELP_STRING } = require('../utils/FunctionsAndStrings');

// Help reiterates instructions
exports.HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_STRING)
      .reprompt(HELP_STRING)
      .getResponse();
  }
};