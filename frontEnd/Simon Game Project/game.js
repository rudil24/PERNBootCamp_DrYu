/* rudil24 Simon Game JS/jQ script */
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameKeyStarted = false;
var level = 0;

/* listen for first keyboard input, 
then do start game stuff and ignore further keyboard input*/
$(document).on("keydown", function() { 
  if (!gameKeyStarted) { //using the ! for NOT
    $("#level-title").text("Level " + level); //change that css id's text to Level 0
    nextSequence(); //call nextSequence function
    gameKeyStarted = true; //set it true so we ignore further key presses until startOver resets
  }
});

/* capture input sequence from user */
$(".btn").click(function()  {
  var userChosenColor = $(this).attr("id"); //user clicked a button, jQuery stores what they clicked in object $(this), grab its id. 
  userClickedPattern.push(userChosenColor); //add it to the user input sequence array
  playSound(userChosenColor);  //passes that stored id to play that color's sound
  animatePress(userChosenColor); //passes that stored id to animate that button
  checkAnswer(userClickedPattern.length-1); //check answer, pass position of current last element
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //if last button pressed matches
      if (userClickedPattern.length === gamePattern.length){ //and total length of array matches
        setTimeout(function () {  //CORRECT branch: get next sequence after 1s breather
          nextSequence();
        }, 1000);
      }
    } else { //WRONG branch
      playSound("wrong");
      $("body").addClass("game-over"); //css' .game-over class will turn page background red
      $("#level-title").text("Game Over, Press Any Key to Restart"); //replace header text

      setTimeout(function () {
        $("body").removeClass("game-over"); //stop background red after 200ms
      }, 200);

      startOver();  //new game
    }
}

function nextSequence() {
    userClickedPattern = []; //reset user button input to capture their next full sequence 
    level++; //increase game level (sequence length)
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(4*(Math.random())); //random whole num between 0-3
    var randomChosenColor = buttonColors[randomNumber]; //random 0-3 gets a color from buttonColors array
    gamePattern.push(randomChosenColor); //push that color to end of gamePattern
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animate the html element with that #id
    playSound(randomChosenColor);
}

function animatePress(currentColor) { //pass in current color
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100); //remove class effect after 100ms
}

  function playSound(name) {
    var buttonSound = new Audio("sounds/" + name + ".mp3"); // dotslash before sounds cause parser problem
    buttonSound.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    gameKeyStarted = false;
}
