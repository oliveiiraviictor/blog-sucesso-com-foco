require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'sua_chave_secreta_de_seguranca',
    JWT_EXPIRY: '1h' // Tempo de expiração do token JWT (1 dia)
}