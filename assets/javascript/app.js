// game function on document ready
$(document).ready(function() {
  console.log("this is a console log");

  $("#time-remaining").hide();

//// VARAIBLES & OBJECTS ////

  // global variables
  var questionIndex = 0;
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var notAnswered = 0;

  // question array
  var charDee = [{
    question: "What is Rickety Cricket's real name?",
    possibleAnswers: ["Former Father Matthew Mara", "Psycho Pete", "Lion McPoyle", "Reggie"],
    correct: 0,
    correctChoice: "Rickety Rick rick Crickettt. Matty Mara was his name",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was Former Father Matthew Mara",
  },
  {
    question: 'What is the best food to make you go to sleep?',
    possibleAnswers: ["Beer", "Coon Meat", "Cat Food", "Wine in a Can"],
    correct: 2,
    correctChoice: "Yup you eat cat food and huff some glue, your stomach gurgles and it drowns the cat cries at night out.",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was Cat Food",
  },
  {
    question: 'Who has Charlie and Frank been hanging with, under a bridge?',
    possibleAnswers: ["Z", "Bruce Mathis", "Old Black Man", "Duncan"],
    correct: 3,
    correctChoice: "Yeah Frank? I know that bitch.",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was Duncan, Frank's bridge friend",
  },
  {
    question: "How famous is Mac's famous Mac & Cheese?",
    possibleAnswers: ["If it's so famous, why haven't I heard of it?", "Mildly Famous", "Gross, it's made with dog meat", "It's just Kraft Mac & Cheese"],
    correct: 0,
    correctChoice: "Mac's famous mac and cheese? I'm your best friend, and, I've never heard of it",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was if it's so famous, why haven't I heard of it",
  },
  {
    question: "Who is the Nightman's archenemy?",
    possibleAnswers: ['The Lawyer', 'Uncle Jack', 'Dayman: Champion of the Sun', 'Carol'],
    correct: 2,
    correctChoice: "Dayman! AHHH AHHHHHH Champion of the Sun",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was Dayman Champion of the Sun",
  },
  {
    question: 'What is the D.E.N.N.I.S System?',
    possibleAnswers: ['Demonstrate value, Engage physically, Nurture dependence, Neglect emotionally, Inspire hope, Separate entirely',
    'Demonstrate looks, Encompass sexually, Neglect physically , Nuture hope, Inspire dependence, Smoothly exit','Dennis is a Name',
    'Degrade looks, Engage emotionally, Nurture dependence, Nevermind opinions, Intimidate personally, Show worth'],
    correct: 0,
    correctChoice: "DENNIS SYSTEM, the true method to winning a girl's heart",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! Demonstrate value, Engage physically, Nurture dependence, Neglect emotionally, Inspire hope, Separate entirely",
  },
  {
    question: "What is Nightcrawlers?",
    possibleAnswers: ['A worm for fishing', 'A game where the lights are turned off and you wiggle on the floor like a worm', 'You link arms and pretend to be a worm on a hook', 'A stupid catch phrase'],
    correct: 1,
    correctChoice: "Nightcrawlers! I love that game, we can play if you want",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was a game where you turn the lights off and wiggle on the floor like a worm",
  },
  {
    question: "What level did Duncan get to in his game?",
    possibleAnswers: ['LEVEL TWOO', 'Z and Duncan were DJing', 'LEVEL 3 SON! LEVEL 3!', 'SHABOOYA!'],
    correct: 2,
    correctChoice: "Oh shit son! Level 3!",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was LEVEL 3 SON! LEVEL 3!",
  },
  {
    question: "Dennis is Asshole, Why Charlie Hate?",
    possibleAnswers: ['DENNIS IS ASSHOLE', 'The Nightman Cometh', "Dennis doesn't know shit about girls", 'BECAUSE DENNIS IS A BASTARD MAN'],
    correct: 3,
    correctChoice: "Yup, that was totally me who wronte that. Dennis is a bastard man",
    incorrectChoice: "SHABOOYA! YOU'RE WRONG! The answer was BECAUSE DENNIS IS A BASTARD MAN",
  },
];

//// FUNCTIONS ////


  //unhides scoreboard initially, but also used as sort of a "refresh" function.
  function showScoreboard() {
    $('.scoreboard').removeClass("hidden");
    $('#correct-answers').html("Correct answers: " + correctAnswers);
    $('#incorrect-answers').html("Incorrect answers: " + incorrectAnswers);
    $('#not-answered').html("Not answered: " + notAnswered);
  }

  // function that displays current question to be answered
  function showQuestion(questionIndex) {
    $("#question").removeClass("hidden");
    $("#question").text(charDee[questionIndex].question);
    callTimer();
  }

  // function that shows possible answer buttons as choices
  function showPossibleAnswers(questionIndex) {
    for (var i = 0; i < charDee[questionIndex].possibleAnswers.length; i++) {
      var button = $("<button>");
      button.addClass("btn");
      button.addClass("btn-default");
      button.addClass("btn-choice");
      button.attr("data-index", i);
      button.text(charDee[questionIndex].possibleAnswers[i]);
      $("#options").append(button);
    }
  }

  // function that shows teh correct choice
  function correctChoiceShown() {
    $('#results').html("<i class='fas fa-check-circle correct-choice-shown'></i> <br /> <p class='correct-choice-shown'>" + charDee[questionIndex].correctChoice + "</p>");
  }

  // function that shows the wrong choice
  function incorrectChoiceShown() {
    $('#results').html("<i class='fas fa-times-circle incorrect-choice-shown'></i> <br /> <p class='incorrect-choice-shown'>" + charDee[questionIndex].incorrectChoice + "</p>");
  }

  function textShownAfterTimeOut() {
    $('#results').html("<i class='fas fa-times-circle incorrect-choice-shown'></i> <br /> <p class='incorrect-choice-shown'>Out of Time!! You're stupid</p>" + charDee[questionIndex].correctChoice);
  }

  function winCheck() {
    var scoreCalc = Math.floor(correctAnswers / (correctAnswers + incorrectAnswers) * 100)
    var totalScore = scoreCalc + "%";

    if (scoreCalc >= 70) {
      console.log({
        "Total Score": totalScore
      });

      $('#results').html("<h3 class='win'>YOU WIN WITH AN AMAZING " + totalScore + "</h3>");
      $('#choices').append("<button class='btn btn-md btn-warning resetbutton'>Reset Game</button>")
      $('.resetbutton').on("click", function () {
        location.reload();
      });
    }

    if (scoreCalc < 70) {
      console.log({
        "Total Score": totalScore
      });

      $('#results').html("<h3 class='loss'>YOU LOSE WITH A TERRIBLE " + totalScore + "</h1>");
      $('#choices').append("<button class='btn btn-md btn-warning resetbutton'>Reset Game</button>")
      $('.resetbutton').on("click", function () {
        location.reload();
      });
    }
  }

  // clears previous buttons
  function buttonClear() {
    $("button").remove();
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
    var timerCount = 16;
    var timerInterval = setInterval( function() {
      timerCount--;
      $("#timeCounter").text(timerCount);

      if(timerCount === 0) {
        notAnswered++;
        showScoreboard();
        textShownAfterTimeOut();
        buttonClear();
        clearInterval(timerInterval);
        timerCount = 15;

        $("#timeCounter").text(timerCount);

        setTimeout( function() {
          console.log(questionIndex, charDee.length);
          showScoreboard();
          if(questionIndex + 1 < charDee.length) {
            questionIndex++;
            showQuestion(questionIndex);
            showPossibleAnswers(questionIndex);
          }

          if (questionIndex + 1 === charDee.length) {
            winCheck();
          }
        }, 5000);
      }
    }, 1000);

    // on click event to reload timer to prevent multiple timers
    $(document).on("click", ".btn-choice", function () {
     clearInterval(timerInterval);
     timerCount = 15;
     $('#timecounter').text(timerCount);
     showScoreboard();
   });
  }

//// EVENT LISTENERS ////

  // start game on click event that runs first functions
  $("#start").on('click', function() {
    $("#start").hide();
    showTimerDiv();
    showQuestion(questionIndex);
    showPossibleAnswers(questionIndex);
    showScoreboard();
  });

  //button on click functions.
  $(document).on("click", ".btn-choice", function () {
    var answerText = $(this).text();
    var answerDataValue = $(this).attr("data-index");
    var answerIndex = parseInt(answerDataValue);

    //control flow for answering questions
    if (charDee[questionIndex].correct === answerIndex) {
      $("<button>").addClass("btn-success");
      correctChoiceShown();
      buttonClear();
      correctAnswers++;
      showScoreboard();

      if (questionIndex + 1 === charDee.length) {
        winCheck();
      }

      if (questionIndex + 1 < charDee.length) {
        setTimeout(function () {
          buttonClear();
          showScoreboard();
          showQuestion(questionIndex);
          showPossibleAnswers(questionIndex);
        }, 3000);
      }
    }

    if (charDee[questionIndex].correct !== answerIndex) {
      incorrectChoiceShown();
      buttonClear();
      incorrectAnswers++;
      showScoreboard();

      if (questionIndex + 1 === charDee.length) {
        winCheck();
      }

      if (questionIndex + 1 < charDee.length) {
        setTimeout(function () {
          buttonClear();
          showScoreboard();
          showQuestion(questionIndex);
          showPossibleAnswers(questionIndex);
        }, 3000);
      }
    }

    questionIndex++;
  });
})
