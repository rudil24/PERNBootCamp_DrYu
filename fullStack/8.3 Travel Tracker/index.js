import 'dotenv/config';  //allows us to load sensitive environment variables from .env file
import express from "express"; //allows all the good middleware routines
import bodyParser from "body-parser"; //specific input parsing middleware that's now part of express but we still call it out for good luck :-)
import pg from "pg"; //allows us to interact with postgres database

const app = express();
const port = 3000;

const db = new pg.Client({  //set up our database as db
  user: process.env.DB_USER,  //securely retrieves these variables from .env file via the dotenv module
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
db.connect(); //must connect to our db before taking any actions on it

app.use(bodyParser.urlencoded({ extended: true })); //using bodyParser to get user inputs
app.use(express.static("public"));  //signify where static files are in dir "public"

//PART 2d: need to add an async function so we can cleanly return updated visited countries to GET route after POST route updates
async function checkVisitedCountries() {
  const queryResult = await db.query("SELECT country_code FROM visited_countries"); //our db query returns a big wad of objects
    let countries = []; //we'll parse what we need from queryResult into a simpler array called countries = ["XX", "YY", "ZZ"]...
  queryResult.rows.forEach((country) => {  //why use country as the count? <input name="country"> in index.ejs
    countries.push(country.country_code);  //append each country_code attribute to the array. (country_code: 'XX' are the key value pairs in queryResult)
  }); //end the forEach
  return countries; //returns visited country codes to whoever called the function
// next line just for debugging
// console.log(queryResult.rows);  // let's see what queryResult looks like on the console, to help us formulate how to parse
} //end the function

// PART 1: GET home page "/" ; UPDATED to call checkVisitedCountries to get the country_code from existing visited_countries in the db, 
// and send as array to index.ejs 
// then, in the views/index.ejs <script> tag it will fix the style to fill = 'teal' for visited_countries
// moved the bulk of part 1 to the async function above so that it's always able to check visited countries pre and post user input
app.get("/", async (req, res) => {
  const countries = await checkVisitedCountries();  //the magic word await so that we wait on the function while it waits on input from user
  res.render("index.ejs", { countries: countries, total: countries.length });  //send countries array and length to views/index.ejs to render
//  db.end();  // close the db. BUT we DON'T want to do that 
               // since we've upgraded the app to interactively wait for more input, closing the db 
               // will crash the app when we get user input and try to query it. (or even if we F5 refresh our app!)
               // which begs the question: how do we nicely close our database when the app "ends" = Ctrl+C from the terminal. 
               // or do we even need to?
}); //end app.get

// PART 2a: add a row to world_food table using pgAdmin and SQL. I did that as follows in pgAdmin:
//   INSERT INTO world_food (country, rice_production, wheat_production)
//   VALUES ('Italy', 1.46, 7.3);
// If we were to do that programmatically using db.query it would look like:
//   db.query("INSERT INTO world_food (country, rice_production, wheat_production)
//   VALUES ($1, $2, $3)", //but i think the values has to be on the same line as the "INSERT INTO" b/c of the quotes you need. Then line below can be separate:
//   ['Italy', 1.46, 7.3]);

// PART 2b: create countries table using pgAdmin and import countries.csv. here's how i created it:
// CREATE TABLE countries (
//   id SERIAL PRIMARY KEY,
//   country_code CHAR(2),
//   country_name VARCHAR(100)
//   );
// then i imported countries.csv 'with header row' using pgAdmin.

// PART 2c: add new route "/add" for users POSTing a new country. 
// 1. get user input (country) via prompt on home page, and when they click "Add" button
// 2. POST it, convert user input into a 2-digit country code (catch spelling?)
// 3. add it to the visited_countries table in db,
// 4. repeat the initial GET using a res.redirect to /
// 5. that way we can light that country in teal, increment and display total countries
//    using the routine we created in PART 1.
app.post ("/add", async (req, res) => {
  const userInput = req.body["country"]; //i double-checked the views/index.ejs to confirm the body they'll give me is <input name="country">
// PART 3: add some try/catch blocks to user input
  try { //if this block tries and fails it's because country does not exist (rows length will be zero and throw an error )
  const queryResult = await db.query(   //query should create a "1 row object" that contains the matching country_code to their input country_name
  //  "SELECT country_code FROM countries WHERE country_name = $1", 
    //PART 4: make the above query more fault tolerant 
    // i.e. Russia should work instead of Russian Federation 
    // Tanzania should work instead of Tanzania, United Republic of
    "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",  //remember double pipe in SQL is concat.
    // so %userInput% converted is what we're building, and we use LOWER to pre-treat it into lowercase before comparing apples to apples below...
    [userInput.toLowerCase()] //their input to req.body["country"], all converted to lowercase, becomes what we sub into $1 above
  );
 // if (queryResult.rows.length !== 0) { //don't need the if anymore, with the try block above
    const rawObject = queryResult.rows[0]; //get the raw object (the entire row), error trapped in above try block if rows[0] doesn't exist
    const countryCode = rawObject.country_code //parse country code out of the object
  try { //if this block tries and fails it's because country has already been added. remember when we set column country_code to UNIQUE in our sql? genius.
    await db.query(  //now write it to the db as a valid country code in visited_countries
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode,]
    );
//  } //end the if statement
    res.redirect("/"); //and redirect to the homepage where the PART 1 can render our newly updated visited_countries in teal!
  } catch (err) { 
      console.log(err);
      const countries = await checkVisitedCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",  
      });
  }
} catch (err) {
    console.log(err);
    const countries = await checkVisitedCountries();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
}
});

// acknowledge we're up and running on the const port we declared up top
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
