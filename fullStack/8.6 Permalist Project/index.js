import 'dotenv/config';  //allows us to load sensitive environment variables from .env file
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({  //set up our database as db
  user: process.env.DB_USER,  //securely retrieves these variables from .env file via the dotenv module
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
db.connect(); //must connect to our db before taking any actions on it

let items = [  //setting up the first two item objects in the list, have also copied these to db for continuity
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {  //using the async/await power duo to wait for our db query
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC"); // this query keeps the items view ordered 
                                                                          // the same as they were created, by ascending id
    items = result.rows;  //SHOULD match the object format from the let items 2 examples above, console.log it to make sure
    // console.log(result.rows);

    res.render("index.ejs", {
      listTitle: "To Do",  // should we make this title just hardcoded text or do we allow it editable by user?
      listItems: items,
  });
} catch (err) {
  console.log(err);
}
});

app.post("/add", async (req, res) => {  //again adding async/await to this block to wait for user input
  const item = req.body.newItem;  //newItem is the ejs name="newItem" for that input field, so we'll assign that body to our const item                              
  //  items.push({ title: item });  //items.push is obsolete with our db method, was just for the non-db demo
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);  //write new item to db
    res.redirect("/"); //back to main page, which then retrieves all items from db via app.get
  } catch(err) {
    console.log(err) //if err just log it
  }
});

app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId; 
  const item = req.body.updatedItemTitle; //we get these attribute names from the ejs

  try {
    await db.query("UPDATE items SET title = ($2) where id = $1" [id,item]); //write the edited item title to the db
    res.redirect("/"); //back to main page, which then retrieves all items from db via app.get
  } catch(err) {
    console.log(err) //if err just log it
  }
});


app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId; //name:value. deleteItemID is the name attribute in the delete block on ejs; value attribute is the id
  try {
    await db.query("DELETE FROM items where id = $1", [id]);
    res.redirect("/");
  } catch(err) {
    console.log(err)
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
