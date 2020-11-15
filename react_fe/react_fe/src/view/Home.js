import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Home extends Component {

  render() {
    return (
      <div className="outline">
        <div className="container">
          <div className="container2">
            <Link to="/currentLocation">
              <div className="img leftimg">
                <span className="option"
                   onMouseOver={()=>{document.querySelector('.darken-overlay1').setAttribute('class','darken-overlay1 dkhover1');
                  }}
                   onMouseLeave={()=>{document.querySelector('.darken-overlay1').setAttribute('class','darken-overlay1')}}
                
                >주변 뭐먹지</span>
                <div
                  onMouseOver={()=>{document.querySelectorAll('.option')[0].setAttribute('class','option onhover')}}
                  onMouseLeave={()=>{document.querySelectorAll('.option')[0].setAttribute('class','option')}}

                  className="darken-overlay1"
                ></div>
              </div>
            </Link>
            <Link to="/searchLocation">
              <div className="img rightimg">
                <span className="option"
                 onMouseOver={()=>{document.querySelector('.darken-overlay2').setAttribute('class','darken-overlay2 dkhover2')}}
                 onMouseLeave={()=>{document.querySelector('.darken-overlay2').setAttribute('class','darken-overlay2')}}
               
                >가서 뭐먹지</span>
                <div

                  onMouseOver={()=>{document.querySelectorAll('.option')[1].setAttribute('class','option onhover')}}
                  onMouseLeave={()=>{document.querySelectorAll('.option')[1].setAttribute('class','option')}}
                  className="darken-overlay2"
                ></div>
              </div>
            </Link>
          </div>
      
        </div>
        <style jsx>{`
          .outline {
            margin: 0;
            padding: 2rem;
            padding-top: 3rem;
            overflow:hidden;
          }

          .container {
            //   background-color: crimson;
            width: 90%;
            height: 85vh;
            margin: auto;
            border-radius: 30px;
            border: 8px solid black;
            overflow: hidden;
          }
          
          .container2 {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .img {
            background-size: cover;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position-x: -70px;
            display: flex;
            justify-content: center;
          }
          .leftimg {
            //      background-image: url("${require("../static/about-bg1.jpg")}");
            border-radius: 20px 0 0 20px;

          }
          .rightimg {
            //     background-image:url("${require("../static/about-bg2.jpg")}");
            border-radius: 0px 20px 20px 0px;
          }
          .darken-overlay1 {
            width: 100%;
            height: 100%;
            border-radius: 20px 0 0 20px;
            transition-duration: 0.3s;
            transition-timing-function:ease-in-out;
            
          }
          .darken-overlay2 {
            width: 100%;
            height: 100%;
            border-radius: 0px 20px 20px 0px;
            transition-duration: 0.3s;
            transition-timing-function:ease-in-out;
          }
          @-webkit-keyframes test {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1
            }
          }
          .dkhover1 {
            width: 100%;
            height: 100%;
            background-image:url("${require("../static/chopsticks.png")}");
            background-size:contain;
            z-index:1;
            background-color:rgba(108,137,255,0.5);
            border-radius: 20px 0 0 20px;
            cursor: pointer;
            -webkit-animation-name: test;
            -webkit-animation-duration: 0.7s;
            -webkit-animation-fill-mode: forwards;
            -webkit-animation-timing-function: ease-out;  
          }
            .dkhover2 {
            width: 100%;
            height: 100%;
            background-image:url("${require("../static/restaurant.png")}");
            background-size:contain;
            z-index:1;
            background-color:rgba(147,118,0,0.5);
            -webkit-animation-name: test;
            -webkit-animation-duration: 0.5s;
            -webkit-animation-fill-mode: forwards;
            -webkit-animation-timing-function: ease-out;  
          }
          .darken-overlay1:hover {
            width: 100%;
            height: 100%;
            background-color:rgba(108,137,255,0.5);
            background-image:url("${require("../static/chopsticks.png")}");
            background-size:contain;
            z-index:1;
            border-radius: 20px 0 0 20px;
            cursor: pointer;
            -webkit-animation-name: test;
            -webkit-animation-duration: 1s;
            -webkit-animation-fill-mode: forwards;
            -webkit-animation-timing-function: ease-out;  
            transition-duration: 0.3s;
            transition-timing-function:ease-in-out;
          }
          .darken-overlay2:hover {
            width: 100%;
            height: 100%;
            background-color:rgba(147,118,0,0.5);
            background-image:url("${require("../static/restaurant.png")}");
            background-size:contain;
            z-index:1;
          
            border-radius: 0px 20px 20px 0px;
            cursor: pointer;

            -webkit-animation-name: test;
            -webkit-animation-duration: 1s;
            -webkit-animation-fill-mode: forwards;
            -webkit-animation-timing-function: ease-out;  
          }
          @keyframes float {
            0% {
              transform: translatey(0px);
            }
            50% {
              transform: translatey(-18px);
            }
            100% {
              transform: translatey(0px);
            }
          }
          .option.onhover{
            transform: translate(-50%, -50%);
            animation: float 1.7s ease-in-out infinite;
          }
          .option {
            font-family: "Do Hyeon";
            position: absolute;
            font-size: 5rem;
            place-self: center;
            color: rgb(236, 240, 229);
            white-space: nowrap;
            text-shadow: 1.5px 1.5px 1.5px rgba(1,1,1,0.5);
            transition-duration:2s;
            transition-timing-function:ease-in-out;
            z-index: 99;

          }
          .option:hover{
            transform: translate(-50%, -50%);
            animation: float 1.7s ease-in-out infinite;
            
          }

          a {
            text-decoration: none;
            color: rgb(236, 240, 229);
            width: 100%;
            height: 100%;
          }
          body.on{
            background-image: linear-gradient(to right, rgba(108,137,255,0.5) 0%, rgba(147,118,0,0.5) 100%);
            100%);
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
