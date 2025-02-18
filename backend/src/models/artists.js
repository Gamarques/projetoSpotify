import { db } from '../configs/connect.js';

const artistsCollection = db.collection("artists");

export const ArtistModel = {
    // Buscar todos os artistas
    findAll: async () => {
        try {
            return await artistsCollection.find({}).toArray();
        } catch (error) {
            throw new Error('Erro ao buscar artistas: ' + error.message);
        }
    },

    // Buscar artista por ID
    findById: async (id) => {
        try {
            return await artistsCollection.findOne({ _id: id });
        } catch (error) {
            throw new Error('Erro ao buscar artista: ' + error.message);
        }
    },

    // Buscar artistas por nome
    findByName: async (name) => {
        try {
            return await artistsCollection.find({ 
                name: { $regex: name, $options: 'i' } 
            }).toArray();
        } catch (error) {
            throw new Error('Erro ao buscar artista por nome: ' + error.message);
        }
    }
};
