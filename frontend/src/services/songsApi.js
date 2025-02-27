import api from './api';

export const getSongs = async () => {
  try {
    // Corrigido de apiClient para api
    const response = await api.get('/songs');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar música');
  }
};

export const getSongsById = async (id) => {
  try {
    const response = await api.get(`/songs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar música com ID ${id}`);
  }
}

export const create = async (songData) => {
  try {
    const response = await api.post('/songs', songData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar música');
  }
}