import express from 'express';
import db from '../server/db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Defina as rotas para a entidade "songs"
router.get('/', async (req, res) => {
  try {
    // Lógica para obter todas as músicas
    let collection = await db.collection('songs2');
    let results = await collection.find({}).toArray();
    
    // // Adicione um console.log para verificar os resultados
    // console.log("Músicas recuperadas do banco de dados:", results);
    
    res.json(results);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

export default router;
