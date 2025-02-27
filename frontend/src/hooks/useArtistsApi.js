import { useState, useEffect } from 'react';
import api from '../services/api';

export const useArtistsApi = () => {
    const [artists, setArtists] = useState(null);
    const [artistsLoading, setArtistsLoading] = useState(true);
    const [artistsError, setArtistsError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await api.get('/artists');
                setArtists(response.data);
                setArtistsLoading(false);
            } catch (error) {
                setArtistsError(error);
                setArtistsLoading(false);
            }
        };

        fetchArtists();
    }, []);

    return {
        artists,
        artistsLoading,
        artistsError
    };
} 