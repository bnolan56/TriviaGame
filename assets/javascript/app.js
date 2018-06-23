var correctNum = 0;
var incorrectNum = 0;
var notAnswered = 0;
var currentQuestion = 0;
var timerCount = 30;
var timerOn = false;
var timerId = '';

// question object
var charDee = {

  questions: {
    q1: "What is Rickety Cricket's real name?",
    q2: 'What is the best food to make you go to sleep?',
    q3: 'Who has Charlie and Frank been hanging with, under a bridge?',
    q4: "How famous is Mac's famous Mac & Cheese?",
    q5: "Who is the Nightman's archenemy?",
    q6: 'What is the D.E.N.N.I.S System?',
    q7: "What is Nightcrawlers?",
    q8: "What level did Duncan get to in his game?",
    q9: "Dennis is Asshole, Why Charlie Hate?",
  },

  answers: {
    q1: ["Former Father Matthew Mara", "Psycho Pete", "Lion McPoyle", "Reggie"],
    q2: ["Beer", "Coon Meat", "Cat Food", "Wine in a Can"],
    q3: ["Z", "Bruce Mathis", "Old Black Man", "Duncan"],
    q4: ["If it's so famous, why haven't I heard of it?", "Mildly Famous", "Gross, it's made with dog meat", "It's just Kraft Mac & Cheese"],
    q5: ['The Lawyer', 'Uncle Jack', 'Dayman: Champion of the Sun', 'Carol'],
    q6: ['Demonstrate value, Engage physically, Nurture dependence, Neglect emotionally, Inspire hope, Separate entirely',
    'Demonstrate looks, Encompass sexually, Neglect physically , Nuture hope, Inspire dependence, Smoothly exit','Dennis is a Name',
    'Degrade looks, Engage emotionally, Nurture dependence, Nevermind opinions, Intimidate personally, Show worth'],
    q7: ['A worm for fishing', 'A game where the lights are turned off and you wiggle on the floor like a worm', 'You link arms and pretend to be a worm on a hook', 'A stupid catch phrase'],
    q8: ['LEVEL TWOO', 'Z and Duncan were DJing', 'LEVEL 3 SON! LEVEL 3!', 'SHABOOYA!'],
    q9: ['DENNIS IS ASSHOLE', 'The Nightman Cometh', "Dennis doesn't know shit about girls", 'DENNIS IS A BASTARD MAN']
  },

  correctAnswers: {
    q1: 'Former Father Matthew Mara',
    q2: 'Cat Food',
    q3: "Duncan",
    q4: "If it's so famous, why haven't I heard of it?",
    q5: 'Dayman: Champion of the Sun',
    q6: 'Demonstrate value, Engage physically, Nurture dependence, Neglect emotionally, Inspire hope, Separate entirely',
    q7: 'A game where the lights are turned off and you wiggle on the floor like a worm',
    q8: 'LEVEL 3 SON! LEVEL 3!',
    q9: 'DENNIS IS A BASTARD MAN',
  }
};

// game function on document ready
$(document).ready(function() {
  $("#remaining-time").hide();
})

$("#start").on('click', function() {
  startGame();
});

$(document).on('click' , '.options', function() {
    guessChecker();
});

// FUNCTIONS
function startGame() {

  // restarts game tallies
  currentQuestion = 0;
  correctNum = 0;
  incorrectNum = 0;
  notAnswered = 0;

  clearInterval(timerId);

  // show game section
  $('#game').show();

  //  empty last results
  $('#results').html('');

  // show timer
  $('#timerCount').html(timerCount);

  // remove start button
  $('#start').hide();

  $('#remaining-time').show();

  // ask first question
  nextQuestion();
}

function nextQuestion() {

  // set timer to 30 seconds each question
  timerCount = 30;
  $('#timerCount').removeClass('last-seconds');
  $('#timerCount').text(timerCount);

  // to prevent timer speed up
  if(!timerOn) {
    timerId = setInterval(timerRunning, 1000);
  }

  // gets all the questions then indexes the current questions
  var questionContent = Object.values(charDee.questions)[currentQuestion];
  $('#question').text(questionContent);

  // an array of all the user options for the current question
  var questionOptions = Object.values(charDee.answers)[currentQuestion];

  // creates all the trivia guess options in the html
  $.each(questionOptions, function(index, key) {
    $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
  })
}

// function that decrements counter and count unanswered if timer runs out
function timerRunning() {

  // if timer still has time left and there are still questions left to ask
  if(timerCount > -1 && currentQuestion < Object.keys(charDee.questions).length){

    $('#timer').text(timerCount);
    timerCount--;

    if(timerCount === 4) {
      $('#timer').addClass('last-seconds');
    }
  } else if(timerCount === -1) {

    notAnswered++;
    charDee.result = false;

    clearInterval(timerId);
    resultId = setTimeout(guessResult, 1000);

    $('#results').html('<h3>SHABOOYA! The answer was '+ Object.values(charDee.answers)[charDee.currentQuestion] +'</h3>');

  } else if(currentQuestion === Object.keys(charDee.questions).length) {

    // adds results of game (correct, incorrect, unanswered) to the page
    $('#results')
      .html('<h3>Thank you for playing!</h3>'+
      '<p>Correct: '+ correctNum +'</p>'+
      '<p>Incorrect: '+ incorrectNum +'</p>'+
      '<p>Unaswered: '+ notAnswered +'</p>'+
      '<p>Please play again!</p>');

    // hide game sction
    $('#game').hide();

    // show start button to begin a new game
    $('#start').show();
  }
}

function guessChecker() {
  // timer ID for gameResult setTimeout
  var resultId;

  // the answer to the current question being asked
  var currentAnswer = Object.values(charDee.answers)[currentQuestion];

  // if the text of the option picked matches the answer of the current question, increment correct
  if($(this).text() === currentAnswer) {
    // turn button green for correct
    $(this).addClass('btn-success').removeClass('btn-info');

    correctNum++;

    clearInterval(timerId);
    resultId = setTimeout(guessResult, 1000);
    $('#results').html('<h3>Correct Answer!</h3>');

  } else {
    // turn button clicked red for incorrect
    $(this).addClass('btn-danger').removeClass('btn-info');

    incorrectNum++;
    clearInterval(timerId);
    resultId = setTimeout(guessResult, 1000);
    $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
  }
}

function guessResult() {

  // increment to next question set
  currentQuestion++;

  // remove the options and results
  $('.options').remove();
  $('#results h3').remove();

  // begin next question
  nextQuestion();
}
