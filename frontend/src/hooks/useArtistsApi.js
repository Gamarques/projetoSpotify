import { useAxios } from 'axios-hooks';
import { getArtists } from "../services/artistsApi";

export const useArtistsApi = () => {
    const [{ data: artists, loading: artistsLoading, error: artistsError }, refetchArtists] = useAxios({
        url: '/artists', // <-  A URL '/artists' é passada aqui para o useAxios
        method: 'GET'
      });
  
    return {
      artists,
      artistsLoading,
      artistsError,
      refetchArtists
    };
  };
