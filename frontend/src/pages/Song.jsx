import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { useSongsApi } from "../hooks/useSongsApi";
import { useArtistsApi } from "../hooks/useArtistsApi";

const Song = () => {
  const { id } = useParams();
  const { songs, songsLoading } = useSongsApi();
  const { artists, artistsLoading } = useArtistsApi();

  if (songsLoading || artistsLoading || !songs || !artists) {
    return <div>Carregando...</div>;
  }

  const currentSong = songs.find((song) => song._id === id);
  if (!currentSong) {
    return <div>Música não encontrada</div>;
  }

  const { image, name, duration, artist, audio, artistName } = currentSong;

  const artistObj = artists.find((currentArtist) => currentArtist._id === artist);
  if (!artistObj) {
    return <div>Artista não encontrado</div>;
  }

  const songsFromArtist = songs.filter(
    (song) => song.artist === artist
  );

  const getRandomSong = (songs) => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex]._id;
  };

  const randomIdFromArtist = getRandomSong(songsFromArtist);
  const randomId2FromArtist = getRandomSong(songsFromArtist);

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={image} alt={`Imagem da música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do Artista ${artist}`}
          />
        </Link>

        <Player
          duration={duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={audio}
        />

        <div>
          <p className="song__name">{name}</p>
          <p>{artistName}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
