const { prisma } = require('../prismaClient');

async function getAllArticles(req, res) {
    try {
        const articles = await prisma.article.findMany({
            include: {
                autor: true,
                categoria: true,
                articleTags: true
            }
        });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar artigos' });
    }
}

async function getArticleById(req, res) {
    try {
        const { id } = req.params;
        
        const article = await prisma.article.findUnique({
            where: { id: parseInt(id) },
            include: {
                autor: true,
                categoria: true,
                articleTags: true
            }
        });

        if (!article) {
            return res.status(404).json({ error: 'Artigo não encontrado' });
        }

        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar artigo' });
    }
}

async function createArticle(req, res) {
    try {
        const { titulo, conteudo, imagemCapa, autorId, categoriaId } = req.body;

        // Validar campos obrigatórios
        if (!titulo || !conteudo || !autorId || !categoriaId) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando' });
        }

        const article = await prisma.article.create({
            data: {
                titulo,
                conteudo,
                imagemCapa: imagemCapa || null,
                autorId: parseInt(autorId),
                categoriaId: parseInt(categoriaId),
                status: 'rascunho'
            },
            include: {
                autor: true,
                categoria: true
            }
        });

        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar artigo' });
    }
}

async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const { titulo, conteudo, imagemCapa, status, categoriaId } = req.body;

        const article = await prisma.article.update({
            where: { id: parseInt(id) },
            data: {
                titulo: titulo || undefined,
                conteudo: conteudo || undefined,
                imagemCapa: imagemCapa || undefined,
                status: status || undefined,
                categoriaId: categoriaId ? parseInt(categoriaId) : undefined
            },
            include: {
                autor: true,
                categoria: true,
                articleTags: true
            }
        });

        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar artigo' });
    }
}

async function deleteArticle(req, res) {
    try {
        const { id } = req.params;

        await prisma.article.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Artigo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar artigo' });
    }
}


module.exports = { 
    getAllArticles, 
    getArticleById,
    createArticle,
    updateArticle }