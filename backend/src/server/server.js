import express from "express";
import cors from "cors";
import mongoose from 'mongoose'; // Mantenha a importação do Mongoose (pode ser necessária em outros lugares do server.js ou para exportar)
import { connectToDatabaseMongoose, closeDatabaseConnectionMongoose } from './db/connection.js'; // Importe as funções de conexão de db/connection.js
import songsRouter from "../routes/songsRoutes.js";
import artistsRouter from "../routes/artistsRoutes.js";
import dotenv from "dotenv";
import Artist from "../models/artists.js";
import Song from "../models/songs.js";
import { populateCache, myCache, invalidateCache, setupModelChangeListener, warmupCache } from './utils/cacheUtils.js';

// import NodeCache from "node-cache";

// const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/songs", songsRouter);
app.use("/artists", artistsRouter);

// Conectar ao MongoDB usando as funções de db/connection.js
(async () => {
    try {
        await connectToDatabaseMongoose(); // Chama a função para conectar (de db/connection.js)
        await warmupCache(); // Chama a função para popular o cache (de server/utils/cacheUtils.js)
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error); // Mensagem genérica, pois db/connection.js já loga detalhes de Mongoose
    }
})();

// Fechar a conexão ao banco quando o servidor for encerrado (usando funções de db/connection.js)
process.on('SIGINT', async () => {
    try {
        await closeDatabaseConnectionMongoose(); // Chama a função para fechar a conexão (de db/connection.js)
    } catch (error) {
        console.error('Erro ao fechar a conexão com o banco de dados:', error); // Mensagem genérica
    }
    process.exit(0);
});

// Em server.js (usando setupModelChangeListener com invalidação granular)
setupModelChangeListener(Artist, 'artists', ['name', 'image', 'banner']); // Para Artists, campos relevantes: name, image, banner
setupModelChangeListener(Song, 'songs', ['name', 'image','artist','duration']); // Para Songs, campos relevantes: name, image (SEM banner)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(process.env.PORT);
});


// export { myCache };