import express from "express";
import { dirname } from "path";  // these 3 lines are a GREAT package to get full path to your starting path into __dirname
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
//    const today = new Date("August 31, 2024 17:00"); // test with known weekend date
    const today = new Date(); // Date() gives today's date.
    const day = today.getDay ();
//    console.log(day);
    let type = "a weekday";
    let adv = "it's time to work hard";

    if (day === 0 || day === 6) {
        type = "the weekend";
        adv = "it's time to have some fun";
    }
    
    res.render("index.ejs", { 
        dayType: type, 
        advice: adv, 
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });