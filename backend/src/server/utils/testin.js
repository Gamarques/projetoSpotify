import NodeCache from 'node-cache';
import Artist from '../models/Artist.js'; // Importe o Model de Artista do arquivo correto
import Song from '../models/Song.js';     // Importe o Model de Música do arquivo correto

const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

async function populateCache(entityName, model, populateOptions = '') {
    const cacheKey = entityName;
    try {
        console.log(`Populando/atualizando cache de ${entityName}...`);
        const items = await model.find().populate(populateOptions); // Busca usando os Models Mongoose
        myCache.set(cacheKey, items);
        console.log(`Cache de ${entityName} populado/atualizado.`);
    } catch (error) {
        console.error(`Erro ao popular/atualizar cache de ${entityName}:`, error);
    }
}

export { populateCache, myCache };