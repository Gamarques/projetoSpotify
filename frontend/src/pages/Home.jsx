import React from "react";
import Main from "../components/Main";
import { useArtistsApi } from "../hooks/useArtistsApi";
import { useSongsApi } from "../hooks/useSongsApi";

const Home = () => {
  const {songs} = useSongsApi();
  console.log(songs);
  return <Main />;
};

export default Home;
