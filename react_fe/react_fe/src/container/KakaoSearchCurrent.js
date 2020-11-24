import React, { useState, useEffect } from "react";
import KakaoCurrentMap from "./KakaoCurrentMap";
import axios from "axios";

const KakaoSearchCurrent = () => {
  const [place, setPlace] = useState("");
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };

  const menu = "맛집";

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
    console.log(geo)
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };


    const watcher = geo.watchPosition(onChange, onError, options);
    //return () => geo.clearWatch(watcher);
    //테스트용 코드
    //여기서 결과 성공 확인 시, 해당 파트 지우고 KakaoCurrentMap & kakaoMap에서 작업
    const request = require("request");
    const cheerio = require("cheerio");
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://place.map.kakao.com/60259859";
    request(
      proxyUrl + url,
      function (err, res, html) {
        if (!err) {
          //console.log("scraping: " + res.body);
          //console.log("html: ", html);
          var $ = cheerio.load(html);
          // console.log("data: ", $("body").text());
          $("body").each(function () {
            var data = $(this);
            //console.log("hh:" + data.text());
          });
        } else {
          console.log("error: ", err);
        }
      },
      { mode: "no-cors" }
    );
  }, []);

  useEffect(() => {
    searchPlace();

    console.log("position : " ,position)
  }, [position]);
  return (
    <div className="outline">
      <div className="container">
        {!position.latitude && (
          <div className="loading">
            <img src={require("../static/dish.png")} alt="dish" />
            <p>위치 정보를 받아오고 있습니다</p>
          </div>
        )}
        {position.latitude && (
          <KakaoCurrentMap
            searchPlace={place}
            lat={position.latitude}
            long={position.longitude}
            isRandom={false}
          />
        )}
      </div>
      <style jsx>{`
        .outline {
          margin: 0;
          padding: 2rem;
          padding-top: 3rem;
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
          font-family: "Apple SD";
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
        
        @font-face {
          font-family: "Apple SD";
          src: url("${require("../fonts/applesd.ttf")}")
            format("truetype");
        }
      `}</style>
    </div>
  );
};

export default KakaoSearchCurrent;
