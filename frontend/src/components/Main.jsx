import React from "react";
import ItemList from "./ItemList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";
import ArtistList from "./ArtistList";

const Main = () => {
  console.log(artistArray);
  return (
    <div>
    <ArtistList />
    </div>
  );
};

export default Main;
