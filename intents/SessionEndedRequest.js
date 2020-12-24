const { EXIT_STRING } = require('../utils/FunctionsAndStrings');

// 'Quit' or 'exit'
exports.SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak(EXIT_STRING).getResponse();
  }
};
