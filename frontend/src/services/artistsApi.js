import api from './api';


export const getArtists = async () => {
  try {
    const response = await apiClient.get('/artists'); // Usa async/await
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArtistsById = async (id) => {
  try {
    const response = await api.get(`/artists/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar artista com ID ${id}`);
  }
}

export const create = async (songData) => {
  try {
    const response = await api.post('/artists', songData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar artista');
  }
}