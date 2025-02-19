import api from './api.js';

async function fetchAndUpdateData() {
    try {
        const artists = await api.getArtists();
        const songs = await api.getSongs();
        await api.updateArtistsAndSongs(artists, songs);
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
    }
}

// Chamar a função para buscar e atualizar os dados
fetchAndUpdateData();