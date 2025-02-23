// Purpose: To create a server that will fetch a random cocktail from thecocktaildb.com and display it on the index.ejs page
// Index.ejs creates a drink object which will be passed to the server and displayed on the page

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
    console.log(cocktailData);

    function createDrink(cocktailData) {
      const drink = cocktailData.drinks[0];
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push({
            name: ingredient,
            measure: measure ? measure.trim() : "To taste",
          });
        }
      }
      return {
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strCategory: drink.strCategory,
        strAlcoholic: drink.strAlcoholic,
        strGlass: drink.strGlass,
        strInstructions: drink.strInstructions,
        strDrinkThumb: drink.strDrinkThumb,
        ingredients: ingredients,
      };
    }
    const cocktailDetails = createDrink(cocktailData);
    console.log(cocktailDetails);

    res.render("index.ejs", { data: cocktailDetails });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
