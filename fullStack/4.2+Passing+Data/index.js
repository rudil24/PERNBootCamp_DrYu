import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => { //render app home page when users arrive aka they ask to get the homepage
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {  //when the user hits submit
  const numLetters = req.body["fName"].length + req.body["lName"].length;  //add the length of both fields
  res.render("index.ejs", {numberOfLetters : numLetters});  //then render it in the /submit url
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);  //lets us know we're running and on which port, to the console/terminal
});
