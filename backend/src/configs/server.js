import 'dotenv/config';

const server = {
    PORT: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
    corsOptions: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB_NAME
    }
};

export default server;