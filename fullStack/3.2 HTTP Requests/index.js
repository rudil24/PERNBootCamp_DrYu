import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // console.log(req); // burps out a ton of info about that port request
    // console.log(req.raw); // gives you just the rawHeaders - list of key value pairs that come from the browser where the req originated
    res.send("<h1>Hello! How are you?</h1>");
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
// reflection (rudil24): when you node index.js this time, does it throw er; // unhandled 'error' event?
// more than likely, your port 3000 still running from the last exercise.
// find the terminal where it's running (last line will say "Server running on port 3000" because of our great app.listen code)
// Ctrl+C to close that server session**!! then run node index.js again (make sure your terminal is in the project folder you want to run)
// **=can't find the terminal to ctrl+c on?  See proper way to close any port, below.
// https://dev.to/sylwiavargas/how-to-properly-close-a-port-2p36
// also learn about nodemon, the package to install to automatically restart the server when code change/save is detected.
//   npm i -g nodemon
// will install it globally on your system so you can just run nodemon index.js instead of node.js from now on, and the auto-restart on updated code will happen! 