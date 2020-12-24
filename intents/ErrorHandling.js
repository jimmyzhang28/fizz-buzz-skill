const { correctAnswer, LOSS_STRINGS } = require('../utils/FunctionsAndStrings');

// Error handling (guaranteed wrong answer/gibberish)
exports.ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let correctResponse = correctAnswer(sessionAttributes.counter);

    let index = Math.floor(Math.random() * LOSS_STRINGS.length); 
    const speakOutput = `I\'m sorry, the correct response was ${correctResponse}. You lose! ` + LOSS_STRINGS[index];
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};