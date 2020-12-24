const { correctAnswer, LOSS_STRINGS } = require('../utils/FunctionsAndStrings');

// Alexa plays Fizz Buzz with normal input
exports.FizzBuzzIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FizzBuzzIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const fizzBuzz = handlerInput.requestEnvelope.request.intent.slots.fizzOrBuzz.value;
    const numGuess = handlerInput.requestEnvelope.request.intent.slots.number.value;
    
    let correctResponse = correctAnswer(sessionAttributes.counter);
    
    let userValue = ''; // will be empty if user does not enter game words
    if(fizzBuzz) userValue = fizzBuzz; // if user entered 'fizz', 'buzz', or 'fizz buzz'
    else if(numGuess !== '?') userValue = numGuess; // if user entered number
    
    let index = Math.floor(Math.random() * LOSS_STRINGS.length); 
    let speakOutput = `I\'m sorry, the correct response was ${correctResponse}. You lose! ` + LOSS_STRINGS[index];
    
    if(correctResponse === userValue) {
        sessionAttributes.counter += 2;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        speakOutput = correctAnswer(sessionAttributes.counter - 1);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
  }
};