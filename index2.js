// Purpose: To create a server that will fetch a random cocktail from thecocktaildb.com and display it on the index2.ejs page
// Index2.ejs takes the data as a JSON object and in the index2.ejs file we are using the data object to display the cocktail details

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const cocktailData = response.data;
    console.log(cocktailData["drinks"]);
    res.render("index2.ejs", { data: cocktailData["drinks"][0] });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
