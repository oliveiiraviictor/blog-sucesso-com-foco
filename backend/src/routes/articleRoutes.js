const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const { getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
 } = require('../controllers/articleController');

// Rota para obter todos os artigos
router.get('/articles', getAllArticles);

// Retorna um artigo específico pelo ID
router.get('/articles/:id', getArticleById);

// Rota para criar um artigo
router.post('/articles', authMiddleware, createArticle);

// Rota para atualizar um artigo existente
router.put('/articles/:id', authMiddleware, updateArticle);

// Rota para deletar um artigo
router.delete('/articles/:id', authMiddleware, deleteArticle);

module.exports = router;