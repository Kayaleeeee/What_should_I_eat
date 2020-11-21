import React, { Component } from "react";
import { Link } from "react-scroll";
import About1 from "../container/About1.js";
import About2 from "../container/About2.js";
class About extends Component {
  render() {
    return (
      <div id="About">

        <Link
          className="bg2a"
          activeClass="active"
          to="About2"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <img src={require("../static/down-arrow (1).png")} className="arrow4"></img> 
          <div className="arrow arrow2"></div>
        </Link>

        <About1 />
        <About2 />
        
        <style jsx>{`

            .nav_container a {
              font-size: 1.2rem;
              text-decoration: none;
              color:white;
            }
            
            .nav_container a:hover {
              color: #b1b1b1;
            }

            .nav_container a:visited{
              color: white;
            }


          #About {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: white;
            font-family: "Do Hyeon";
          } 
          @font-face {
            font-family: "Do Hyeon";
            src:url('${require("../fonts/DoHyeon-Regular.ttf")}') format("truetype");
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
            margin-top:2rem;
            color:white;
      
          }
  
          #About1 {
            width: calc(100vw (100vw - 100%));
            height: 100vh;
            background-image: url('${require("../static/about-bg1(1).jpg")}');
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #About1 .bg1txt {
            margin: 0 50px;
            text-shadow: 2px 2px 2px rgba(1,1,1,0.5);
            display: flex;
            flex-direction:column;
            align-items: center;
          }
          
          .bg1txt1 {
            font-size:25px;
          }
          .bg1txt2 {
            font-size:120px;
          }
          .bg2map {
            width: 35%;
            height: 45%;
            margin: auto;
            border-radius: 30px;
            border: 8px solid black;
            overflow: hidden;
            background-image:url('${require("../static/mappreview.jpg")}');
            background-attachment:fixed;
            background-repeat:no-repeat;
            background-size:cover;
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
            text-shadow: 2px 2px 2px rgba(1,1,1,0.5);
          }
          @keyframes float {
            0% {
              transform: translatey(0px);
            }
            50% {
              transform: translatey(-8px);
            }
            100% {
              transform: translatey(0px);
            }
          }
          .arrow4{
            max-width:150px;
            position: absolute;
            top: 37%;
            left: 42vw;
            transform: translate(-50%, -50%);
            animation: float 2.5s ease-in-out infinite;
          }
          .arrow4:hover{
            cursor:pointer;
          }
    `}</style>
      </div>
    );
  }
}
export default About;
