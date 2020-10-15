import React, { useState, useEffect } from "react";
import KakaoCurrentMap from "./KakaoCurrentMap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const KakaoSearch = () => {
  const [place, setPlace] = useState("");
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState("맛집");

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };

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
    const geo = navigator.geolocation;
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
    if (!geo) {
      setError("위치 정보 수집이 지원되지 않는 브라우저입니다");
      alert(error);
      return;
    }
    const watcher = geo.watchPosition(onChange, onError, options);
  }, []);
  useEffect(() => {
    searchPlace();
  }, [position]);
  return (
    <div className="outline">
      <div className="container">
        {!position.latitude && (
          <div className="loading">
            <ClipLoader size={150} color={"#123abc"} />
            <p>위치 정보를 받아오고 있습니다</p>
          </div>
        )}
        {position.latitude && (
          <KakaoCurrentMap
            searchPlace={place}
            lat={position.latitude}
            long={position.longitude}
            menu={menu}
          />
        )}
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
      `}</style>
    </div>
  );
};

export default KakaoSearch;
