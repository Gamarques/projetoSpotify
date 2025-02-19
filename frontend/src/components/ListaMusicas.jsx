import React, { useEffect, useState } from 'react';
import { formatarMusicas } from '../utils/formatters.js';
import api from '../services/api.js';

const ListaMusicas = () => {
    const [musicas, setMusicas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artists = await api.getArtists();
                const songs = await api.getSongs();
                const { uniqueArtists, uniqueSongs } = await api.updateArtistsAndSongs(artists, songs);
                const musicasFormatadas = formatarMusicas(uniqueSongs);
                setMusicas(musicasFormatadas);
            } catch (error) {
                console.error('Erro ao buscar e formatar músicas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="lista-musicas">
            {musicas.map(musica => (
                <div key={musica.id} className="musica-item">
                    <h3>{musica.titulo}</h3>
                    <p>{musica.artista}</p>
                    <p>{musica.album}</p>
                    <p>{musica.duracao}</p>
                </div>
            ))}
        </div>
    );
};

export default ListaMusicas;