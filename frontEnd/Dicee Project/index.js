/* first full index.js for rudil24! let's goooo! */
var randomNumber1 = Math.floor(6*(Math.random()) + 1); //roll die 1
var imageName1 = "./images/dice" + randomNumber1 + ".png"; //append the rando to find the correct image
document.querySelector("img.img1").setAttribute("src",imageName1); //replace first encounter of an <img> of class=img1 src filename with the above
var randomNumber2 = Math.floor(6*(Math.random()) + 1); //roll die 2
var imageName2 = "./images/dice" + randomNumber2 + ".png"; //append the rando to find the correct image
document.querySelector("img.img2").setAttribute("src",imageName2); //replace first encounter of an <img> of class=img2 src filename with the above
var winnerText = "";
if (randomNumber1 > randomNumber2) {
    winnerText = "🚩 Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
    winnerText = "Player 2 Wins! 🚩";
} else {
    winnerText = "Draw!";
}
document.querySelector("h1").textContent = winnerText;