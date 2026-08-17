const { prisma } = require('../prismaClient');

async function getAllCategories(req, res) {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) }
        });

        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada no site' });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar essa categoria' });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById
}