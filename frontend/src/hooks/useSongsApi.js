import { useAxios } from 'axios-hooks';
import { getSongs } from "../services/songsApi";

export const useSongsApi = () => {
    const [{ data: songs, loading: songsLoading, error: songsError }, refetchSongs] = useAxios({
        url: '/songs', // <-  A URL '/songs' é passada aqui para o useAxios
        method: 'GET'
      });
    return {
      songs,
      songsLoading,
      songsError,
      refetchSongs
    };
  };