const express = require('express');
const router = express.Router();
const { getAllArticles } = require('../controllers/articleController');

// Rota para obter todos os artigos
router.get('/articles', getAllArticles);

module.exports = router;