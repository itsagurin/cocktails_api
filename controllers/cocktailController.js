import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Получение всех коктейлей
export const getAllCocktails = async (req, res) => {
    try {
        const cocktails = await prisma.cocktail.findMany({
            include: { ingredients: true }, // Включите ингредиенты, если нужно
        });
        res.json(cocktails);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении коктейлей' });
    }
};

// Добавление нового коктейля
export const createCocktail = async (req, res) => {
    const { name, category, instructions, ingredients } = req.body;

    try {
        const cocktail = await prisma.cocktail.create({
            data: {
                name,
                category,
                instructions,
                ingredients: {
                    create: ingredients.map(ingredient => ({
                        ingredientId: ingredient.id, // предполагая, что вы передаете ID ингредиента
                        measure: ingredient.measure,
                    })),
                },
            },
        });
        res.status(201).json(cocktail);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании коктейля' });
        console.error(error)
    }
};