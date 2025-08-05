//working with EJS files - rudil24
import express from "express"; //express now includes bodyparser so you only need to import express for this lesson
const app = express();
const port = 3000;

app.get("/", (req, res) => {    //our homepage, displayed when user does a "get" request (default for landing their browser on our home url)
  const data = {
    title: "EJS Tags", //this will go in as our webpage title via views/index.ejs
    seconds: new Date().getSeconds(),  //this variable will go through some logic in views/index.ejs
    items: ["apple", "banana", "cherry"],  //this array will be used to print a fruit based on the secondhand says on the watch above (.getSeconds)
    htmlContent: "<strong>This is some strong text</strong>", //we'll also play with just passing htmlContent over so we render that "as is" in views/index.ejs too
  };
  res.render("index.ejs", data);  //send it all over (the const = data object) to our index.ejs for processsing & display
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
