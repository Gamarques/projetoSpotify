import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

const api = {
    getArtists: async () => {
        try {
            const response = await axiosInstance.get('/api/artists');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar artistas:', error);
            throw error;
        }
    },

    getSongs: async () => {
        try {
            const response = await axiosInstance.get('/api/songs');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar músicas:', error);
            throw error;
        }
    },

    updateArtistsAndSongs: async (artists, songs) => {
        const uniqueArtists = [];
        const uniqueSongs = [];

        artists.forEach(artist => {
            if (!uniqueArtists.some(existingArtist => existingArtist._id === artist._id)) {
                uniqueArtists.push(artist);
            }
        });

        songs.forEach(song => {
            if (!uniqueSongs.some(existingSong => existingSong._id === song._id)) {
                uniqueSongs.push(song);
            }
        });

        return { uniqueArtists, uniqueSongs };
    }
};

export default api;