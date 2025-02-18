import axios from 'axios';

const api = {
    // Buscar artistas
    getArtists: async () => {
        const response = await axios.get('/api/artists');
        return response.data;
    },

    // Buscar músicas
    getSongs: async () => {
        const response = await axios.get('/api/songs');
        return response.data;
    }
};

export default api; 