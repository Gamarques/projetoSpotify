import { useContext } from 'react';
import { PlaylistContext } from '../contexts/PlaylistContext';
import { useState, useEffect } from 'react';
import api from '../services/api';

// export const usePlaylist = () => {
//   const context = useContext(PlaylistContext);
//   if (!context) {
//     throw new Error('usePlaylist must be used within a PlaylistProvider');
//   }
//   return context;
// };


export const useArtistSongs = (artistId) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await api.get(`/songs/byArtist/${artistId}`);
                setSongs(response.data);
                setLoading(false);
            } catch (error) {
                setSongsError(error);
                setLoading(false);
            }
        };


        if (artistId) {
            fetchSongs();
        }
    }, [artistId]);

    return { songs, loading, error };
};

