import express from 'express';
import { getAllCocktails, createCocktail } from './controllers/cocktailController.js';
import { getAllIngredients, createIngredient, deleteIngredient } from "./controllers/ingredientController.js";

const app = express();

// Middleware
app.use(express.json());

// routes
app.get('/cocktails', getAllCocktails);
app.post('/createcocktail', createCocktail);
app.get('/ingredients', getAllIngredients);
app.post('/createingredient', createIngredient);
app.delete('/deleteingredient/:id', deleteIngredient);

export default app;
