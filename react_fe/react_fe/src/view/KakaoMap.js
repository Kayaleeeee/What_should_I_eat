/*global kakao*/

import React, { Component } from "react";
import "./scss/map.scss";

class KakaoMap extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   lat: this.props.latitude,
    //   long: this.props.longitude,
    // };
  }

  map;
  markers = [];
  inflowindoes = [];

  componentDidMount() {
    let map;
    // let lat = this.lat;
    // let long = this.props.longitude;

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=&libraries=services,clusterer,drawing&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(
            this.props.latitude,
            this.props.longitude,
            console.log(this.props.latitude, this.props.longitude)
          ),

          level: 4,
        };
        map = new window.kakao.maps.Map(el, options);
      });
    };

    let geocoder = new kakao.maps.services.Geocoder();

    console.log("geocode", geocoder, geocoder[0]);

    // geocoder.getLat() = this.props.latitude,

    var marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
    let infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    // searchAddrFromCoords(geocoder, displayCenterInfo);

    // // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    // function displayCenterInfo(result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     var infoDiv = document.getElementById("centerAddr");

    //     for (var i = 0; i < result.length; i++) {
    //       // 행정동의 region_type 값은 'H' 이므로
    //       if (result[i].region_type === "H") {
    //         infoDiv.innerHTML = result[i].address_name;
    //         break;
    //       }
    //     }
    //   }
    // }

    // // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    //   searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
    //     if (status === kakao.maps.services.Status.OK) {
    //       var detailAddr = !!result[0].road_address
    //         ? "<div>도로명주소 : " +
    //           result[0].road_address.address_name +
    //           "</div>"
    //         : "";
    //       detailAddr +=
    //         "<div>지번 주소 : " + result[0].address.address_name + "</div>";

    //       var content =
    //         '<div class="bAddr">' +
    //         '<span class="title">법정동 주소정보</span>' +
    //         detailAddr +
    //         "</div>";

    //       // 마커를 클릭한 위치에 표시합니다
    //       marker.setPosition(mouseEvent.latLng);
    //       marker.setMap(map);

    //       // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
    //       infowindow.setContent(content);
    //       infowindow.open(map, marker);
    //     }
    //   });
    // });

    // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, "idle", function () {
    //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    // });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      console.log(this.props.longitude, this.props.latitude);
      geocoder.coord2RegionCode(
        this.props.longitude,
        this.props.latitude,
        callback
      );
    }

    // function searchDetailAddrFromCoords(coords, callback) {
    //   // 좌표로 법정동 상세 주소 정보를 요청합니다
    //   geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    // }
  }

  render() {
    return (
      <div className="kakaoMap">
        <div id="map"></div>
      </div>
    );
  }
}

export default KakaoMap;
