//Criada para colocar o Token no Header das requisições para a API

import axios from 'axios';

const CONT_API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: CONT_API_URL
})

api.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)

);

export default api;