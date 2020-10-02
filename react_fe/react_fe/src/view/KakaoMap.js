/*global kakao*/
import React, { Component } from "react";
import "./scss/map.scss";

class KakaoMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.latitude,
      long: this.props.longitude,
    };
  }

  map;
  markers = [];
  inflowindoes = [];

  componentDidMount() {
    let lat = this.state.latitude;
    let long = this.state.longitude;

    console.log(lat, long, this.props.test);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(this.props.latitude, this.props.longitude),
          level: 4,
        };

        const map = new window.kakao.maps.Map(el, options);
        const ps = new kakao.maps.InfoWindow({ zIndex: 1 });
        ç;
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
