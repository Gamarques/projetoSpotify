import React from "react";
import ItemList from "./ItemList";
import { useSongsApi } from "../hooks/useSongsApi";
import { useArtistsApi } from "../hooks/useArtistsApi";

const Main = ({ type }) => {
  const { songs, songsLoading } = useSongsApi();
  const { artists, artistsLoading } = useArtistsApi();

  if (songsLoading || artistsLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="main">
      {/* Item List de Artistas */}
      {type === "artists" || type === undefined ? (
        <ItemList
          title="Artistas"
          items={10}
          itemsArray={artists}
          path="/artists"
          idPath="/artist"
        />
      ) : (
        <></>
      )}

      {/* Item List de Músicas */}
      {type === "songs" || type === undefined ? (
        <ItemList
          title="Músicas"
          items={20}
          itemsArray={songs}
          path="/songs"
          idPath="/song"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
