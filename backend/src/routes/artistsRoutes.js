import express from 'express';
import { myCache } from '../server/server.js'; // Importe o cache compartilhado
import Artist from '../models/artists.js'; // Importe o Model Artist

const router = express.Router();

router.get('/', async (req, res) => {
    const cacheKey = 'artists';
    let cachedArtists = myCache.get(cacheKey);

    if (cachedArtists) {
        console.log('Dados de artistas obtidos do cache (compartilhado - server.js)');
        return res.json(cachedArtists);
    }

    try {
        console.log('Dados de artistas não encontrados no cache (compartilhado - server.js), buscando no banco de dados...');
        // Use o Model Artist.find() para buscar artistas
        const artists = await Artist.find();
        myCache.set(cacheKey, artists);
        console.log('Dados de artistas armazenados no cache (compartilhado - server.js)');
        res.json(artists);
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        res.status(500).json({ error: 'Failed to fetch artists' });
    }
});

export default router;