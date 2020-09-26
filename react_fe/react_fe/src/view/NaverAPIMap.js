import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import { usePosition } from "use-position";
import "./scss/naverApiMap.scss";

export const NaverAPIMap = (props) => {
  //   const navermaps = window.naver.maps;
  const watch = true;
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(
    watch,
    { enableHighAccuracy: true }
  );
  console.log(latitude);
  console.log(longitude);

  return (
    <RenderAfterNavermapsLoaded clientId={"sbw4q2m6xe"}>
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
