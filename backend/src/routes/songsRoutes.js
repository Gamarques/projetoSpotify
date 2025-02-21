import express from 'express';
import { myCache, populateCache } from '../server/utils/cacheUtils.js' // Ajuste o caminho se necessário
import Song from '../models/songs.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const cacheKey = 'songs';
    let cachedSongs = myCache.get(cacheKey);

    if (!cachedSongs) { // Se NÃO estiver no cache, popula
        console.log('Dados de musicas não encontrados no cache, populando...');
        await populateCache('songs', Song, 'Artist'); // <--- ADICIONADO populateOptions: 'artist'
        cachedSongs = myCache.get(cacheKey); // Obtém do cache *agora* populado
    } else {
        console.log('Dados de musicas obtidos do cache.');
    }

    if (cachedSongs) {
        return res.json(cachedSongs);
    } else { // Se por algum motivo AINDA não houver dados (improvável), trate o erro
        console.error("Erro ao obter musicas do cache ou banco de dados.");
        return res.status(500).json({ error: 'Failed to fetch songs' }); // Ou outro tratamento de erro
    }
});

export default router;