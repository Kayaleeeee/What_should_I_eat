import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import "./naverApiMap.scss";

export const NaverAPIMap = (props) => {
  //   const navermaps = window.naver.maps;

  return (
    <RenderAfterNavermapsLoaded clientId={"인증키"}>
      <NaverMap
        id={"map"}
        mapDivId={"react-naver-map"} // default name
        style={{
          width: "80%",
          height: "400px",
        }}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={10}
      />
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverAPIMap;
