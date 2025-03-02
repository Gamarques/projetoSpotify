import React, { createContext, useContext, useState } from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [playlistSource, setPlaylistSource] = useState(''); // 'artist' ou 'songs'

  return (
    <PlaylistContext.Provider 
      value={{ 
        currentPlaylist, 
        setCurrentPlaylist, 
        playlistSource, 
        setPlaylistSource 
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);