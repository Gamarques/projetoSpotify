import connect from "./configs/connect.js";
import createApp from "./app.js";
import server from "./configs/server.js";

async function startServer() {
    try {
        // Conecta ao banco de dados
        await connect();

        // Cria a aplicação
        const app = createApp();

        // Inicia o servidor
        app.listen(server.PORT, () => {
            console.log(`Servidor rodando na porta ${server.PORT}`);
            console.log(`Ambiente: ${server.env}`);
            console.log(`Frontend URL: ${server.corsOptions.origin}`);
        });

    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
        process.exit(1);
    }
}

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
    console.error('Erro não tratado:', error);
    process.exit(1);
});

startServer();
