import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Getting all the cocktails
export const getAllCocktails = async (req, res) => {
    try {
        const cocktails = await prisma.cocktail.findMany({
            include: { ingredients: true }, // Include ingredients, if needed
        });
        res.json(cocktails);
    } catch (error) {
        res.status(500).json({ error: 'Error in receiving cocktails' });
        console.error(error);
    }
};

// Adding a new cocktail
export const createCocktail = async (req, res) => {
    const { name, category, instructions, ingredients } = req.body;
    console.log('Request Body:', req.body);

    try {
        const cocktail = await prisma.cocktail.create({
            data: {
                name,
                category,
                instructions,
                ingredients: {
                    create: ingredients.map(ingredient => ({
                        ingredientId: ingredient.id, // assuming you're passing the ingredient ID
                        measure: ingredient.measure,
                    })),
                },
            },
        });
        res.status(201).json(cocktail);
    } catch (error) {
        res.status(500).json({ error: 'Error in receiving cocktails' });
        console.error(error)
    }
};