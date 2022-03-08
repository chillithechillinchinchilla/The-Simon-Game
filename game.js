// This game asks users to remember a random sequence of buttons which flash and play sound.
// Once user selects the start button, the game starts with one pattern and continuously adds
// to the pattern each time the user completes the level.
// Answer is automatiacally checked when player enters the same amount of buttons as the current gamePattern.
// Player may ask for a hint which goes through the gamePattern with a delay between each item.
// Arrays, timers, recursive function, audio functions, jQuery animations and css attribute changes.



// Init Vars; button color choices, and blank game pattern array.
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = []; //gamePattern used by game.
var userClickedPattern = []; // Pattern user enters, is set to 0 at each level.

var level = 0;

//this loads each audio file soplaying is smoother.
var audio = new Audio("./sounds/green.mp3");
audio = new Audio("./sounds/red.mp3");
audio = new Audio("./sounds/blue.mp3");
audio = new Audio("./sounds/yellow.mp3");



$(".start").click(function(){ //Look for press of start button to init game.
  animateButton("start");
  nextSequence();
  $("#start").text("Michael Says:");
});

$(".hint").click(function(){ //Look for hint button to play through entire game sequence
  animateButton("hint");
  var i = 0;
  hintLoop(i);
});

// Look for the user to click a button.
// Automatically checks the answer once userClickedPattern length = gamePattern length.
$(".btn").click(function(){ // Look for user button clicks and determine which button was selected.
   userChosenColor = $(this).attr("id"); // find the name of the button which triggered the event.
   userClickedPattern.push(userChosenColor); //push color onto answer array.

   playSound(userChosenColor);
   animatePress(userChosenColor);

   if (userClickedPattern.length == level){
     checkAnswer(level);
   }
});


function nextSequence(){ // Adds a random color to the gamePattern.
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber]; //assign color based on number
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animateButton(randomChosenColor);

  level++;
  userClickedPattern = []; //set user array back to 0
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){ //Check the answer given by player.
  for (var i = 0; i < currentLevel; i++)
    {
        if (gamePattern[i] === userClickedPattern[i])
        {
          continue;
        }
        else
        {
          resetGame();
          return;
        }
    }
    console.log("You Think you're good eh? How bout deez apples?");
    setTimeout(function () {
      nextSequence();
    }, 1000);
}

function resetGame(){ // Called when checkAnswer fails. Allows user to restart game.
    console.log("GameOver");
    level = 0;
    gamePattern = [];
    $("h1").text("GameOver.");
    $("#start").text("Click to try again.");
}

function animateButton(name){ // Animate button in gamePattern and play the respective sound.
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(color){ // Animate when user clicks button via addClass. Remove after timeout.
  $("#" + color).addClass("pressed");
  setTimeout(function(){$("#"+ color).removeClass("pressed")},100 );
}

function playSound(name){ // Pass in the color you want played.
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Recursive function that iterates through gamePattern[]. plays each sound while animating
// the respective button. Allows user to remember longer sequences.
// We use timeout function so there is a delay between audio elements.
// Must pass in the array start i = 0 to start at beggining of gamePattern[]
function hintLoop(i) {
    setTimeout(function (){
      color = gamePattern[i];
      playSound(color);
      animateButton(color);
      i++;
      if (i < gamePattern.length){
        hintLoop(i);
      }
    },1000); // End Timeout Function.
}
