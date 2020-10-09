import React, { useEffect, useState } from "react";

const { kakao } = window;

const KakaoMap = ({ searchPlace }) => {
  const [markers, setMarkers] = useState([]);
  console.log(searchPlace);

  useEffect(() => {
    const container = document.getElementById("map");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2,
    };

    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체를 생성

    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색
    ps.keywordSearch(searchPlace + " 맛집", placesSearchCB);

    removeAllChildNods(document.getElementById("placeList"));
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }

    function removeAllChildNods(el) {
      console.log(el);
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
          console.log(data[i]);
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
      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          //여기에 URL등록 가능//

          '<div class="markerBasic">' + place.place_name + "</div>"
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
          ">" +
          places.place_name +
          "</a></h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.place_url +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    }

    function displayPlaces(place) {
      let placesList = document.getElementById("placeList");
      let fragment = document.createDocumentFragment();

      removeAllChildNods(placesList);
      removeMarker();

      for (let i = 0; i < place.length; i++) {
        let placeItem = getListItem(i, place[i]);
        fragment.appendChild(placeItem);
      }

      console.log(fragment);
      placesList.appendChild(fragment);
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
          width: 20rem;
          //   height: 90vh;
          position: absolute;
          top: 0;
          left: 3%;
          z-index: 2;
          margin-top: 50px;
          border: solid 1px #b1b1b1;
          display: flex;
          flex-direction: column;
          overflow: scroll;
        }

        #map {
          width: 800px;
          height: 500px;
          margin: auto;
        }

        //kakaoMap.scss

        #menu_wrap {
          position: relative;
          top: 0;
          left: 0;
          bottom: 0;
          width: 10rem;
          margin: 10px 0 30px 10px;
          padding: 5px;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.7);
          z-index: 1;
          font-size: 12px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .bg_white {
          background: #fff 0.7;
        }

        #menu_wrap hr {
          display: block;
          height: 1px;
          border: 0;
          border-top: 2px solid #5f5f5f;
          margin: 3px 0;
        }

        #placesList li {
          list-style: none;
          display: flex;
          flex-direction: column;
        }

        #placesList .item {
          position: relative;
          border-bottom: 1px solid #888;
          overflow: hidden;
          cursor: pointer;
          min-height: 65px;
        }
        #placesList .item span {
          display: block;
          margin-top: 4px;
        }
        #placesList .item h5,
        #placesList .item .info {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        #placesList .item .info {
          padding: 10px 0 10px 55px;
        }
        #placesList .info .gray {
          color: #8a8a8a;
        }
        #placesList .info .jibun {
          padding-left: 26px;
          background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
            no-repeat;
        }
        #placesList .info .tel {
          color: #009900;
        }
        #placesList .item .markerbg {
          float: left;
          position: absolute;
          width: 36px;
          height: 37px;
          margin: 10px 0 0 10px;
          background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
            no-repeat;
        }

        #placesList {
          list-style: none;
          display: flex;
          flex-direction: column;
          width: 1040px;
          margin: auto;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default KakaoMap;
