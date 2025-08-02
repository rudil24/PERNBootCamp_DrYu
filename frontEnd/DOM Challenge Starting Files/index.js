document.query
/* This code is meant to be run in the console of a web page
document.query was the hint from Angela
and rather than building index.js that would be sourced in a script tag in the html file,
she'd like us to do it from the console on the local loaded page

FIRST CHALLENGE: replace the last li element in the ul with the text "I am the droid you are looking for"
************
document.firstElementChild.lastElementChild.querySelector("ul").lastElementChild.innerHTML = "I am the droid you are looking for";
************
firstElementChild: html
lastElementChild: body
querySelector("ul"): selects the first ul element in the body
lastElementChild: selects the last li element in that ul
innerHTML: sets the content of that li element

2nd CHALLENGE:
change the hyperlink and text to red on the list item Google link in the index.html file
so here's the query from the console:
************
document.querySelector("ul li a").style.color = "red";
************
ALTERNATIVELY, since there's only one group of li's in the whole doc you could use:
document.querySelector("li a").style.color = "red";
ALTERNATIVELY, you could query all to find them all, and then manipulate the first one:
document.querySelectorAll("li a")[0].style.color = "red";

3rd CHALLENGE:
change the background color of the lone button on the page to yellow
************
document.querySelector("button").style.backgroundColor = "yellow";
************
ALTERNATIVELY, you could just find the element by tag name, and set the first (and only) one in the returned array [0] to yellow:
document.getElementsByTagName("button")[0].style.backgroundColor = "yellow"; 

4th CHALLENGE: 
make the button part of the new invisible class we've added to the project's styles.css sheet. invisible class has visibility: hidden
************
document.querySelector("button").classList.add("invisible");
************
NOW to remove or (sometimes even better) toggle the class, you could use:
document.querySelector("button").classList.remove("invisible");
or
document.querySelector("button").classList.toggle("invisible");

5th CHALLENGE:
make any h1's huge (10rem) by adding the huge class to the styles.css,
then manipulating the h1 element to add the class via JavaScript on the console
************
document.querySelector("h1").classList.add("huge");

6th CHALLENGE:
change the text of the h1 by using textContent instead of innerHTML (innerHTML is not recommended for text-only changes)
************
document.querySelector("h1").textContent = "Hello, World!";

7th CHALLENGE:
find and list all attributes, and change the hyperlink for the first list item "Google" from "https://www.google.com" to "https://www.bing.com"
************
document.querySelector("a"); //gives you the first link in the document
document.querySelector("a").attributes; //gives you all attributes of that link
document.querySelector("a").getAttribute("href"); //gets the href attribute assignment of that link
document.querySelector("a").setAttribute("href", "https://www.bing.com"); //2nd parameter sets the href attribute assignment of that link
ALTERNATIVELY to set it could do the simpler: document.querySelector("ul li a").href = "https://www.bing.com";
*/
