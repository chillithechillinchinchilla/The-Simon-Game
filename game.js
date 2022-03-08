// Init Vars; button color choices, and blank game pattern array.
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var audio = new Audio("./sounds/green.mp3");
audio = new Audio("./sounds/red.mp3");
audio = new Audio("./sounds/blue.mp3");
audio = new Audio("./sounds/yellow.mp3");


//Look for press of start button to init game.
$(".start").click(function(){
  animateButton("start");
  nextSequence();
  $("#start").text("Michael Says:");
});

//Look for hint button to play through entire game sequence.
$(".hint").click(function(){
  animateButton("hint");
  var i = 0;
  hintLoop(i);
});

function hintLoop(i){ //must init i beforehand
  setTimeout(function (){
    color = gamePattern[i];
    playSound(color);
    animateButton(color);
    i++;
    if (i < gamePattern.length){
      hintLoop(i);
    }
  },1000);//end timeout
}//end funct

// Look for user button clicks and determin which button was selected.
$(".btn").click(function(){
   userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(userChosenColor);

   if (userClickedPattern.length == level){
     checkAnswer(level);
   }
});


function nextSequence(){ // add to the sequence
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber]; //assign color based on number
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animateButton(randomChosenColor);

  level++;
  userClickedPattern = []; //set user array back to 0
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){
  for (var i = 0; i < currentLevel; i++)
    {
        // console.log("game is: " + gamePattern[i]);
        // console.log("user is: " + userClickedPattern[i]);
        if (gamePattern[i] === userClickedPattern[i])
        {
          console.log("good");
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

function resetGame(){
    console.log("GameOver");
    level = 0;
    gamePattern = [];
    $("h1").text("GameOver.");
    $("#start").text("Click to try again.");
}

function animateButton(name){ // Animate the button in gamePattern and play the respective sound.
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(color){ // Animate when user clicks button
  $("#" + color).addClass("pressed");
  setTimeout(function(){$("#"+ color).removeClass("pressed")},100 );
}

function playSound(name){ // Pass in the color you want played.
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
