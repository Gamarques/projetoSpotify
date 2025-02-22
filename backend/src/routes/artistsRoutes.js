import express from 'express';
import { myCache } from '../server/utils/cacheUtils.js';   // Importe o cache compartilhado
import Artist from '../models/artists.js'; // Importe o Model Artist

const router = express.Router();

router.get('/', async (req, res) => {
    const cacheKey = 'artists_list'; // CHAVE DE CACHE CORRIGIDA!
    let cachedArtists = myCache.get(cacheKey);

    if (cachedArtists) {
        console.log('Dados de artistas obtidos do cache (artistsRoute.js)'); // LOG CORRIGIDO!
        return res.json(cachedArtists);
    }

    try {
        console.log('Cache miss para artistas (artistsRoute.js), buscando no banco de dados...'); // LOG CORRIGIDO!
        const artists = await Artist.find();
        myCache.set(cacheKey, artists);
        console.log('Dados de artistas armazenados no cache (artistsRoute.js)'); // LOG CORRIGIDO!
        res.json(artists);
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        res.status(500).json({ error: 'Failed to fetch artists' });
    }
});

export default router;