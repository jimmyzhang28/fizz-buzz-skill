const Alexa = require('ask-sdk-core');

// "Alexa, open fizz buzz"
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

function correctAnswer(n) {
  if(n % 15 === 0) return 'fizz buzz';
  else if(n % 3 === 0) return 'fizz';
  else if(n % 5 === 0) return 'buzz';
  else return n.toString();
}

const FizzBuzzIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FizzBuzzIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
    let correctResponse = correctAnswer(sessionAttributes.counter);
    
    
    let userValue = null;
    if(handlerInput.requestEnvelope.request.intent.slots.fizzOrBuzz.value) 
      userValue = handlerInput.requestEnvelope.request.intent.slots.fizzOrBuzz.value;
    else if(handlerInput.requestEnvelope.request.intent.slots.number.value !== '?') 
      userValue = handlerInput.requestEnvelope.request.intent.slots.number.value;
    
    let speakOutput = 'I\'m sorry, the correct response was ' + correctResponse+ '. You put ' + userValue + '.';
    
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


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    FizzBuzzIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();