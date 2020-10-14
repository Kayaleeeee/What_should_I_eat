/*global kakao*/

import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";

import axios from "axios";
import KakaoMapView from "../view/KakaoMapView";

function Map(props) {
  //   const navermaps = window.naver.maps;
  const watch = true;
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(
    watch,
    { enableHighAccuracy: true }
  );
  const getLatitude = () => {
    return latitude;
  };
  const getLongitude = () => {
    return longitude;
  };

  const [searchInput, setSearchInput] = useState("");
  const onInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const searchPlace = (e) => {
    e.preventDefault();
    axios
      .get(
        "https://dapi.kakao.com/v2/local/search/address.json?query=" +
          encodeURIComponent(searchInput),
        {
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const arr = res.data.documents;
        const placeList = document.getElementById("places");
        if (arr.length == 0) {
          alert("정확한 주소를 입력해 주세요");
        } else if (arr.length == 1) {
          longitude = arr[0].x;
          latitude = arr[0].y;
          console.log("lat: " + latitude, " long: " + longitude);
        } else {
          for (let i = 0; i < arr.length; i++) {
            const item = arr[i].address_name;
            const listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(item));
            placeList.appendChild(listItem);
          }
        }
      })
      .catch((err) => {
        if (err.status == 401) alert("error"); //나중에 바꾸기
        if (err.status == 400) alert("error"); //나중에 바꾸기
      });
  };

  useEffect(getLatitude, getLongitude, [latitude, longitude]);
  console.log("lat: " + latitude, " long: " + longitude);

  //좌표로 주소 얻어오기

  return (
    <div>
      {/* <div className="searchPlace">
        <form onSubmit={searchPlace}>
          <input
            type="text"
            onChange={onInputChange}
            value={searchInput}
            placeholder="원하는 주소를 검색해 주세요"
          />
          <button>검색</button>
        </form>
      </div> */}

      <KakaoMapView />
    </div>
  );
}

export default Map;
