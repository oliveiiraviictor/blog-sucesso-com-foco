const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importar rotas
const articleRoutes = require('./routes/articleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor rodando!' });
});

// Rotas da API
app.use('/api', articleRoutes);
app.use('/api', categoryRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});