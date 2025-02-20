import express from "express"; 
import cors from "cors";
import { connectToDatabase, closeDatabaseConnection } from "./db/connection.js";
import songsRouter from "../routes/songsRoutes.js";
import artistsRouter from "../routes/artistsRoutes.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../../config.env" }); // Load environment variables from a .env file into process.env

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

let db;
(async () => {
    try {
        db = await connectToDatabase();
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
})();

// Fechar a conexão ao banco quando o servidor for encerrado (como no SIGINT)
process.on('SIGINT', async () => {
    if (db) {
        await closeDatabaseConnection();
    }
    console.log('Conexão com o banco de dados fechada. Servidor encerrado.');
    process.exit(0); // Finaliza o processo
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(process.env.PORT);
});
