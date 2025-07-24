import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // console.log(req); // burps out a ton of info about that port request
    // console.log(req.raw); // gives you just the rawHeaders - list of key value pairs that come from the browser where the req originated
    res.send("<h1>Hello!</h1>");
});

app.get("/about", (req, res) => {  //do this when user goes to localhost:3000/about
     res.send("<h2>About Me</h2>");
});

app.get("/contact", (req, res) => {  //do this when user goes to localhost:3000/contact
    res.send('<h2>Contact Me at <a href="mailto:rudil24@gmail.com">rudil24@gmail.com</a></h2>');
});

app.listen(port, () => {
   console.log(`Server running on port ${port}.`);
});
