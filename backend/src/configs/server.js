export default {
    PORT: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    corsOptions: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
};