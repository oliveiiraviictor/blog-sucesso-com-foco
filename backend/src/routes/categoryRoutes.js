const express = require('express');
const router = express.Router();

const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// Rota para obter todas as categorias
router.get('/categories', getAllCategories);

// Rota para obter uma categoria específica pelo ID
router.get('/categories/:id', getCategoryById);

// Rota para criar uma nova categoria
router.post('/categories', createCategory);

// Rota para atualizar uma categoria existente
router.put('/categories/:id', updateCategory);

// Rota para deletar uma categoria existente
router.delete('/categories/:id', deleteCategory);

module.exports = router;