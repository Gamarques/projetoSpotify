import mongoose from 'mongoose';
// Importa o pacote Mongoose
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false // Opcional, você pode mudar para true se for obrigatório
  },
  duration: {
    type: Number,
    required: true
  },
  artist: {  // Mudado de artists (array) para artist (singular)
    type: String, //se quiser que referecia e funcione como FK, mude para objectID no banco de dados e acione o tipo --> aqi Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  duration: {
    type: String,
    required: true
  }
}, {
  collection: 'songs2' // Especifica o nome da collection no MongoDB
});

const Song = mongoose.model('Song', songSchema, "songs2"); // Cria um model chamado 'Song' baseado no schema

export default Song;