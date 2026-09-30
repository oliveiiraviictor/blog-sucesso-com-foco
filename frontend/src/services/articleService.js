import api from './api';

const articleService = {
    
    getAll: async () => {
        const response = await api.get('/articles');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/articles/${id}`);
        return response.data;
    },

    create: async (titulo, conteudo, imagemCapa, autorId, categoriaId, descricao, tempoDeLeitura) => {
        const response = await api.post('/articles', {
            titulo,
            conteudo,
            imagemCapa,
            autorId,
            categoriaId,
            descricao,
            tempoDeLeitura
        });
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/articles/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/articles/${id}`);
        return response.data;
    }
};

export default articleService;