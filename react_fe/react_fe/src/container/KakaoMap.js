import React, { useEffect, useState } from "react";
import PlaceInfo from "./PlaceInfo";


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



  const onSortDis=()=>{


  }

  const onSortPop =()=>{

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
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
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


    const placeRating=(placeUrl)=>{
      const request = require('request');
      const cheerio = require("cheerio");
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      
      // var page = require('webpage').create();
      // page.open(proxyUrl+placeUrl, function(){
      //   setTimeout(function(){
      //     page.render(".kakaoWrap")
      //   })
      // })

      request(proxyUrl+ placeUrl, function(err, res, data ){
  
        if(!err){ 
          const $ = cheerio.load(data);

          console.log(data)
 
          // setTimeout(function () {
          //   console.log(data.length)
          //   // console.log($("body").text())
          // })
  
        }
      })



      // const Nightmare = require('nightmare')
      // const nightmare = Nightmare({ show: true })

      // nightmare
      //    .goto('https://duckduckgo.com')
      //   .type('#search_form_input_homepage', 'github nightmare')
      //   .click('#search_button_homepage')
      //   .wait('#r1-0 a.result__a')
      //   .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
      //   .end()
      //   .then(console.log)
      //   .catch(error => {
      //     console.error('Search failed:', error)
      //   })
    }


    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(index, places) {

      // placeRating(places.place_url);


      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "<h5 className='place_name'>" +
          // "<a href= " +
          // places.place_url +
          // " target='_blank'>" +
          places.place_name +
          // "</a>
          
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
        //url === true ? setShow(url) : setShow(!url);
        url === true ? setShow(show) : setShow(!show);
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
        <div className="cate"><p onClick={onSortPop}>평점순</p> <p onClick={onSortDis}>거리순</p></div>
        <div id="placeList" ></div>
      </div>

      <PlaceInfo url={url} show={show}  showInfo={showInfo}/>
      <style jsx>{`

      .cate{
        display: flex;
        flex-direction: row;
        width:100%;
        // justify-content:flex-end;
      }

      .cate p {
        font-weigh:light;
        background: #f3895a;
        margin:.5rem .2rem 0 0.2rem ;
        text-align:center;
        padding:.2rem 0.5rem;
        color:white;
        font-size:.9rem;
        border-radius:3px;
  
      }

      .cate p:hover {
        cursor: pointer;
        background:#c7724d;
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

        .place_name{
          color:black;
        }

        .placeList_title {
          text-align: center;
          margin: auto;
          width: 95%;
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

        #map {
          width: 100%;
          height: 80vh;
          margin: auto;
        }

        // #menu_wrap {
        //   position: relative;
        //   width: 100%;
        //   top: 0;
        //   left: 0;
        //   bottom: 0;
        //   width: 10rem;
        //   padding: 5px;
        //   z-index: 1;
        //   font-size: 12px;
        // }

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
          // color: white;
        }

        h6 {
          padding: 0;
          margin: 0;
        }

        #placeList li {
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

        .info a {
          text-decoration: none;
          color: black;
        }

        .info a:hover {
          text-decoration: none;
          color: gray;
          transition: 0.3s;
        }

        // ul{
        //   padding:0;
        //   margin:0;
        // }
      `}</style>
    </div>
  );
};

export default KakaoMap;
