import express from 'express';
import artistsRoutes from './artistsRoutes.js';
import songsRoutes from './songsRoutes.js';

const router = express.Router();

// Agrupa as rotas por recurso
router.use('/artists', artistsRoutes);
router.use('/songs', songsRoutes);

export default router;
