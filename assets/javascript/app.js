// game function on document ready
$(document).ready(function() {
  console.log("this is a console log");

  $("#time-remaining").hide();

//// VARAIBLES & OBJECTS ////

  // global variables
  var questionIndex = 0;
  var incorrectAns = 0;
  var notAnswered = 0;
  var currentQuestion = 0;

  // question array
  var charDee = [{
    question: "What is Rickety Cricket's real name?",
    possibleAnswers: ["Former Father Matthew Mara", "Psycho Pete", "Lion McPoyle", "Reggie"],
    correct: 0,
    correctScreen: "Rickety Rick rick Crickettt. Matty Mara was his name",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was Former Father Matthew Mara",
  },
  {
    question: 'What is the best food to make you go to sleep?',
    possibleAnswers: ["Beer", "Coon Meat", "Cat Food", "Wine in a Can"],
    correct: 2,
    correctScreen: "Yup you eat cat food and huff some glue, your stomach gurgles and it drowns the cat cries at night out.",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was Cat Food",
  },
  {
    question: 'Who has Charlie and Frank been hanging with, under a bridge?',
    possibleAnswers: ["Z", "Bruce Mathis", "Old Black Man", "Duncan"],
    correct: 3,
    correctScreen: "Yeah Frank? I know that bitch.",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was Duncan, Frank's bridge friend",
  },
  {
    question: "How famous is Mac's famous Mac & Cheese?",
    possibleAnswers: ["If it's so famous, why haven't I heard of it?", "Mildly Famous", "Gross, it's made with dog meat", "It's just Kraft Mac & Cheese"],
    correct: 0,
    correctScreen: "Mac's famous mac and cheese? I'm your best friend, and, I've never heard of it",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was if it's so famous, why haven't I heard of it",
  },
  {
    question: "Who is the Nightman's archenemy?",
    possibleAnswers: ['The Lawyer', 'Uncle Jack', 'Dayman: Champion of the Sun', 'Carol'],
    correct: 2,
    correctScreen: "Dayman! AHHH AHHHHHH Champion of the Sun",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was Dayman Champion of the Sun",
  },
  {
    question: 'What is the D.E.N.N.I.S System?',
    possibleAnswers: ['Demonstrate value, Engage physically, Nurture dependence, Neglect emotionally, Inspire hope, Separate entirely',
    'Demonstrate looks, Encompass sexually, Neglect physically , Nuture hope, Inspire dependence, Smoothly exit','Dennis is a Name',
    'Degrade looks, Engage emotionally, Nurture dependence, Nevermind opinions, Intimidate personally, Show worth'],
    correct: 0,
    correctScreen: "DENNIS SYSTEM, the true method to winning a girl's heart",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! Demonstrate value, Engage physically, Nurture dependence, Neglect emotionally, Inspire hope, Separate entirely",
  },
  {
    question: "What is Nightcrawlers?",
    possibleAnswers: ['A worm for fishing', 'A game where the lights are turned off and you wiggle on the floor like a worm', 'You link arms and pretend to be a worm on a hook', 'A stupid catch phrase'],
    correct: 1,
    correctScreen: "Nightcrawlers! I love that game, we can play if you want",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was a game where you turn the lights off and wiggle on the floor like a worm",
  },
  {
    question: "What level did Duncan get to in his game?",
    possibleAnswers: ['LEVEL TWOO', 'Z and Duncan were DJing', 'LEVEL 3 SON! LEVEL 3!', 'SHABOOYA!'],
    correct: 2,
    correctScreen: "Oh shit son! Level 3!",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was LEVEL 3 SON! LEVEL 3!",
  },
  {
    question: "Dennis is Asshole, Why Charlie Hate?",
    possibleAnswers: ['DENNIS IS ASSHOLE', 'The Nightman Cometh', "Dennis doesn't know shit about girls", 'BECAUSE DENNIS IS A BASTARD MAN'],
    correct: 3,
    correctScreen: "Yeah Frank? I know that bitch.",
    incorrectScreen: "SHABOOYA! YOU'RE WRONG! The answer was BECAUSE DENNIS IS A BASTARD MAN",
  },
];

//// FUNCTIONS ////

  //function that displays current question to be answered
  function showQuestion(questionIndex) {
    $("#question").removeClass("hidden");
    $("#question").text(charDee[questionIndex].question);
    callTimer();
  }

  function showPossibleAnswers(questionIndex) {
    for (var i = 0; i < charDee[questionIndex].length; i++) {
      var button = $("<button>");
      button.addClass("btn");
      button.addClass("btn-default");
      button.attr("data-index", i);
      button.text(charDee[questionIndex].possibleAnswers);
      $("#options").append(button);
    }
  }

  // function that shows my timer
  function showTimerDiv() {
    $('#time-remaining').show();
  }

  // my controller function that runs timers and compares to array of questions
  function callTimer() {
    if (questionIndex <= charDee.length) {
      runTimer();
    }

    if (questionIndex === charDee.length){
      console.log("end of questions");
    }
  }

  // function that runs my timer, interval delay of 1 second
  function runTimer() {
    var timerCount = 21;
    var timerInterval = setInterval( function() {
      timerCount--;
      $("#timeCounter").text(timerCount);

      if(timerCount === 0) {
        incorrectAns++;

        clearInterval(timerInterval);
        timerCount = 21;

        $("#timeCounter").text(timerCount);

        setTimeout( function() {
          console.log(questionIndex, charDee.length);

          if(questionIndex + 1 < charDee.length) {
            questionIndex++;

          }

          if (questionIndex + 1 === charDee.length) {
            winCheck();
          }
        }, 5000);
      }
    }, 1000)
  }

//// EVENT LISTENERS ////

  $("#start").on('click', function() {
    showTimerDiv();
    showQuestion(questionIndex);
    showPossibleAnswers();
  });

//     // FUNCTIONS
//     function startGame() {
//
//       console.log("game has started");
//       // restarts game tallies
//       currentQuestion = 0;
//       correctNum = 0;
//       incorrectNum = 0;
//       notAnswered = 0;
//
//       clearInterval(timerId);
//
//       // show game section
//       $('#game').show();
//
//       //  empty last results
//       $('#results').html('');
//
//       // show timer
//       $('#timerCount').html(timerCount);
//
//       // remove start button
//       $('#start').hide();
//
//
//       // ask first question
//       nextQuestion();
//     }
//
//     // function that decrements counter and count unanswered if timer runs out
//     function timerRunning() {
//
//       // if timer still has time left and there are still questions left to ask
//       if(timerCount > -1 && currentQuestion < Object.keys(charDee.questions).length){
//
//         $('#timer').text(timerCount);
//         timerCount--;
//
//         if(timerCount === 4) {
//           $('#timer').addClass('last-seconds');
//         }
//       } else if(timerCount === -1) {
//
//         notAnswered++;
//         charDee.result = false;
//
//         clearInterval(timerId);
//         resultId = setTimeout(guessResult, 1000);
//
//         $('#results').html('<h3>SHABOOYA! The answer was '+ Object.values(charDee.answers)[charDee.currentQuestion] +'</h3>');
//
//       } else if(currentQuestion === Object.keys(charDee.questions).length) {
//
//         // adds results of game (correct, incorrect, unanswered) to the page
//         $('#results')
//           .html('<h3>Thank you for playing!</h3>'+
//           '<p>Correct: '+ correctNum +'</p>'+
//           '<p>Incorrect: '+ incorrectNum +'</p>'+
//           '<p>Unaswered: '+ notAnswered +'</p>'+
//           '<p>Please play again!</p>');
//
//         // hide game sction
//         $('#game').hide();
//
//         // show start button to begin a new game
//         $('#start').show();
//       }
//     }
//
//     startGame();
//     timerRunning();
//   });
//
//   $(".options").on('click', function() {
//       guessChecker();
//   });
//
//   // FUNCTIONS
//   function startGame() {
//
//     // restarts game tallies
//     currentQuestion = 0;
//     correctNum = 0;
//     incorrectNum = 0;
//     notAnswered = 0;
//
//     clearInterval(timerId);
//
//     // show game section
//     $('#game').show();
//
//     //  empty last results
//     $('#results').html('');
//
//     // show timer
//     $('#timerCount').html(timerCount);
//
//     // remove start button
//     $('#start').hide();
//
//     $('#remaining-time').show();
//
//     // ask first question
//     nextQuestion();
//   }
//
//   function guessChecker() {
//     // timer ID for gameResult setTimeout
//     var resultId;
//
//     // the answer to the current question being asked
//     var currentAnswer = Object.values(charDee.answers)[currentQuestion];
//
//     // if the text of the option picked matches the answer of the current question, increment correct
//     if($(this).text() === currentAnswer) {
//       // turn button green for correct
//       $(this).addClass('btn-success').removeClass('btn-info');
//
//       correctNum++;
//
//       clearInterval(timerId);
//       resultId = setTimeout(guessResult, 1000);
//       $('#results').html('<h3>Correct Answer!</h3>');
//
//     } else {
//       // turn button clicked red for incorrect
//       $(this).addClass('btn-danger').removeClass('btn-info');
//
//       incorrectNum++;
//       clearInterval(timerId);
//       resultId = setTimeout(guessResult, 1000);
//       $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
//     }
//   }
//
//   function guessResult() {
//
//     // increment to next question set
//     currentQuestion++;
//
//     // remove the options and results
//     $('.options').remove();
//     $('#results h3').remove();
//
//     // begin next question
//     nextQuestion();
//   }
//
//   function nextQuestion() {
//
//     // set timer to 30 seconds each question
//     timerCount = 30;
//     $('#timerCount').removeClass('last-seconds');
//     $('#timerCount').text(timerCount);
//
//     // to prevent timer speed up
//     if(!timerOn) {
//       timerId = setInterval(timerRunning, 1000);
//     }
//
//     // gets all the questions then indexes the current questions
//     var questionContent = Object.values(charDee.questions)[currentQuestion];
//     $('#question').text(questionContent);
//
//     // an array of all the user options for the current question
//     var questionOptions = Object.values(charDee.answers)[currentQuestion];
//
//     // creates all the trivia guess options in the html
//     $.each(questionOptions, function(index, key) {
//       $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
//     })
//   }
//
//   // function that decrements counter and count unanswered if timer runs out
//   function timerRunning() {
//
//     // if timer still has time left and there are still questions left to ask
//     if(timerCount > -1 && currentQuestion < Object.keys(charDee.questions).length){
//
//       $('#timer').text(timerCount);
//       timerCount--;
//
//       if(timerCount === 4) {
//         $('#timer').addClass('last-seconds');
//       }
//     } else if(timerCount === -1) {
//
//       notAnswered++;
//       charDee.result = false;
//
//       clearInterval(timerId);
//       resultId = setTimeout(guessResult, 1000);
//
//       $('#results').html('<h3>SHABOOYA! The answer was '+ Object.values(charDee.answers)[charDee.currentQuestion] +'</h3>');
//
//     } else if(currentQuestion === Object.keys(charDee.questions).length) {
//
//       // adds results of game (correct, incorrect, unanswered) to the page
//       $('#results')
//         .html('<h3>Thank you for playing!</h3>'+
//         '<p>Correct: '+ correctNum +'</p>'+
//         '<p>Incorrect: '+ incorrectNum +'</p>'+
//         '<p>Unaswered: '+ notAnswered +'</p>'+
//         '<p>Please play again!</p>');
//
//       // hide game sction
//       $('#game').hide();
//
//       // show start button to begin a new game
//       $('#start').show();
//     }
//   }
//
})
