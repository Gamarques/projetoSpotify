import { useContext } from 'react';
import { PlaylistContext } from '../contexts/PlaylistContext';
import { useState, useEffect } from 'react';

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};


export const useArtistSongs = (artistId) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch(`/songs/byArtist/${artistId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar músicas');
                }
                const data = await response.json();
                setSongs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (artistId) {
            fetchSongs();
        }
    }, [artistId]);

    return { songs, loading, error };
};

