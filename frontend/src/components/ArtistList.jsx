import { useState, useEffect } from 'react';
import api from '../services/api';

function ArtistList() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await api.getArtists();
                setArtists(data);
            } catch (error) {
                console.error('Erro ao carregar artistas:', error);
            }
        };

        loadArtists();
    }, []);

    return (
        <div>
            {artists.map(artist => (
                <div key={artist._id}>
                    <h2>{artist.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default ArtistList; 