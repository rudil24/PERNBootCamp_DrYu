//rudil24 middleware lesson
// index3.js works on our ability to create our own "middleware" function using express req/res attributes
import express from "express";

const app = express();
const port = 3000;

function logger(req, res, next) { //gonna build our own middleware function called logger
  console.log("Req Method: ", req.method); //we're logging the req method and the req url (both attributes of the express req/res model)
  console.log("Req URL: ", req.url);
  next();  //next makes sure the function "continues on to the next thing" when you call it. if you don't have this, your server will HANG cuz it can't get to the app.get chunk (or whatever chunk is below app.use(logger))

}
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
