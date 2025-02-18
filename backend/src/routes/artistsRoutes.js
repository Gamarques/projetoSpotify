import express from 'express';
import { ArtistModel } from '../models/artists.js';
import validateId from '../middlewares/validateId.js';

const router = express.Router();

// GET /api/artists
router.get('/', async (req, res, next) => {
    try {
        const artists = await ArtistModel.findAll();
        res.json(artists);
    } catch (error) {
        next(error);
    }
});

// GET /api/artists/:id
router.get('/:id', validateId, async (req, res, next) => {
    try {
        const artist = await ArtistModel.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: "Artista não encontrado" });
        }
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

export default router;

