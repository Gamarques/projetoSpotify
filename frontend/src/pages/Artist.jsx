import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { useSongsApi } from "../hooks/useSongsApi";
import { useArtistsApi } from "../hooks/useArtistsApi";

const Artist = () => {
  const { id } = useParams();
  const { songs, songsLoading } = useSongsApi();
  const { artists, artistsLoading } = useArtistsApi();

  if (songsLoading || artistsLoading || !songs || !artists) {
    return <div>Carregando...</div>;
  }

  const artist = artists.find((currentArtist) => currentArtist._id === id);
  
  if (!artist) {
    return <div>Artista não encontrado</div>;
  }

  const { name, banner } = artist;

  const songsFromArtist = songs.filter(
    (currentSong) => currentSong.artist === name
  );

  const getRandomSongId = () => {
    const randomIndex = Math.floor(Math.random() * songsFromArtist.length);
    return songsFromArtist[randomIndex]?._id;
  };

  const randomIdFromArtist = getRandomSongId();

  if (!randomIdFromArtist) {
    return <div>Nenhuma música encontrada para este artista</div>;
  }

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)),url(${banner})`,
        }}
      >
        <h2 className="artist__title">{name}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>

        <SongList songsArray={songsFromArtist} />
      </div>

      <Link to={`/song/${randomIdFromArtist}`}>
        <FontAwesomeIcon
          className="single-item__icon single-item__icon--artist"
          icon={faCirclePlay}
        />
      </Link>
    </div>
  );
};

export default Artist;
