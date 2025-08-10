import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from 'bcrypt'; //allows us to bcrypt passwords, make sure you const saltRounds in your dec block
import 'dotenv/config';  //allows us to load sensitive environment variables from .env file

const app = express();
const port = 3000;
const saltRounds = 10; //how many 2^x rounds of salt that bcrypt pours on those passwords. careful! much more than 10 slows performance.
                        /* rounds=8 : ~40 hashes/sec
                        rounds=9 : ~20 hashes/sec
                        rounds=10: ~10 hashes/sec
                        rounds=11: ~5  hashes/sec
                        rounds=12: 2-3 hashes/sec
                        rounds=13: ~1 sec/hash
                        rounds=14: ~1.5 sec/hash
                        rounds=15: ~3 sec/hash
                        rounds=25: ~1 hour/hash
                        rounds=31: 2-3 days/hash */

const db = new pg.Client({  //set up our database as db
  user: process.env.DB_USER,  //securely retrieves these variables from .env file via the dotenv module
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
db.connect(); //must connect to our db before taking any actions on it

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const userEmail = req.body.username;  //name=username is the name given to the email input field in views/register.ejs
  const userPassword = req.body.password;
//  console.log(userEmail);
//  console.log(userPassword);
  try {
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [userEmail]); //run the email against known emails
      if (emailCheck.rows.length > 0) {
        res.send ("email already exists. Try logging in."); 
      } else {
          //hash user entered password then store
          bcrypt.hash(userPassword, saltRounds, async (err, hashPwd) => {
            if (err) {
              console.log("Error hashing password:", err);
            } else {
                await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [userEmail, hashPwd]);  //write new users to db with hashed pwd
                res.render("secrets.ejs"); //send them to secrets, once they've registered     
              }
              
          });
        }
  } catch(err) {
      console.log(err); //if err just log it
    }    
});

app.post("/login", async (req, res) => {
  const userEmail = req.body.username;
  const userPassword = req.body.password;
//  console.log(userEmail);
//  console.log(userPassword);
  try {
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [userEmail]); //make sure their email exists
      if (emailCheck.rows.length > 0) {
        const userDbRow = emailCheck.rows[0];
        const storedPwd = userDbRow.password;
        //compare using bcrypt
        bcrypt.compare(userPassword, storedPwd, (err, emailCheck) => { //order is important. stored (hashed) pwd needs to be 2nd var
          if (err) {
            console.log ("Error in bcrypt.compare: ", err);
          } else {
              if (emailCheck == true) {  //i know it's pedantic to == a boolean but it just reads better to me based on the var name
                res.render("secrets.ejs"); //send them to secrets, if their password is correct
              } else {
                  res.send ("password incorrect. Please try logging in again.");
                //  res.redirect ("/login"); //ERR: "Cannot set headers after they are sent to the client"
                }
            }
        }) 
      } else {
          res.send ("user doesn't exist. Please check that you typed the email correctly, and try entering the email and password again.");
          // res.redirect ("/register"); //after a few we should try to send them to register. their email clearly doesn't exist.
        }  
  } catch(err) {
      console.log(err); //if err just log it
    }    
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
