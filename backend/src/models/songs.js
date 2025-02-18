import { db } from '../configs/connect.js';

const songsCollection = db.collection("songs2");

export const SongModel = {
    // Buscar todas as músicas
    findAll: async () => {
        try {
            return await songsCollection.find({}).toArray();
        } catch (error) {
            throw new Error('Erro ao buscar músicas: ' + error.message);
        }
    },

    // Buscar música por ID
    findById: async (id) => {
        try {
            return await songsCollection.findOne({ _id: id });
        } catch (error) {
            throw new Error('Erro ao buscar música: ' + error.message);
        }
    },

    // Buscar músicas por artista
    findByArtist: async (artistId) => {
        try {
            return await songsCollection.find({ artistId }).toArray();
        } catch (error) {
            throw new Error('Erro ao buscar músicas do artista: ' + error.message);
        }
    },

    // Buscar músicas por nome
    findByName: async (name) => {
        try {
            return await songsCollection.find({ 
                name: { $regex: name, $options: 'i' } 
            }).toArray();
        } catch (error) {
            throw new Error('Erro ao buscar música por nome: ' + error.message);
        }
    }
};
