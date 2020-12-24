// Returns the correct answer to fizz buzz given any positive number n
exports.correctAnswer = function (n) {
  if (n % 15 === 0)
    return 'fizz buzz';
  else if (n % 3 === 0)
    return 'fizz';
  else if (n % 5 === 0)
    return 'buzz';
  else
    return n.toString();
}

exports.LAUNCH_STRING = 'Welcome to Fizz Buzz. We’ll each take turns counting up from one. ' + 
'However, you must replace numbers divisible by 3 with the word “fizz” and you must replace numbers divisible by 5 with the word “buzz”. ' +
'If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. If you get one wrong, you lose. I\'ll start! One.';

exports.HELP_STRING = 'In Fizz Buzz, we’ll each take turns counting up from one, replacing numbers divisible by 3 with the word “fizz”, ' + 
'numbers divisible by 5 with the word “buzz”, and numbers divisible by both 3 and 5 with “fizz buzz”. If you get one wrong, you lose.';

exports.EXIT_STRING = 'Okay, thanks for playing Fizz Buzz!';

exports.LOSS_STRINGS = [
  'Now go, your 3rd grade math class needs your help!',
  'Alexa. One. Human. Zero.',
  'Natural selection at its finest!',
  'Better luck next time!',
  'Hopefully you counted to your IQ.',
  'Next time, I\'ll write the number line out to make it easier for you.',
  'For another great game, try counting your fingers and toes and see where you get!',
  'I\'ll consider dialing it down a bit next time. Not!'
]