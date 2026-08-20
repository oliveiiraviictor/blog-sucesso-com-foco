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

async function createCategory(req, res) {
    try {
        const { nome, descricao } = req.body;

        //Validar campos obrigatórios
        if ( !nome || !descricao ) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando' });
        }

        const category = await prisma.category.create({
            data: {
                nome,
                descricao
            }
        });

        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar categoria' });
    }

    
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                nome: nome || undefined,
                descricao: descricao || undefined
            }
        });

        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory
}