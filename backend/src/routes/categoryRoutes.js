const express = require('express');
const router = express.Router();

const {
    getAllCategories,
    getCategoryById,
    createCategory
} = require('../controllers/categoryController');

// Rota para obter todas as categorias
router.get('/categories', getAllCategories);

// Rota para obter uma categoria específica pelo ID
router.get('/categories/:id', getCategoryById);

router.post('/categories', createCategory);

module.exports = router;