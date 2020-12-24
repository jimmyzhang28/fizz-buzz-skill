const Alexa = require('ask-sdk-core');

// Initial launch message upon "Alexa, open fizz buzz game"
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Fizz Buzz. We’ll each take turns counting up from one. ' + 
    'However, you must replace numbers divisible by 3 with the word “fizz” and you must replace numbers divisible by 5 with the word “buzz”. ' +
    'If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. If you get one wrong, you lose. I\'ll start! One.';

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
    sessionAttributes.counter = 2;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

// Returns the correct answer to fizz buzz given any positive number n
function correctAnswer(n) {
  if(n % 15 === 0) return 'fizz buzz';
  else if(n % 3 === 0) return 'fizz';
  else if(n % 5 === 0) return 'buzz';
  else return n.toString();
}

// Alexa plays Fizz Buzz with normal input
const FizzBuzzIntentHandler = {
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
    
    let speakOutput = 'I\'m sorry, the correct response was ' + correctResponse + 
                      '. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!';
    
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

// Repeats Alexa's current number/response
const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const speakOutput = correctAnswer(sessionAttributes.counter - 1);
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
  }
};

// Help intent reiterates instructions and reminds user where they are in the game
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'In Fizz Buzz, we’ll each take turns counting up from one, replacing numbers divisible by 3 with the word “fizz”, ' + 
    ' numbers divisible by 5 with the word “buzz”, and numbers divisible by both 3 and 5 with “fizz buzz”. If you get one wrong, you lose.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

// Stops the game
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Okay, thanks for playing Fizz Buzz!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

// 'Quit' or 'exit'
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    const speechText = 'Okay, thanks for playing Fizz Buzz!';
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

// Error handling - guaranteed wrong answer
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let correctResponse = correctAnswer(sessionAttributes.counter);

    const speakOutput = 'I\'m sorry, the correct response was ' + correctResponse + 
                      '. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!';
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

// Exporting to AWS lambda function
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    FizzBuzzIntentHandler,
    RepeatIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();