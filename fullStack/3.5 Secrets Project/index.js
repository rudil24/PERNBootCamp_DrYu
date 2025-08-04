//notes from Dr. Yu:
//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

// rudil24 secrets project
// Goal: take a password input through text + submit button
//   password correct: yes! display secrets.html
//                      no! return to index.html with password field cleared and ready for another try.
import express from "express";
import bodyParser from "body-parser"; // helps us parse our user inputs & associated attributes
import morgan from "morgan"; // HTTP request logger middleware
import { dirname } from "path";  // this chunk of 3 lines are a GREAT routine to get full path to your starting path into __dirname
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const actualPassword = "ILoveProgramming";
let typedPassword = "";

function getPassword(req, res, next) {
  console.log(req.body);
  typedPassword = req.body["password"];
  next();
}

app.use(bodyParser.urlencoded({ extended: true }))  // "mounts" the bodyparser for use as middleware.
// The "extended" option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. 

app.use(morgan("combined")); //mount the morgan middleware. combined format is Standard Apache combined log output: remote address, remote user, date, method, url
//for other formats and options, refer to https://www.npmjs.com/package/morgan

app.use(getPassword); //our own function created above.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");  // res.sendFile will render the index.html on a get request to / (home url.) requires an exact path, no matter what your webserver. so this code and the derived __dirname from above will make us very portable
});

app.post("/check", (req, res) => {     //when user posts data through the submit button, the action from index.html is /check (need to make sure we name this same as index.html is labeling it).
 if (typedPassword == actualPassword) {
  res.sendFile(__dirname + "/public/secret.html");
 } 
 else {
  res.redirect('/?error=invalid_input'); //we can trap that error and display some warning on the input screen, but our instructions are not to touch the index.html file so we'll just signify the error in the url.
 } //end if
}); //end app.post

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

