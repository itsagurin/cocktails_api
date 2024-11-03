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

export const deleteCocktail = async (req, res) => {
    const { id } = req.params; // Retrieve id from query parameters
    console.log(`Deleting cocktail with id: ${id}`);

    try {
        const cocktail = await prisma.cocktail.delete({
            where: { id: Number(id) }, // Make sure the id is converted to a number
        });
        res.status(200).json({ message: 'cocktail deleted successfully', cocktail });
    } catch (error) {
        // Error handling if an ingredient is not found or another error occurs
        if (error.code === 'P2025') {
            // Error code P2025 means that the record was not found
            res.status(404).json({ error: 'cocktail not found' });
        } else {
            res.status(500).json({ error: 'Error deleting cocktail' });
            console.error(error); // Error output for debugging
        }
    }
};