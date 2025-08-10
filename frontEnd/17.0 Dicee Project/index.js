/* first full index.js for rudil24! let's goooo! 

Premise: use javascript in concert with html and css to 
roll and display 2 dice (one die for player1, one die for player2.)
Whoever has the higher die gets a winning message, otherwise a "draw/tie" message. 

Ground Rules: use html for content, css for styling, and javascript for functionality.

Refactoring 20250802: replacing our outdated "var" declarations with the ES6 standard "let" 
*/
let randomNumber1 = Math.floor(6*(Math.random()) + 1); //roll die 1
let imageName1 = "./images/dice" + randomNumber1 + ".png"; //append the rando to find the correct image
document.querySelector("img.img1").setAttribute("src",imageName1); //replace first encounter of an <img> of class=img1 src filename with the above
let randomNumber2 = Math.floor(6*(Math.random()) + 1); //roll die 2
let imageName2 = "./images/dice" + randomNumber2 + ".png"; //append the rando to find the correct image
document.querySelector("img.img2").setAttribute("src",imageName2); //replace first encounter of an <img> of class=img2 src filename with the above
let winnerText = "";
if (randomNumber1 > randomNumber2) {
    winnerText = "🚩 Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
    winnerText = "Player 2 Wins! 🚩";
} else {
    winnerText = "Draw! (no one wins)";
}
document.querySelector("h1").textContent = winnerText;
//end of index.js
/* Key reasons for preferring let over var (thanks Google search!):
  * Block Scoping: 
    let variables are scoped to the nearest enclosing block (e.g., if statements, for loops, or any {} block), 
    meaning they are only accessible within that block. This contrasts with var, which is function-scoped and can lead to 
    unexpected behavior when variables declared within blocks are accessed outside of them. This block-scoping helps prevent 
    variable name collisions and makes code more predictable.

  * Reduced Global Scope Pollution:
    Variables declared with var outside of any function become global variables, potentially polluting the global namespace. 
    let, being block-scoped, helps to contain variables within their intended scope, reducing the risk of unintended side effects and conflicts.

  * Temporal Dead Zone (TDZ) vs Hoisting:
    let variables are subject to the Temporal Dead Zone, meaning they cannot be accessed before their declaration. 
    Attempting to do so results in a ReferenceError. var variables, on the other hand, are hoisted to the top of their 
    function scope and initialized with undefined, which can lead to subtle bugs if variables are used before their intended assignment.

  * Prevention of Redeclaration:
    let prevents the redeclaration of a variable within the same scope, throwing a SyntaxError. This helps in catching errors 
    early and maintaining code clarity, whereas var allows redeclaration without error, potentially leading to confusion 
    and overwriting of values. 
    
In essence, let (along with const for unchangeable values) offers more controlled and predictable variable management, leading to 
more robust and maintainable JavaScript code.
*/