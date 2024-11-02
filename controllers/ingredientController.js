import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await prisma.ingredient.findMany();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: 'Error receiving ingredients ' });
        console.error(error);
    }
};

export const createIngredient = async (req, res) => {
    const { name, description, alcohol } = req.body;
    console.log('Request Body:', req.body);

    try {
        const ingredient = await prisma.ingredient.create({
            data: {
                name,
                description,
                alcohol,
            },
        });
        res.status(201).json(ingredient);
    } catch (error) {
        res.status(500).json({ error: 'Error creating ingredient' });
        console.error(error);
    }
};

export const deleteIngredient = async (req, res) => {
    const { id } = req.params; // Retrieve id from query parameters
    console.log(`Deleting ingredient with id: ${id}`);

    try {
        const ingredient = await prisma.ingredient.delete({
            where: { id: Number(id) }, // Make sure the id is converted to a number
        });
        res.status(200).json({ message: 'Ingredient deleted successfully', ingredient });
    } catch (error) {
        // Error handling if an ingredient is not found or another error occurs
        if (error.code === 'P2025') {
            // Error code P2025 means that the record was not found
            res.status(404).json({ error: 'Ingredient not found' });
        } else {
            res.status(500).json({ error: 'Error deleting ingredient' });
            console.error(error); // Error output for debugging
        }
    }
};