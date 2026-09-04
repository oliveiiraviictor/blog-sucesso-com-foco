import api from './api';

const authService = {

    register: async (nome, email, senha) => {
        const response = await api.post('/users/register', { 
            nome, 
            email, 
            senha 
        });
        return response.data;
    },

    login: async (email, senha) => {
        const response = await api.post('/users/login', {
            email,
            senha
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: () => localStorage.getItem('token'),

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default authService;