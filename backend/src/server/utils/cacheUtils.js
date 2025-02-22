import NodeCache from 'node-cache';
import Artist from '../../models/artists.js';
import Song from '../../models/songs.js';

const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// *** DEFINA UM OBJETO (MAP) FORA DA FUNÇÃO populateCache ***
const cacheKeyMap = {
    'artists': 'artists_list',
    'songs': 'songs_list'
};

async function warmupCache() {
    console.log('Iniciando warmup do cache (função warmupCache dentro de cacheUtils.js)...');
    console.log('Warmup do cache...');
    await Promise.all([
        populateCache('artists', Artist),
        populateCache('songs', Song)
    ]);
    console.log('Warmup do cache concluído');
}

async function populateCache(entityName, model, populateOptions = '') {
    // *** USE O OBJETO cacheKeyMap PARA OBTER A CHAVE DE CACHE DINAMICAMENTE ***
    const cacheKey = cacheKeyMap[entityName] || entityName; // Tenta obter do mapa, senão usa entityName como fallback

    try {
        console.log(`populateCache: Buscando dados de ${entityName} do banco de dados (cacheKey: ${cacheKey})...`);
        const items = await model.find().populate(populateOptions);
        console.log(`populateCache: Dados de ${entityName} obtidos do banco de dados (cacheKey: ${cacheKey}, primeiros 2 itens):`, items.slice(0, 2).map(item => ({ _id: item._id, name: item.name })));
        myCache.set(cacheKey, items);
        console.log(`populateCache: Cache de ${entityName} populado/atualizado (cacheKey: ${cacheKey}).`);
        return items;
    } catch (error) {
        console.error(`Erro ao popular/atualizar cache de ${entityName} (cacheKey: ${cacheKey}):`, error);
        return undefined;
    }
}

function invalidateCache(cacheKey) {
    console.log(`Invalidando cache para a chave: ${cacheKey}`);
    myCache.del(cacheKey);
    console.log(`Cache invalidado para a chave: ${cacheKey}`);
    console.log(`Verificando se cache ainda existe após deletar (deve ser undefined):`, myCache.get(cacheKey));
}

function setupModelChangeListener(model, cacheKeyPrefix) {
    model.watch().on('change', change => {
        const operationType = change.operationType;
        const updatedFields = change.updateDescription?.updatedFields;
        const removedFields = change.updateDescription?.removedFields;
        const documentId = change.documentKey?._id;

        console.log(`Mudança detectada na coleção ${model.modelName}:`, operationType, documentId, updatedFields || removedFields || '');

        switch (operationType) {
            case 'update':
                if (updatedFields) {
                    const updatedFieldNames = Object.keys(updatedFields);
                    if (updatedFieldNames.includes('name') || updatedFieldNames.includes('image') || updatedFields.includes('banner')) {
                        invalidateCache(cacheKeyPrefix + '_list');
                        console.log(`  -> Campos relevantes para listagem de artistas alterados, invalidando cache de listagem de artistas.`);
                    }
                    if (documentId) {
                        invalidateCache(cacheKeyPrefix + '_detail_' + documentId);
                        console.log(`  -> Invalida cache de detalhes do artista: ${documentId}`);
                    }
                }
                break;

            case 'insert':
            case 'delete':
            case 'replace':
                invalidateCache(cacheKeyPrefix + '_list');
                console.log(`  -> Operação ${operationType} pode afetar listagem de artistas, invalidando cache de listagem de artistas.`);
                if (documentId && operationType === 'delete') {
                    invalidateCache(cacheKeyPrefix + '_detail_' + documentId);
                    console.log(`  -> Invalida cache de detalhes do artista (para delete): ${documentId}`);
                }
                break;

            default:
                console.log(`  -> Operação ${operationType} não tratada especificamente para invalidação granular.`);
        }
    })
        .on('error', error => {
            console.error(`Erro no Change Stream para Model ${model.modelName} (cacheKey prefix: ${cacheKeyPrefix}):`, error);
            // Lógica de tratamento de erro mais robusta pode ser adicionada aqui, se necessário
        });

    console.log(`Change Stream (granular invalidation) configurado para o model ${model.modelName} (cacheKey prefix: ${cacheKeyPrefix})`);
}

export { populateCache, myCache, warmupCache, invalidateCache, setupModelChangeListener };