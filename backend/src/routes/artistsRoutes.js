import express from 'express';
import { db } from '../configs/connect.js';

const router = express.Router();

// GET /artists - Buscar todos os artistas
router.get('/', async (req, res) => {
    try {
        const artistsCollection = db.collection("artists");
        const artists = await artistsCollection.find({}).toArray();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar artistas" });
    }
});

// GET /artists/:id - Buscar um artista específico
router.get('/:id', async (req, res) => {
    try {
        const artistsCollection = db.collection("artists");
        const artist = await artistsCollection.findOne({ _id: req.params.id });
        
        if (!artist) {
            return res.status(404).json({ error: "Artista não encontrado" });
        }
        
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar artista" });
    }
});

export default router;

