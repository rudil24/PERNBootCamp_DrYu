// rudil24 middleware lesson
// index4.js helps us learn to "put it all together" with a working app that uses body-parser for input handling, morgan for logging, and express and node underlying it all
import express from "express";
import bodyParser from "body-parser"; // remember to npm i body-parser at the terminal in the project directory before executing this
import morgan from "morgan"; // HTTP request logger middleware for node.js. make sure you install it at the terminal in the project's directory with npm i morgan
import { dirname } from "path";  // this chunk of 3 lines are a GREAT routine to get full path to your starting path into __dirname
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let bandName = "";

function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + " " + req.body["pet"];
  next();
}

app.use(bodyParser.urlencoded({ extended: true }))  // "mounts" the bodyparser for use as middleware.
// The "extended" option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. 

app.use(morgan("combined")); //mount the morgan middleware. combined format is Standard Apache combined log output: remote address, remote user, date, method, url
//for other formats and options, refer to https://www.npmjs.com/package/morgan

app.use(bandNameGenerator); //our own function created above. putting below the other 2 but i think it doesn't matter since they all push to next in their definition.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");  // res.sendFile will render the index.html on a get request to / (home url.) requires an exact path, no matter what your webserver. so this code and the derived __dirname from above will make us very portable
});

app.post("/submit", (req, res) => {     //when user posts data, we use the /submit to send back their band name.
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`); //derived from our bandNameGenerator function above.
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

