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
module.exports = { getAllArticles }