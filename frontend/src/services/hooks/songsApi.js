import api from '../api';

export const songsApi = {
  async getAll() {
    try {
      const response = await api.get('/songs');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar músicas');
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/songs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar música com ID ${id}`);
    }
  },

  async create(songData) {
    try {
      const response = await api.post('/songs', songData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar música');
    }
  }
};