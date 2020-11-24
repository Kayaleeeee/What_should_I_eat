import React, { useEffect, useState } from "react";
import PlaceInfo from "./PlaceInfo";
import "./scss/kakaoMap.scss"
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { kakao } = window;

const KakaoMap = ({ searchPlace }) => {
   const [markers, setMarkers] = useState([]);
  //  const [place_list, setPlaceList] =useState([]);
   const [url, setURL] = useState("");
   const [show, setShow] = useState(false);

   const showInfo=()=>{
    //  console.log(show)
     setShow(false);
   }




  useEffect(() => {
    const container = document.getElementById("map");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 4,
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
      setMarkers([...markers, marker ])
      return marker;
    }

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status) {

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
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // alert("검색 결과가 존재하지 않습니다.");

        toast.error("😥 검색 결과가 존재하지 않습니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        toast.error("검색 결과가 존재하지 않습니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        return;
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

          `<div class="markerBasic"><a class="marker_title" href=${place.place_url} target="_blank">` +
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




    function getListItem(index, places) {


      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "<h5 className='place_name'>" +
          places.place_name +
          "</h5>" +
          `<h6 class='place_category'>${places.category_name}</h6>`;

      if (places.road_address_name) {
        itemStr +=
          "<span><h6 class='place_address'> " +
          places.road_address_name +
          "</h6></span>";
      } else {
        itemStr +=
          "<span><h6 class='place_address'> " +
          places.address_name +
          "</h6></span>";
      }
      el.innerHTML = itemStr;
      el.className = "item";
       el.onclick = () => {
        setURL(places.place_url);
        console.log("click event")
        console.log(url)
        url === true ? setShow(show) : setShow(!show);
        console.log(show)
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

        fragment.appendChild(placeItem);
      }
      placesList.appendChild(fragment);
    }
  }, [searchPlace]);



  return (
    <div id="map_wrap">
      <div id="map"></div>
      <div className="placeList_container">
        <h3 className="placeList_title">음식점 리스트</h3>{" "}
        {/* <div className="cate"><p >평점순</p> <p >거리순</p></div> */}
        <ToastContainer 
             position="top-center"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
            pauseOnHover />
        <div id="placeList" ></div>
      </div>

      <PlaceInfo url={url} show={show} showInfo={showInfo}/>
      <style jsx>{`
      @font-face {
        font-family: "Apple SD";
        src: url("${require("../fonts/applesd.ttf")}")
          format("truetype");
      }
      
      div{
        font-family: "Apple SD";
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
      .placeList_title {
        text-align: center;
        margin: auto;
        width: 90%;}
      h5, h6 {
        font-weight: 590;
      }
      `}</style>
    </div>
  );
};

export default KakaoMap;
