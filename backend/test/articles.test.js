const request = require('supertest');
const app = require('../src/server');
const { prisma } = require('../src/prismaClient');

describe("Testing the endpoint /api/articles", () => {

    let token;
    let articleId;
    const userId = 3;
    const categoryId = 4;

    //Executar o login antes de cada teste para obter o token de autenticação
    beforeAll(async () => {
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'victorIa@exemplo.com',
                senha: 'senha123'
            })
        token = loginResponse.body.token;
    });

    //Teste 1 - Get de todos os artigos
    test('Get todos os artigos', async () => {
        const response = await request(app)
            .get('/api/articles')

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    //Teste 2 - Get article pelo ID
    test('Get artigo por ID', async () => {
        const response = await request(app)
            .get('/api/articles/1')

       if (response.status === 200) {
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('titulo');
       } else if (response.status === 404) {
            expect(response.body.error).toBeDefined();
       }
    });

    //Teste 3 - Criando novo artigo
    test('Criar um novo artigo', async () => {
        const articleData = {
            titulo: 'Artigo de Teste',
            conteudo: 'Conteúdo do artigo de teste',
            imagemCapa: 'https://example.com/imagem.jpg',
            autorId: userId,
            categoriaId: categoryId
        }

        const response = await request(app)
            .post('/api/articles')
            .set('Authorization', `Bearer ${token}`)
            .send(articleData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toBe(articleData.titulo);
        expect(response.body.conteudo).toBe(articleData.conteudo);
        expect(response.body.imagemCapa).toBe(articleData.imagemCapa);
        expect(response.body.status).toBe('rascunho');

        articleId = response.body.id; // Armazenar o ID do artigo criado para testes futuros 

    });

    //Teste 4 - Atualizando um artigo existente
    test('Atualizar um artigo existente', async () => {
        const updatedArticleData = {
            titulo: 'Artigo de Teste Atualizado',
            conteudo: 'Conteúdo atualizado do artigo de teste',
            imagemCapa: 'https://example.com/imagem_atualizada.jpg',
            status: 'publicado',
            autorId: userId,
            categoriaId: categoryId
        };

        const response = await request(app)
            .put(`/api/articles/${articleId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedArticleData)

        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe(updatedArticleData.titulo);
        expect(response.body.status).toBe('publicado');
    });

    //Teste 5 - Deletando um artigo existente ------
    test('Deletar um article', async () => {
        const response = await request(app)
            .delete(`/api/articles/${articleId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Artigo deletado com sucesso');
    });

    //Teste 6 - Criando article sem TOKEN
    test('Criar um article sem TOken, deve retornar um error', async () => {
        const articleData = {
            titulo: 'Artigo de Teste',
            conteudo: 'Conteúdo do artigo de teste',
            imagemCapa: 'https://example.com/imagem.jpg',
            autorId: userId,
            categoriaId: categoryId
        };

        const response = await request(app)
            .post(`/api/articles`)
            .send(articleData)

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });

    //Teste 7 - Atualizando article sem TOKEN
    test('Deve retornar um erro ao atualiza TOKEN', async () => {
        const updateArticleData = {
            titulo: 'Artigo de Teste Atualizado',
            conteudo: 'Conteúdo atualizado do artigo de teste',
            imagemCapa: 'https://example.com/imagem_atualizada.jpg',
            status: 'publicado',
            autorId: userId,
            categoriaId: categoryId
        };

        const response = await request(app)
            .put(`/api/articles/${articleId}`)
            .send(updateArticleData)

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });

    //Teste 8 - Deletando article sem TOKEN
    test('Deve retorna um erro ao deletar o article', async () => {
        const response = await request(app)
            .delete(`/api/articles/${articleId}`)

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });

    //Teste 9 - Criando post com campos faltando
    test('Deve falhar pois vai haver campos vazios', async () => {
        const articleData = {
            titulo: 'Artigo de Teste Atualizado',
            userId: userId,
        };

        const response = await request(app)
            .post(`/api/articles`)
            .set('Authorization', `Bearer ${token}`)
            .send(articleData)

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

});

afterAll(async () => {
  await prisma.$disconnect();
});