import React from "react";
import "./scss/home.scss";
import Map from "./Map";

function Home() {
  return (
    <div className={"outline"}>
      <div className={"container"}>
        <h1>Map</h1>
        <Map />
        <div className={"map"}></div>
      </div>
    </div>
  );
}

export default Home;
