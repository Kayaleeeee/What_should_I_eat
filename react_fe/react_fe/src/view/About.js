import React, { Component } from "react";
import { Link } from "react-scroll";
import About1 from "../container/About1.js";
import About2 from "../container/About2.js";
import About3 from "../container/About3.js";
class About extends Component {
  render() {
    return (
      <div id="About">
        <div className={"logo"}>
          <span>오늘뭐먹지</span>
        </div>
        {/* LOGO */}

        <Link
          className="bg1a"
          activeClass="active"
          to="About1"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <div className="arrow arrow1"></div>
        </Link>

        {/* FIRST CARD */}

        <Link
          className="bg2a"
          activeClass="active"
          to="About2"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <div className="arrow arrow2"></div>
        </Link>
        {/* SECOND CARD */}

        <Link
          className="bg3a"
          activeClass="active"
          to="About3"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <div className="arrow arrow3"></div>
        </Link>
        {/* THIRD CARD */}
        <About1 />
        <About2 />
        <About3 />
        <style jsx>{`
          #About {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Do Hyeon";
            color: white;
          }
          body {
            //width: calc(100vw (100vw - 100%));
            margin:0;
            padding:0;
          }
          
          .bodycontainer {
            width: calc(100vw (100vw - 100%));
           min-height: 1080px;
            display: flex;
            flex-direction: column;
          }
          .logo {
            font-size: 35px;
            font-weight: lighter;
            display: block;
            position: fixed;
            top: 50px;
            left: 50px;
          }
          #About1 {
            width: calc(100vw (100vw - 100%));
            height: 100vh;
            background-image: url('${require("../static/about-bg1.jpg")}');
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
          }
          #About1 .bg1txt {
            margin: 0 50px;
            font-size: 70px;
          }
          .bg1map {
            width: 300px;
            height: 300px;
            margin: 0 0 0 20%;
            background-color: teal;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
          }
          #About2 {
            width: calc(100vw (100vw - 100%));
            height: 100vh;
            background-image: url('${require("../static/about-bg2.jpg")}');
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
          }
          #About2 .bg2txt {
            margin: 0 50px;
            font-size: 60px;
          }
          #About3 {
            width: calc(100vw (100vw - 100%));
            height: 100vh;
            background-image: url('${require("../static/about-bg3.jpg")}');
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
          }
          #About3 .bg3txt {
            margin: 0 50px;
            font-size: 60px;
            display: flex;
            justify-content: space-around;
            width: 100%;
          }
          .prof {
            width: 300px;
            height: 300px;
            border-radius: 40px;
            background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
          }
          .arrow {
            width: 13px;
            height: 13px;
            background-color: teal;
            position: fixed;
            border-radius: 50px;
          }
          .arrow1 {
            right: 30px;
            top: 47%;
          }
          .arrow2 {
            right: 30px;
            top: 50%;
          }
          .arrow3 {
            right: 30px;
            top: 53%;
          }  
    `}</style>
      </div>
    );
  }
}
export default About;
