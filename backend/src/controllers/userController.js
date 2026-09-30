const bcrypt = require('bcryptjs');
const { prisma } = require('../prismaClient');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { nome, email, senha } = req.body;

        if( !nome || !email || !senha ) {
            return res.status(400).json({ error: 'Verifique os campos em branco' });
        }

        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (existingEmail) {
            return res.status(400).json({ error: 'Email já cadastrado no sistema, clique para recuperar a senha' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await prisma.user.create({
            data: {
                nome,
                email,
                senha: hashedPassword
            }
        });

        return res.status(201).json({
            message: 'Usuário registrado com sucesso',
            user: {
                id: newUser.id,
                nome: newUser.nome,
                email: newUser.email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao registrar usuário no sistema, por favor tentar novamente mais tarde.' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Verifique os campos em branco' });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ error: 'Email não cadastrado no sistema, clique para registrar-se.' });
        }

        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            return res.status(400).json({ error: 'Senha incorreta, por favor tente novamente ou clique para recuperar a senha.' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        return res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao realizar login no sistema, por favor tentar novamente mais tarde.' });
    }
}

module.exports = {
    registerUser,
    loginUser
};