import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";  // these 3 lines are a GREAT package to get full path to your starting path into __dirname
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))  // "mount" bodyparser for use as middleware

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");  // res.sendFile requires an exact path, no matter what your webserver
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
