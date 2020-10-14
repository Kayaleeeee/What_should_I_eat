import React from "react";
import Map from "../container/Map";

function Home() {
  return (
    <div className="outline">
      <div className="container">

        <Map />
        <div className="map"></div>
      </div>
    <style jsx>{`
      .outline {
        margin: 0;
        padding: 2rem;
      }
      
      .container {
        //   background-color: crimson;
        width: 90%;
        height: 85vh;
        margin: auto;
        border-radius: 30px;
        border: 8px solid black;
        overflow:hidden;
      }
      
      .nav {
        margin: 1rem;
        background-color: gray;
        height: 30px;
        text-align: right;
      }
      
      h1 {
        text-align: center;
      }
      
    `}</style>
    </div>
  );
}

export default Home;
