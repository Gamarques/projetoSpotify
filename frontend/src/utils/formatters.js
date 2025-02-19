export const formatarArtistas = (artistas) => {
    return artistas.map(artista => ({
        id: artista._id,
        nome: artista.name,
        genero: artista.genre,
        imagem: artista.imageUrl
    }));
};

export const formatarMusicas = (musicas) => {
    return musicas.map(musica => ({
        id: musica._id,
        titulo: musica.title,
        artista: musica.artist,
        album: musica.album,
        duracao: musica.duration
    }));
};