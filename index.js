const Alexa = require('ask-sdk-core');
const { LaunchRequestHandler } = require('./intents/LaunchRequest');
const { FizzBuzzIntentHandler } = require('./intents/FizzBuzzIntent');
const { RepeatIntentHandler } = require('./intents/RepeatIntent');
const { HelpIntentHandler } = require('./intents/HelpIntent');
const { CancelAndStopIntentHandler } = require('./intents/CancelAndStopIntent');
const { SessionEndedRequestHandler } = require('./intents/SessionEndedRequest');
const { ErrorHandler } = require('./intents/ErrorHandling');

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