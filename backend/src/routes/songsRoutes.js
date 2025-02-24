import express from 'express';
import { myCache, populateCache } from '../server/utils/cacheUtils.js'
import Song from '../models/songs.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const cacheKey = 'songs_list'; // Use a chave 'songs_list' para consistência com cacheUtils
    console.log(`songsRoutes.js: Rota GET /songs iniciada, cacheKey = ${cacheKey}`); // LOG: Rota iniciada
    let cachedSongs = myCache.get(cacheKey);
    console.log(`songsRoutes.js: Obtendo dados do cache para chave ${cacheKey}...`); // LOG: Antes de obter do cache

    if (!cachedSongs) {
        console.log('songsRoutes.js: Dados de musicas NÃO encontrados no cache, populando...'); // LOG: Cache miss
        try {
            console.log('songsRoutes.js: Chamando populateCache para songs...'); // LOG: Antes de populateCache
            await populateCache('songs', Song, 'artist'); // Mantenha 'artist' como populateOptions (ou ajuste se necessário)
            console.log('songsRoutes.js: populateCache para songs completado.'); // LOG: Depois de populateCache
            cachedSongs = myCache.get(cacheKey); // Obtém do cache *agora* populado
            console.log(`songsRoutes.js: Dados obtidos do cache APÓS repopulação, chave ${cacheKey}:`, cachedSongs ? 'Dados obtidos' : 'Dados AINDA ausentes do cache!'); // LOG: Após obter do cache repopulado
        } catch (populateError) {
            console.error('songsRoutes.js: Erro durante populateCache:', populateError); // LOG: Erro em populateCache
            return res.status(500).json({ error: 'Erro ao popular cache de músicas' }); // Retorna erro específico de populateCache
        }
    } else {
        console.log('songsRoutes.js: Dados de musicas obtidos do cache.'); // LOG: Cache hit
    }

    console.log('songsRoutes.js: Verificando se cachedSongs tem dados...'); // LOG: Antes de verificar cachedSongs
    if (cachedSongs) {
        console.log('songsRoutes.js: cachedSongs tem dados, retornando resposta JSON.'); // LOG: Dados encontrados, vai retornar
        return res.json(cachedSongs);
    } else {
        console.error("songsRoutes.js: Erro ao obter musicas do cache ou banco de dados. cachedSongs é undefined/null APÓS tentativa de obter do cache."); // LOG: Erro - cachedSongs ainda vazio
        return res.status(500).json({ error: 'Falha ao buscar músicas' }); // Retorna erro genérico
    }
});

export default router;