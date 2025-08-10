/* drum kit javascript by rudil24 */
/* detecting button press (left click via mouse) on our webpage. 
the for loop is to apply addEventListener to all buttons returned in the array from querySelectorAll, 
using [i] to address each individual array element. */

for (let i=0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
      //anonymous function to be executed when the button is clicked
    let buttonInnerHTML = this.innerHTML; //this refers to the button that was clicked, and innerHTML is the text inside the button
    makeSound(buttonInnerHTML); //make the sound based on the button pressed
    buttonAnimation(buttonInnerHTML); //add animation to the button pressed

  }); //ending the anonymous function  


} //ending the for loop

/* detecting keydown to allow keyboard presses as input. 
this gives the user options of key presses (below) OR mouse clicks on image buttons depicting each key (above) */
document.addEventListener("keydown", function(event) { //original instructions were to use "keypress" event, but that is deprecated, so we use "keydown" instead
    makeSound(event.key);
    buttonAnimation(event.key);
});
function makeSound(key) {
    //switch statement to determine which sound to play based on the key pressed
    switch (key) { 
        case "w": 
          let crash = new Audio("./sounds/crash.mp3");
          crash.play();
        break; 

        case "a": 
          let snare = new Audio("./sounds/snare.mp3");
          snare.play();
        break; 

        case "s": 
          let tom1 = new Audio("./sounds/tom-1.mp3");
          tom1.play();
        break; 

        case "d": 
          let tom2 = new Audio("./sounds/tom-2.mp3");
          tom2.play();
        break;
        
        case "j": 
          let kick = new Audio("./sounds/kick-bass.mp3");
          kick.play();
        break; 

        case "k": 
          let tom3 = new Audio("./sounds/tom-3.mp3");
          tom3.play();
        break;
       
        case "l": 
          let tom4 = new Audio("./sounds/tom-4.mp3");
          tom4.play();
        break;  
      
        default: //if some other key is pressed than the cases above, log it to the console
            console.log(key);
    } // ending the switch
}
function buttonAnimation(currentKey) {
   let activeButton = document.querySelector("." + currentKey);
   activeButton.classList.add("pressed");
   setTimeout(function() {
    activeButton.classList.remove("pressed");
   },100); //second param to setTimeout is milliseconds to wait
}
  // REFLECTION: for the anonymous function at the top of the file...
  // optionally, we could've named the anonymous function in the click event listener to "handleClick" 
  // and then passed it in as a parameter to addEventListener, like so:
  // document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
  // function handleClick() {
  //   let buttonInnerHTML = this.innerHTML;
  //   makeSound(buttonInnerHTML);
  //   buttonAnimation(buttonInnerHTML);
  // } //ending the handleClick function