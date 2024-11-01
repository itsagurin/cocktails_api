import express from 'express';
import { getAllCocktails, createCocktail } from './controllers/cocktailController.js';

const app = express();

// Middleware
app.use(express.json());

// Маршруты для коктейлей
app.get('/cocktails', getAllCocktails);
app.post('/createcocktail', createCocktail);

export default app;
