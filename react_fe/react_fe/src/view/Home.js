import React from "react";
import KakaoMapView from "./KakaoMapView";

function Home() {
  return (
    <div className="outline">
      <div className="container">
        <h1>Map</h1>
        <KakaoMapView />
        <div className="map"></div>
      </div>
    <style jsx>{`
      .outline {
        margin: 0;
        padding: 2rem;
      }
      
      .container {
        //   background-color: crimson;
        width: 1040px;
        height: 630px;
        margin: auto;
        border-radius: 30px;
        border: 8px solid black;
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
