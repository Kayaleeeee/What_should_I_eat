import React, { useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import { usePosition } from "use-position";
import "./scss/naverApiMap.scss";
import axios from "axios";

export const NaverAPIMap = (props) => {
  //   const navermaps = window.naver.maps;
  const watch = true;
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(
    watch,
    { enableHighAccuracy: true }
  );
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
      })
      .catch((err) => {
        if (err.response.status == 401)
          alert("error"); //나중에 바꾸기
        if (err.response.status == 400) 
          alert("error"); //나중에 바꾸기
      });
  };
  return (
    <RenderAfterNavermapsLoaded clientId={"sbw4q2m6xe"}>
      <div className={"searchPlace"}>
        <form onSubmit={searchPlace}>
          <input type="text" onChange={onInputChange} value={searchInput} />
          <button>검색</button>
        </form>
      </div>
      <NaverMap
        id={"map"}
        mapDivId={"react-naver-map"} // default name
        style={{
          width: "80%",
          height: "400px",
        }}
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={15}
      />
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverAPIMap;
