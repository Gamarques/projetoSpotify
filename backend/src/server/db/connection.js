// // database.js (responsável pela lógica de conexão com o banco de dados)
// import { MongoClient, ServerApiVersion } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();

// const URI = process.env.MONGODB_URI;
// const DB_NAME = process.env.MONGODB_DB_NAME;


// if (!URI || !DB_NAME) {
//   throw new Error('MongoDB URI or DB name is not defined in environment variables');
// }

// const client = new MongoClient(URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// /**
//  * Função que realiza a conexão com o banco de dados MongoDB.
//  * @returns {Promise} Retorna a conexão do banco de dados.
//  */
// export const connectToDatabase = async () => {
//   try {
//     console.log('Connecting to MongoDB...');
//     await client.connect();
//     await client.db(DB_NAME).command({ ping: 1 });
//     console.log('Successfully connected to MongoDB');
//     return client.db(DB_NAME);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw new Error('Failed to connect to the database');
//   }
// };

// /**
//  * Função para fechar a conexão com o MongoDB.
//  */
// export const closeDatabaseConnection = async () => {
//   try {
//     await client.close();
//     console.log('MongoDB connection closed');
//   } catch (error) {
//     console.error('Error closing MongoDB connection:', error);
//   }
// };

// let db = client.db(DB_NAME);
// export default db;

// db/connection.js (responsável pela lógica de conexão com o banco de dados - usando Mongoose)
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME; // Usando MONGODB_URI para string de conexão Mongoose

if (!MONGODB_URI) {
    throw new Error('MongoDB URI is not defined in environment variables');
}

/**
 * Função que realiza a conexão com o banco de dados MongoDB usando Mongoose.
 * @returns {Promise<void>}
 */
export const connectToDatabaseMongoose = async () => {
    try {
        console.log('Connecting to MongoDB with Mongoose...');
        await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME// Use a string de conexão Mongoose
        });
        console.log('Successfully connected to MongoDB with Mongoose!');
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
        throw new Error('Failed to connect to the database using Mongoose');
    }
};

/**
 * Função para fechar a conexão com o MongoDB usando Mongoose.
 * @returns {Promise<void>}
 */
export const closeDatabaseConnectionMongoose = async () => {
    try {
        await mongoose.connection.close(); // Use mongoose.connection.close() para fechar a conexão Mongoose
        console.log('MongoDB connection closed with Mongoose');
    } catch (error) {
        console.error('Error closing MongoDB connection with Mongoose:', error);
    }
};

export default mongoose; // Ainda exporta a instância do Mongoose (opcional, mas pode ser útil)