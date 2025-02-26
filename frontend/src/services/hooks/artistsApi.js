import api from '../api';

export const artistApi = {
    async getAll() {
        try {
            const response = await api.get('/artists');
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar artistas:', error);
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/artists/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar artista:', error);
        }
    },

    async create(artist) {
        try {
            const response = await api.post('/artists', artist);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao criar artista:', error);
        }
    }

};
