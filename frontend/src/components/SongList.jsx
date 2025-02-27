import React, { useState } from "react";
import SongItem from "./SongItem";
import { useSongsApi } from "../hooks/useSongsApi";

const SongList = () => {
  const [items, setItems] = useState(5);
  const { songs, songsLoading } = useSongsApi();

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

      <p
        className="song-list__see-more"
        onClick={() => setItems(items + 5)}
      >
        Ver mais
      </p>
    </div>
  );
};

export default SongList;
