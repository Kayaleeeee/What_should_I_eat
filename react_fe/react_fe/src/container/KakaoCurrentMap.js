import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import PlaceInfo from "./PlaceInfo";
import Random from "./Random";

const { kakao } = window;
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    height: "20rem",
  },
  overlay: { zIndex: 1000 },
};
const KakaoCurrentMap = ({ searchPlace, lat, long, isRandom }) => {
  const [markers, setMarkers] = useState([]);
  const [url, setURL] = useState("");
  const [show, setShow] = useState(false);
  const [isReady, setIsReady] = useState(isRandom ? false : true);
  const [modalIsOpen, setIsOpen] = useState(true);
  const [randomMenu, setRandomMenu] = useState("맛집");
  const [sortDis, setSortDis] = useState(false);
  const [sortPop, setSortPop] = useState(false);
  let categoryList = [];

  function closeModal() {
    setIsReady(true);
    setIsOpen(false);
  }

  const showInfo = () => {
    setShow(false);
  };

  const onSortDis = () => {
    sortDis ? setSortDis(false) : setSortDis(true);
  };

  const onSortPop = () => {
    sortPop ? setSortPop(false) : setSortPop(true);
  };

  const placeList = [];

  function calDistDiff(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a));
  }

  const placeRating = (placeUrl) => {
    const request = require("request");
    const cheerio = require("cheerio");
    const url = placeUrl;
    request(url, function (err, res, html) {
      if (!err) {
        const $ = cheerio.load(html);
        const rate = $(".num_rate").text();
        console.log("hehehe: ", rate);
        return rate;
      }
    });
  };

  useEffect(() => {
    const container = document.getElementById("map");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체를 생성

    var locPosition = new kakao.maps.LatLng(lat, long), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    message = '<div style="padding:5px;">현재 위치는 여기!</div>'; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다


    const ps = new kakao.maps.services.Places();
    if (searchPlace !== "") {
      // 키워드로 장소를 검색
      !isRandom ? ps.keywordSearch(searchPlace + "맛집", placesSearchCB)
      : randomMenu.includes(",") ? 
        ps.keywordSearch(searchPlace + randomMenu.split(",").pop(), placesSearchCB)
      : ps.keywordSearch(searchPlace + randomMenu, placesSearchCB);
      console.log(randomMenu);

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

      function addMarker(position, idx, title) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        setMarkers([...markers, marker]);
        //markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 키워드 검색 완료 시 호출되는 콜백함수
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
          let bounds = new kakao.maps.LatLngBounds();
          if (sortDis) {
            displayCurrentMarker(locPosition, message);
            setTimeout(() => {
              placeList.sort(function(x, y) {
                return x.dist < y.dist ? -1 : x.dist > y.dist ? 1 : 0;
              });
            }, 1000);
            let final = [];
            setTimeout(() => {
              for (let i = 0; i < placeList.length; i++) {
                final.push(placeList[i].placeInfo);
              }
              displayPlaces(final);
            }, 1000);
          }
          displayPlaces(data);
          for (let i = 0; i < data.length; i++) {
            //URL받아오기 성공
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      function displayCurrentMarker(locPosition, message) {

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = false;
    
        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    }  

      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        // console.log(place)
        // 마커에 클릭이벤트를 등록
        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.setContent(
            //여기에 URL등록 가능//

            `<div class="markerBasic"><a href=${place.place_url} target="_blank">` +
              place.place_name +
              "</a></div>"
          );
          infowindow.open(map, marker);
        });
      }

      // 인포윈도우에 장소명을 표시
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
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
        if (!categoryList.includes(places.category_name)) {
          categoryList.push(places.category_name);
        }
        //const rate = placeRating(places.place_url);
        const diff = calDistDiff(places.y, places.x, lat, long);        
        //console.log("rate: ", rate);

        placeList.push({placeInfo: places, dist: diff});

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

        el.innerHTML = itemStr;
        el.className = "item";
        el.onclick = () => {
          setURL(places.place_url);
          url === true ? setShow(url) : setShow(!url);
        };

        return el;
      }

      function displayPlaces(place) {
        let placesList = document.getElementById("placeList");
        let fragment = document.createDocumentFragment();

        removeAllChildNods(placesList);
        removeMarker();
        for (let i = 0; i < place.length; i++) {
            let placePosition = new kakao.maps.LatLng(place[i].y, place[i].x),
            bounds = new kakao.maps.LatLngBounds(),
            marker = addMarker(placePosition, i);

          let placeItem = getListItem(i, place[i]);

          bounds.extend(placePosition);

          (function (marker, title) {
            kakao.maps.event.addListener(marker, "mouseover", function () {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, "mouseout", function () {
              infowindow.close();
            });

            placeItem.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            placeItem.onmouseout = function () {
              infowindow.close();
            };
          })(marker, place[i].place_name);

          if (isReady) {
            fragment.appendChild(placeItem);
          }
        }
        if (isRandom && randomMenu == "맛집") {
          let menu =
          categoryList[Math.floor(Math.random() * categoryList.length)];
          menu = menu.split(">").pop().trim();
          setRandomMenu(menu);
        }
        placesList.appendChild(fragment);
      }
    }
  }, [searchPlace, modalIsOpen, sortDis]);

  return (
    <div id="map_wrap">
      <div id="map"></div>
      {!isReady && (
        <div className="modal">
          <Modal isOpen={modalIsOpen} style={customStyles}>
            {randomMenu != "맛집" && (
              <Random randomMenu={randomMenu} closeModal={closeModal} />
            )}
          </Modal>
        </div>
      )}
      <div className="placeList_container">
        {isReady && <h3 className="placeList_title">음식점 리스트</h3>}
        {isReady && (
          <div className="cate">
            <p className={sortPop ? "selected" : ""}
              onClick={onSortPop}>
                평점순
            </p> 
            <p className={sortDis ? "selected" : "hi"}
              onClick={onSortDis}>
                거리순
            </p>
          </div>
        )}
        <div id="placeList"></div>
      </div>

      <PlaceInfo url={url} show={show} showInfo={showInfo} />
      <style jsx>{`
        .modal {
          position: absolute;
          z-index: 2000;
        }

        .modal_contents {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .modal_contents button {
          margin-top: 80px;
          border: solid 1px #0052cc;
          border-radius: 20px;
          height: 40px;
          width: 200px;
          font-size: 18px;
          background-color: #ffffff;
          color: #0052cc;
          cursor: pointer;
        }
        .cate {
          display: flex;
          flex-direction: row;
          width: 100%;
          // justify-content:flex-end;
        }

        .cate p {
          font-weigh: light;
          background: #f3895a;
          margin: 0.5rem 0.2rem 0 0.2rem;
          text-align: center;
          padding: 0.2rem 0.5rem;
          color: white;
          font-size: 0.9rem;
          border-radius: 3px;
        }

        .cate .selected{
          background: #c7724d;
        }

        .cate p:hover {
          cursor: pointer;
          background: #c7724d;
        }

        .markerBasic {
          padding: 5px;
          font-size: 1rem;
          display: flex;
        }

        .markerBasic a {
          text-decoration: none;
          color: black;
          text-align: center;
          width:150px;
        }

        .searchPlace {
          display: flex;
          margin-bottom: 10px;
          justify-content: center;
        }

        #placeList {
          width: 18rem;
          padding-top: 0.3rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .placeList_title {
          text-align: center;
          margin: auto;
          width: 90%;
          border-radius: 10px 10px 0 0;
          padding: 0.5rem;
          background: black;
          color: white;
        }

        .placeList_container {
          width: 19rem;
          height: 83vh;
          position: absolute;
          z-index: 2;
          margin-top: 5%;
          margin-left: 0.5%;
          top: 0;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .placeList_container::-webkit-scrollbar {
          width: 10px;
        }
        .placeList_container::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.5);
          border-radius: 8px;
        }
        .placeList_container::-webkit-scrollbar-thumb:hover {
          background-color: black;
        }
        .placeList_container::-webkit-scrollbar-track {
        }
        .placeInfo_container {
        }

        #map {
          width: 100%;
          height: 100vh;
          margin: auto;
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

        #placeList li {
          list-style: none;
          cursor: pointer;
        }

        .place_category {
          color: tomato;
        }

        .place_address {
          color: gray;
          padding-top: 0.3rem;
          font-size: 0.8rem;
        }

        .info a {
          text-decoration: none;
          color: black;
        }

        .info a:hover {
          text-decoration: none;
          color: gray;
          transition: 0.3s;
        }

        @font-face {
          font-family: "Apple SD";
          src: url("${require("../fonts/applesd.ttf")}")
            format("truetype");
        }
        
        div{
          font-family: "Apple SD";
        }
  
        h5, h6 {
          font-weight: 590;
        }
      `}</style>
    </div>
  );
};

export default KakaoCurrentMap;
