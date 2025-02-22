// import mongoose from 'mongoose';
// import Artist from '../models/artists.js';
// import dotenv from 'dotenv';

// dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

// const artistasIniciais = [
//     {
//         name: "Artista 1",
//         image: "https://exemplo.com/imagem1.jpg",
//         banner: "https://exemplo.com/banner1.jpg"
//     },
//     {
//         name: "Artista 2",
//         image: "https://exemplo.com/imagem2.jpg",
//         banner: "https://exemplo.com/banner2.jpg"
//     }
// ];

// async function popularBanco() {
//     try {
//         await mongoose.connect(MONGODB_URI, {
//             dbName: MONGODB_DB_NAME,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
        
//         // Limpar coleção existente
//         await Artist.deleteMany({});
        
//         // Inserir novos documentos
//         const resultado = await Artist.insertMany(artistasIniciais);
        
//         console.log('Artistas inseridos:', resultado);
//         process.exit(0);
//     } catch (error) {
//         console.error('Erro:', error);
//         process.exit(1);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// popularBanco();