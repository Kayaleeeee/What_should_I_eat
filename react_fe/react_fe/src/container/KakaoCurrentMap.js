import React, { useEffect, useState } from "react";

const { kakao } = window;

const KakaoCurrentMap = ({ searchPlace, lat, long, menu }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const container = document.getElementById("map");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 2,
    };

    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체를 생성

    const ps = new kakao.maps.services.Places();
    if (searchPlace !== "") {
      // 키워드로 장소를 검색
      ps.keywordSearch(searchPlace + " " + menu, placesSearchCB);

      removeAllChildNods(document.getElementById("placeList"));
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        setMarkers([]);
      }

      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }

      // 키워드 검색 완료 시 호출되는 콜백함수
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
          let bounds = new kakao.maps.LatLngBounds();

          displayPlaces(data);
          for (let i = 0; i < data.length; i++) {
            //URL받아오기 성공
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }
      }

      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록
        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.setContent(
            //여기에 URL등록 가능//
            `<div class="markerBasic"><a href=${place.url}>` +
              place.place_name +
              "</a></div>"
          );
          infowindow.open(map, marker);
        });
      }

      // 검색결과 항목을 Element로 반환하는 함수
      function getListItem(index, places) {
        var el = document.createElement("li"),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            "<a href= " +
            places.place_url +
            " target='_blank'>" +
            places.place_name +
            "</a></h5>" +
            `<h6 class='place_category'>${places.category_name}</h6>`;

        if (places.road_address_name) {
          itemStr +=
            "    <span><h6 class='place_address'> " +
            places.road_address_name +
            "</h6></span>";
        } else {
          itemStr +=
            "    <span><h6 class='place_address'> " +
            places.address_name +
            "</h6></span>";
        }

        // itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        return el;
      }

      function displayPlaces(place) {
        let placesList = document.getElementById("placeList");
        let fragment = document.createDocumentFragment();

        removeAllChildNods(placesList);
        removeMarker();

        for (let i = 0; i < 8; i++) {
          let placeItem = getListItem(i, place[i]);
          fragment.appendChild(placeItem);
        }

        console.log(fragment);
        placesList.appendChild(fragment);
      }
    }
  }, [searchPlace]);

  return (
    <div className="map_wrap">
      <div id="map"></div>
      {/* <div className=""></div> */}
      <div className="placeList_container">
        {" "}
        <ul id="placeList" className="bg_white"></ul>
      </div>

      <style jsx>{`
        .markerBasic {
          padding: 5px;
          font-size: 1rem;
        }

        .searchPlace {
          display: flex;
          margin-bottom: 10px;
          justify-content: center;
        }

        #placeList {
          position: absolute;
          width: 18em;
          top: 5%;
          // left: 1%;
          z-index: 2;
          margin-top: 4%;
          // border: solid 1px #b1b1b1;
          padding: 0.3rem;
          // border-radius:20px;
          // background-color: rgba( 255, 255, 255, 0.7 );
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .placeList_container {
          width: 5em;
          overflow: scroll;
        }

        #map {
          width: 100hw;
          height: 80vh;
          margin: auto;
        }

        #menu_wrap {
          position: relative;
          top: 0;
          left: 0;
          bottom: 0;
          width: 10rem;
          margin: 10px 0 30px 10px;
          padding: 5px;
          overflow-y: auto;
          // background: rgba(255, 255, 255, 0.7);
          z-index: 1;
          font-size: 12px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .item .info {
          background: rgba(255, 255, 255, 0.7);
          // padding: .5rem;
          margin: 0.1rem;
          height: 4rem;
          display: flex;
          flex-direction: column;
          border: 1px solid black;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          // background: lightgray;
        }

        h5 {
          padding: 0;
          margin: 0;
          font-size: 1rem;
          padding-bottom: 0.2rem;
          // background-color:black;
          color: white;
        }

        h6 {
          padding: 0;
          margin: 0;
        }

        li {
          list-style: none;
        }
        .place_category {
          color: tomato;
        }

        .place_address {
          color: gray;
          padding-top: 0.3rem;
          font-size: 0.8rem;
        }

        a {
          text-deoration: none;
          color: black;
        }

        ul {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default KakaoCurrentMap;
