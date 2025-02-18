// import express from 'express';
// import { db } from '../configs/connect.js';

// const router = express.Router();

// // GET /songs - Buscar todas as músicas
// router.get('/', async (req, res) => {
//     try {
//         const songsCollection = db.collection("songs2");
//         const songs = await songsCollection.find({}).toArray();
//         res.json(songs);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao buscar músicas" });
//     }
// });

// // GET /songs/:id - Buscar uma música específica
// router.get('/:id', async (req, res) => {
//     try {
//         const songsCollection = db.collection("songs2");
//         const song = await songsCollection.findOne({ _id: req.params.id });
        
//         if (!song) {
//             return res.status(404).json({ error: "Música não encontrada" });
//         }
        
//         res.json(song);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao buscar música" });
//     }
// });

// // GET /songs/artist/:artistId - Buscar músicas por artista
// router.get('/artist/:artistId', async (req, res) => {
//     try {
//         const songsCollection = db.collection("songs2");
//         const songs = await songsCollection.find({ 
//             artistId: req.params.artistId 
//         }).toArray();
        
//         res.json(songs);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao buscar músicas do artista" });
//     }
// });

// export default router;

import express from 'express';
import { SongModel } from '../models/songs.js';
import validateId from '../middlewares/validateId.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const songs = await SongModel.findAll();
        res.json(songs);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const song = await SongModel.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: "Música não encontrada" });
        }
        res.json(song);
    } catch (error) {
        next(error);
    }
});

router.get('/artist/:artistId', async (req, res, next) => {
    try {
        const songs = await SongModel.findByArtistId(req.params.artistId);
        res.json(songs);
    } catch (error) {
        next(error);
    }
});

export default router;



