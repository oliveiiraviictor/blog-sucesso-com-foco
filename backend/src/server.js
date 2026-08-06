const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor local funcionando!' });
});

//Servidor local
app.listen(PORT, () => {
  console.log(`Porta do servidor local ${PORT}`);
});