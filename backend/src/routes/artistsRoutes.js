import express from 'express';
import { myCache, populateCache } from '../server/utils/cacheUtils.js'; // Importe populateCache e myCache
import Artist from '../models/artists.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const cacheKey = 'artists';
    let cachedArtists = myCache.get(cacheKey);

    if (!cachedArtists) { // Se NÃO estiver no cache, popula
        console.log('Dados de artistas não encontrados no cache, populando...');
        await populateCache('artists', Artist); // Usa a função genérica para popular
        cachedArtists = myCache.get(cacheKey); // Obtém do cache *agora* populado
    } else {
        console.log('Dados de artistas obtidos do cache.');
    }

    if (cachedArtists) {
        return res.json(cachedArtists);
    } else { // Se por algum motivo AINDA não houver dados (improvável), trate o erro
        console.error("Erro ao obter artistas do cache ou banco de dados.");
        return res.status(500).json({ error: 'Failed to fetch artists' }); // Ou outro tratamento de erro
    }
});

export default router;