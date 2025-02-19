import { artistArray } from '../assets/database/artists.js';
import { songsArray } from '../assets/database/songs.js';

// Formatar artistas
const artistasFormatados = artistArray.map(artista => ({
    id: artista._id,
    nome: artista.name,
    genero: artista.genre,
    imagem: artista.imageUrl
}));

// Formatar músicas
const musicasFormatadas = songsArray.map(musica => ({
    id: musica._id,
    titulo: musica.title,
    artista: musica.artist,
    album: musica.album,
    duracao: musica.duration
}));

console.log('Artistas formatados:', artistasFormatados);
console.log('Músicas formatadas:', musicasFormatadas);