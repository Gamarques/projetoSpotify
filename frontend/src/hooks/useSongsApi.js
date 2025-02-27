import { useState, useEffect } from 'react';
import api from '../services/api';

export const useSongsApi = () => {
    const [songs, setSongs] = useState(null);
    const [songsLoading, setSongsLoading] = useState(true);
    const [songsError, setSongsError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await api.get('/songs');
                setSongs(response.data);
                setSongsLoading(false);
            } catch (error) {
                setSongsError(error);
                setSongsLoading(false);
            }
        };

        fetchSongs();
    }, []);

    return {
        songs,
        songsLoading,
        songsError
    };
};