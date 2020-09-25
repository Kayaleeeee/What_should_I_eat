import React, { Component } from "react";
import "./about.scss";
function About() {
  return (
    <div id={"about"}>
      <div className={"logo"}>
        <span>오늘뭐먹지</span>
      </div>
      {/* LOGO */}
      <div className={"bodycontainer"}>
        <div className={"bg1"}>
          <div className={"bg1txt"}>
            <p>
              궁극의 <br />
              메뉴 추천 페이지
            </p>
          </div>
          <div className={"bg1map"}>
            <p>지도 프리뷰</p>
          </div>
        </div>
        {/* FIRST CARD */}

        <div className={"bg2"}>
          <div className={"bg2txt"}>
            <p>
              "주위 식당의 메뉴들을
              <br />
              한눈에 비교할 수 있다면?"
            </p>
          </div>
        </div>
        {/* SECOND CARD */}

        <div className={"bg3"}>
          <div className={"bg3txt"}>
            <div className={"prof prof1"}>
              <span>가연</span>
            </div>
            <div className={"prof prof2"}>
              <span>지현</span>
            </div>
            <div className={"prof prof3"}>
              <span>준형</span>
            </div>
          </div>
        </div>
        {/* THIRD CARD */}
      </div>{" "}
      {/*BODY CONTAINER*/}
    </div> /*ABOUT*/
  );
}

export default About;
