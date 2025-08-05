import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';  //load sensitive environment variables from .env file

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

// DONE TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = process.env.YOUR_BEARER_TOKEN;
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // DONE TODO 2: Use axios to POST the data from req.body to the secrets api servers.
 // const userBody = {
 //   "secret" : req.body.secret,
//    "score" : req.body.score
 // } 
 // !Don't need the above new object, b/c the req.body object we capture is already perfectly keyed with those attributes.
 // This is because Dr Yu matched the name= attribute of the <input> tags to the same attribute names that secrets API wants.
 // She did this in the <input> tags of the index.ejs, where the user enters the data fields.
 // so we can just post the entire req.body to the axios post (2nd variable)
 // ?but if user accidentally or on purpose posts an id, will/should it ignore it, error it, or use it properly?
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;  //need the id to build the url for the put
  // DONE TODO 3: Use axios to PUT the data from req.body to the secrets api servers. 
  try {
    const result = await axios.put((API_URL + "/secrets/" + searchId), req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // DONE TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  try {
    const result = await axios.patch((API_URL + "/secrets/" + searchId), req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const result = await axios.delete((API_URL + "/secrets/" + searchId), config); //don't need req.body for delete
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
