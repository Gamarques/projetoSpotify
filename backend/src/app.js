import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import server from "./configs/server.js";   
import requestLogger from "./middlewares/requestLogger.js"; 
import errorHandler from "./middlewares/errorHandler.js";

const createApp = () => {
    const app = express();

    // Configuração dos middlewares globais
    app.use(cors(server.corsOptions));
    app.use(express.json());
    app.use(requestLogger);

    // Configuração das rotas
    app.use('/api', routes);

    // Middleware de tratamento de erros
    app.use(errorHandler);

    return app;
};

export default createApp;
