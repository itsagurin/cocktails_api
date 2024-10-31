import express from 'express';
import { getAllCocktails, createCocktail } from './controllers/cocktailController.js';

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Маршруты для коктейлей
app.get('/cocktails', getAllCocktails);
app.post('/cocktails', createCocktail);

// Экспортируйте app
export default app;
