import React, { useEffect, useState } from 'react';
import { formatarArtistas } from '../utils/formatters.js';
import api from '../services/api.js';

const ArtistList = () => {
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artists = await api.getArtists();
                const { uniqueArtists } = await api.updateArtistsAndSongs(artists, []);
                const artistasFormatados = formatarArtistas(uniqueArtists);
                setArtistas(artistasFormatados);
                console.log('Artistas formatados:', artistasFormatados); // Log para depuração
            } catch (error) {
                console.error('Erro ao buscar e formatar artistas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="lista-artistas">
            {artistas.map(artista => (
                <div key={artista.id} className="artista-item">
                    <h3>{artista.nome}</h3>
                    <p>{artista.genero}</p>
                </div>
            ))}
        </div>
    );
};

export default ArtistList;