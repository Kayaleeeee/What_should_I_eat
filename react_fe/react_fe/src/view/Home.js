import React from "react";
import KakaoMapView from "./KakaoMapView";

function Home() {
  return (
    <div className="outline">
      <div className="container">
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
          width: 90%;
          height: 85vh;
          margin: auto;
          border-radius: 30px;
          border: 8px solid black;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Home;
