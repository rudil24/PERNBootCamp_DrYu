import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from 'bcrypt'; //allows us to bcrypt passwords, make sure you const saltRounds in your dec block
import session from "express-session"; //allows us to set up new sessions so we can start saving user sessions
import passport from "passport"; //lets us do all the great passport authentication stuff
import { Strategy } from "passport-local"; //enables a strategy for local passwords
import "dotenv/config";  //allows us to load sensitive environment variables from .env file
// import env from "dotenv" //could also write the dotenv one this way, but then you have to make sure to do an env.config() in dec block



const app = express();
const port = 3000;
const saltRounds = 10;
// env.config(); //not necessary if we use the shorthand import method for dotenv, see import section above

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24  //milliseconds until expiration, multiplied up to get to a total of 24 hours. 
    }
  })
);

//make sure this app.use passport section is BELOW the app.use session section
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({  //set up our database as db
  user: process.env.DB_USER,  //securely retrieves these variables from .env file via the dotenv module
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
db.connect(); //must connect to our db before taking any actions on it

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

//added: send straight to secrets if user authorized via session cookies
app.get("/secrets", (req, res) => {
  // console.log(req.user)
  if (req.isAuthenticated()) {  //this is a passport feature
    res.render("secrets.ejs");
  } else {
      res.redirect("/login");
    }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query( //we'll get info back into result
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", //added RETURNING * to give everything back into const result
            [email, hash]
          );
          const user = result.rows[0]; //our user is the first row in result
          req.login(user, (err) => { //this is a special passport function
            console.log(err); //if any
            res.redirect("/secrets"); //redirect them to GET secrets codeblock which will test if authenticated using passport
          });  
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {  //don't need async req res anymore with passport
  successRedirect: "/secrets",  //simple routing based on baked-in passport success/fail logic
  failureRedirect: "/login",
}
)); 

//  const email = req.body.username;
//  const loginPassword = req.body.password;
//  don't need to grab stuff in req.body anymore on login, the passport strategy verify section does it for us

// we cut the try/catch block from here and pasted it into the passport strategy block near bottom


passport.use(new Strategy(async function verify(username, password, cb) {  //first 2 verify params have to match your ejs input name attributes, 
                                                                           //3rd param is cb for callback
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username, //needs to be username instead of email like we had it. that's to match the ejs input name.
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => { //had to change loginPassword back to password to exactly match ejs input name
        if (err) {
         // console.error("Error comparing passwords:", err);
         return cb(err);
        } else {
          if (result) { //pass the callback
            return cb(null, user);
            //  res.render("secrets.ejs");
          } else {
              //  res.send("Incorrect Password");
              return cb(null, false);
          }
        }
      });
    } else {
    //  res.send("User not found");
      return cb("User not found");
    }
  } catch (err) {
    // console.log(err);
    return cb(err);
  }
}));

passport.serializeUser((user, cb) => { //saves user info to the local session
  cb(null, user);
});

passport.deserializeUser((user, cb) => { //deserializes user info into a format we can get for that session
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
