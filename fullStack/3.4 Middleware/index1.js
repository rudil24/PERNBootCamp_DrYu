// rudil24 middleware lesson
// index1.js helps us learn about importing and using body-parser middleware 
// and tools to help specify the directory where your index.html is, no matter what server you are answering GET requests from!!
import express from "express";
import bodyParser from "body-parser"; // remember to npm i body-parser at the terminal in the project directory before executing this
import { dirname } from "path";  // this chunk of 3 lines are a GREAT routine to get full path to your starting path into __dirname
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))  // "mounts" the bodyparser for use as middleware.
// The "extended" option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");  // res.sendFile requires an exact path, no matter what your webserver. so this code and the derived __dirname from above will make us very portable
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
