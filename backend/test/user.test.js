const request = require('supertest');
const app = require('../src/server');

describe ('Testing the /api/users endpoint', () => {

    //Criar um email aleatório para cada teste
    const randomEmail = `testuser_${Math.floor(Math.random() * 10000)}@example.com`;

    //Testing 1 - Create User
    test('Deve registrar um usuário com sucesso', async () => {
        const userData = {
            nome: 'Victor Testing',
            email: randomEmail,
            senha: 'testpassword'
        };

        //Executar o teste
        const response = await request(app)
            .post('/api/users/register')
            .send(userData);

        //Verificar os status de retorno
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário registrado com sucesso');
        expect(response.body.user.nome).toBe("Victor Testing");
        expect(response.body.user.email).toBe(randomEmail);
    });

    //Testing 2 - Login USer
    test('Deve autenticar um usuário com sucesso', async () => {
        const loginData = {
            email: randomEmail,
            senha: 'testpassword'
        };

        //Executar o teste
        const response = await request(app)
            .post('/api/users/login')
            .send(loginData);

        //Verificar os status de retorno
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login realizado com sucesso');
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe(randomEmail);
    });

    //Testing 3 - Login com email ou senha incorreta
    test('Deve falhar ao autenticar um usuário com email ou senha incorreta', async () => {
        const loginData = {
            email: randomEmail,
            senha: 'wrongPass'
        };

        //Executar o teste
        const response = await request(app)
            .post('/api/users/login')
            .send(loginData);

        //Verificar os status de retorno
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    //Testing 4 - Register with existing email
    test('Deve falhar ao registrar um usuário com email já existente', async () => {
        const userData = {
            nome: 'Victor Testing',
            email: randomEmail,
            senha: 'testpassword'
        };

        //Executar o teste
        const response = await request(app)
            .post('/api/users/register')
            .send(userData);

        //Verificar os status de retorno
        expect(response.status).toBe(400);
        expect(response.body.error).toContain('Email já cadastrado');
    });

});

afterAll(async () => {
  const { prisma } = require('../src/prismaClient');
  await prisma.$disconnect();
});