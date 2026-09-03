const request = require('supertest');
const app = require('../src/server');
const { prisma } = require('../src/prismaClient');

describe('Testing the endpoint /api/categories', () => {

    let token;
    let categoryId;

    //Executar o login antes de cada teste para obter o token de autenticação
    beforeAll(async () => {
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'victorIa@exemplo.com',
                senha: 'senha123'
            });

            token = loginResponse.body.token;
    });

    //Teste 1 - Get de todas as categorias
    test('Find all categories', async () => {

        const response = await request(app)
            .get('/api/categories');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    })

    //Teste 2 - Get category pelo ID
    test('Find category by ID', async () => {

        const response = await request(app)
            .get('/api/categories/2');

        if (response.status === 200) {
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('nome');
        } else if (response.status === 404) {
            expect(response.body.error).toBeDefined();
        }
    });

    //Teste 3 - Criando nova categoria
    test('Create a new category', async () => {
        const categoryData = {
            nome: `Categoria_Teste_${Date.now()}`,
            descricao: 'Conteúdo da categoria de teste'
        }

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send(categoryData);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nome', categoryData.nome);
        expect(response.body).toHaveProperty('descricao', categoryData.descricao);

        categoryId = response.body.id; // Armazena o ID da categoria criada
        console.log(`Categoria criada com sucesso. ID: ${categoryId}`);
        
    });

    //Teste 4 - Update da categoria criada
    test('Update category by ID', async () => {
        const updatedCategoryData = {
            nome: `Categoria_Atualizada_${Date.now()} - Update`,
            descricao: 'Conteúdo atualizado da categoria de teste'
        }

        const response = await request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedCategoryData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', categoryId);
        expect(response.body).toHaveProperty('nome', updatedCategoryData.nome);
    });

    //Teste 5 - Delete da categoria criada
    test('Delete category by ID', async () => {
        const response = await request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Categoria foi excluida com sucesso');
    });

    //Teste 6 - Criando uma categoria s/Token
    test('Create a new category without token', async () => {
        const categoryData = {
            nome: `Categoria_Teste_${Date.now()}`,
            descricao: 'Conteúdo da categoria de teste'
        }

        const response = await request(app)
            .post('/api/categories')
            .send(categoryData);
        
        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    })

    //Teste 7 - Update de categoria s/Token
    test('Update category by ID without token', async () => {
        const updatedCategoryData = {
            nome: `Categoria_Atualizada_${Date.now()} - Update`,
            descricao: 'Conteúdo atualizado da categoria de teste'
        }

        const response = await request(app)
            .put(`/api/categories/${categoryId}`)
            .send(updatedCategoryData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    
    });

    //Teste 8 - Delete de categoria s/Token
    test('Delete category by ID without token', async () => {
        const response = await request(app)
            .delete(`/api/categories/${categoryId}`)

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });

    //Teste 9 - Testando a criação de categoria sem campos obrigatórios
    test('Create a new category without required fields', async () => {
        const categoryData = {
            descricao: 'Conteúdo da categoria de teste'
        }

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send(categoryData);
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

});

afterAll(async () => {
  await prisma.$disconnect();
});