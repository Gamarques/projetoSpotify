import express from 'express';
import db from '../server/db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Defina as rotas para a entidade "artists"
router.get('/', async (req, res) => {
  try {
    // Lógica para obter todas as músicas
    let collection = await db.collection('artists');
    let results = await collection.find({}).toArray();
    
    // Adicione um console.log para verificar os resultados
    console.log("artistas recuperados do banco de dados:", results);
    
    res.json(results);
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

export default router;
