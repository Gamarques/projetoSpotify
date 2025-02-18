import express from 'express';
import { db } from '../configs/connect.js';

const router = express.Router();

// GET /songs - Buscar todas as músicas
router.get('/', async (req, res) => {
    try {
        const songsCollection = db.collection("songs2");
        const songs = await songsCollection.find({}).toArray();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar músicas" });
    }
});

// GET /songs/:id - Buscar uma música específica
router.get('/:id', async (req, res) => {
    try {
        const songsCollection = db.collection("songs2");
        const song = await songsCollection.findOne({ _id: req.params.id });
        
        if (!song) {
            return res.status(404).json({ error: "Música não encontrada" });
        }
        
        res.json(song);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar música" });
    }
});

// GET /songs/artist/:artistId - Buscar músicas por artista
router.get('/artist/:artistId', async (req, res) => {
    try {
        const songsCollection = db.collection("songs2");
        const songs = await songsCollection.find({ 
            artistId: req.params.artistId 
        }).toArray();
        
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar músicas do artista" });
    }
});

export default router;

