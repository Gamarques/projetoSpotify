import NodeCache from 'node-cache';
import Artist from '../../models/artists.js'; // Importe o Model de Artista do arquivo correto
import Song from '../../models/songs.js';     // Importe o Model de Música do arquivo correto

const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

async function warmupCache() {
    console.log('Iniciando warmup do cache...');
    await Promise.all([
        populateCache('artists', Artist),
        populateCache('songs', Song)
    ]);
    console.log('Warmup do cache concluído');
}


async function populateCache(entityName, model, populateOptions = '') {
    const cacheKey = entityName;
    try {
        const items = await model.find().populate(populateOptions); // Busca usando os Models Mongoose
        myCache.set(cacheKey, items);
        console.log(`Cache de ${entityName} populado/atualizado.`);
    } catch (error) {
        console.error(`Erro ao popular/atualizar cache de ${entityName}:`, error);
    }
}

export { populateCache, myCache, warmupCache };