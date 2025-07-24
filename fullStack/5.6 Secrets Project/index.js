// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (req, res) => {
    try {
      const result = await axios.get("https://secrets-api.appbrewery.com/random");
      res.render("index.ejs", {   // this serves the index.ejs to the user
        secret: result.data.secret,  // this makes our local secret in the ejs match the data.secret from the axios call to the secrets api
        user: result.data.username, // this makes our local user in the ejs match the data.username from the axios call to the secrets api
      });
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
  });

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });
  