const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

async function authMiddleware (req, res, next) {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Acesso negado, token inválido' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Acesso negado, token inválido ou expirado' });
    }
}

module.exports = authMiddleware;