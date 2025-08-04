// first express server setup for rudil24!
import express from "express"; // import express from the module we just installed through npm init -y THEN npm i express in our dir (from terminal)
const app = express(); // setup express as the app for attribute use in HTTP Requests below
const port = 3000; // pretty standard to use port 3000 for web services (especially during local dev & testing)

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`); //good check to notify/remind ourselves what port we're running on. again using weird quotes ` to allow ${} use of substitute text
});
// now just run from terminal: node index.js
// then open browser to http://localhost:3000/ or whatever port you used in const port
// we can also find what ports are listening on our local server at ANY TIME from the terminal:
// Windows:     netstat -ano | findstr "LISTENING"
// MacOS/Linux: sudo lsof -i -P -n | grep LISTEN