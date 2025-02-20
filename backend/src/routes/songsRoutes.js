import express from 'express';
import db from '../server/db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Defina as rotas para a entidade "songs"
router.get('/', async (req, res) => {
  // Lógica para obter todas as músicas
  let collection = await db.collection('songs2');
  let results = await collection.find({}).toArray();
    res.json(results);
});

export default router;
