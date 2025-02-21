import express from 'express';
import { myCache } from '../server/server.js';
import Song from '../models/songs.js' // Importe o Model Song

const router = express.Router();

router.get('/', async (req, res) => {
    const cacheKey = 'songs';
    let cachedSongs = myCache.get(cacheKey);

    if (cachedSongs) {
        console.log('Dados de músicas obtidos do cache (compartilhado - server.js)');
        return res.json(cachedSongs);
    }

    try {
        console.log('Dados de músicas não encontrados no cache (compartilhado - server.js), buscando no banco de dados...');
        // Use o Model Song.find() para buscar músicas
        const songs = await Song.find().populate('artist'); // Exemplo com populate para trazer dados do artista
        myCache.set(cacheKey, songs);
        console.log('Dados de músicas armazenados no cache (compartilhado - server.js)');
        res.json(songs);
    } catch (error) {
        console.error("Erro ao buscar músicas:", error);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});

export default router;