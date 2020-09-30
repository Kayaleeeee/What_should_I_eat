/*global kakao*/
import React, { Component } from "react";
import "./scss/map.scss";

class KakaoMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.latitude,
      long: this.props.longtitude,
    };
  }

  map;
  markers = [];
  inflowindoes = [];

  componentDidMount() {
    let lat = this.state.latitude;
    let long = this.state.longtitude;

    console.log(lat, long, this.props.test);

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c30bf6535e0de249c3e4abb9e84f72d9&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(33.4650701, 126.570667),
          level: 4,
        };

        const map = new window.kakao.maps.Map(el, options);
      });
    };
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
