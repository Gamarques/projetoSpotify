import React, { useState } from "react";
import SongItem from "./SongItem";
import { useArtistSongs } from "../hooks/usePlaylist";
import { useParams } from "react-router-dom";
// usar useParams para pegar id do artista e passar para a api de chamr a musica e criar a lista, talvez usar context
const SongList = () => {
  const [items, setItems] = useState(5);
  const { id } = useParams();
  const { songs, songsLoading } = useArtistSongs(id);
  
  if (songsLoading || !songs) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="song-list">
      {songs
        .filter((currentValue, index) => index < items)
        .map((currentSongObj, index) => (
          <SongItem {...currentSongObj} index={index} key={currentSongObj._id} />
        ))}
      {items < songs.length && (
        <p
          className="song-list__see-more"
          onClick={() => setItems(items + 5)}
        >
          Ver mais
        </p>
      )}
    </div>
  );
};

export default SongList;
