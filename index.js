const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((db) => {
    console.log(`Connected to the database: "${db.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      // TODO: write the schema
      title: "Hummos",
      level: "Amateur Chef",
      ingredients: [
        "1 can chickpeace, drained",
        "100ml cold water, plus a 30ml for a looser consistency",
        "1 lemon, juiced",
        "1 tea glass Tahini",
        "2 tbsp olive oil, to mix and add after",
        "1 tbsp cumin",
        "mixed crudites and pitta bread, to serve",
      ],
      cuisine: "mediterranean",
      dishType: "snack",
      image:
        "https://gatheringdreams.com/wp-content/uploads/2017/10/hummus-square-2.jpg",
      duration: 30,
      creator: "Chef Moe",
    };
    const createdRecipe = await Recipe.create(newRecipe);
    console.log(`Added recipe: "${createdRecipe.title}"`);

    const insertedRecipes = await Recipe.insertMany(data);

    insertedRecipes.forEach((recipe) => {
      console.log(`Added recnipe: "${recipe.title}"`);
    });

    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };

    await Recipe.findOneAndUpdate(filter, update);
    console.log("Updated duration for 'Rigatoni alla Genovese' recipe.");

    const deletedRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    if (deletedRecipe.deletedCount === 1) {
      console.log(
        "Successfully removed 'Carrot Cake' recipe from the database."
      );
    } else {
      console.log("Recipe not found or could not be removed");
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .finally(() => {
    mongoose.disconnect();
  });
