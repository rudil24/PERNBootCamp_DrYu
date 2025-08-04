//rudil24 middleware lesson
//index2.js concentrates on using the morgan package for great logging tools on HTTP requests.
import express from "express";
import morgan from "morgan"; // HTTP request logger middleware for node.js. make sure you install it at the terminal in the project's directory with npm i morgan

const app = express();
const port = 3000;

// app.use(morgan("tiny")); //mount the morgan middleware. tiny format is the minimal output, yielding: method, url, status, res(content-length), and response time
app.use(morgan("combined")); //mount the morgan middleware. combined format is Standard Apache combined log output: remote address, remote user, date, method, url
//for other formats and options, refer to https://www.npmjs.com/package/morgan

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
