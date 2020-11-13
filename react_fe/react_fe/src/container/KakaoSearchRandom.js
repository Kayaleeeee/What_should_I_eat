import React, { useState, useEffect } from "react";
import KakaoCurrentMap from "./KakaoCurrentMap";
import axios from "axios";

const KakaoSearchRandom = () => {
  const [place, setPlace] = useState("");
  const [position, setPosition] = useState({});
  const menu = localStorage.getItem("randomMenu");

  const searchPlace = () => {
    const latLng = "x=" + position.longitude + "&y=" + position.latitude;
    axios
      .get("https://dapi.kakao.com/v2/local/geo/coord2address.json?" + latLng, {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        setPlace(res.data.documents[0].address.address_name);
      })
      .catch((err) => {
        if (err.status == 401) alert("error"); //나중에 바꾸기
        if (err.status == 400) alert("error"); //나중에 바꾸기
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({latitude: position.coords.latitude, longitude: position.coords.longitude})
      }, err => {
        //alert("일시적으로 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
      }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 0});
    } else {
      setPosition(33.450701, 126.570667);
      alert("위치 정보를 지원하지 않는 브라우저입니다.");
    }
  }, []);

  useEffect(() => {
    searchPlace();
  }, [position]);

  
  return (
    <div className="outline">
      <div className="container">
        {!position.latitude && (
          <div className="loading">
              <img src={require("../static/dish.png")} alt="dish"/>
            <p>위치 정보를 받아오고 있습니다</p>
          </div>
        )}
        {position.latitude && (
          <KakaoCurrentMap
            searchPlace={place}
            lat={position.latitude}
            long={position.longitude}
            isRandom={true}
          />
        )}
      </div>
      <style jsx>{`
        .outline {
          margin: 0;
          padding: 2rem;
          padding-top:3rem;
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

        .loading {
          display: flex;
          flex-direction: column;
          height: 85vh;
          justify-content: center;
          align-items: center;
        }

        p {
          margin-top: 50px;
        }

        .loading img {
          width: 5rem;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default KakaoSearchRandom;
