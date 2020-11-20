import React, { Component } from "react";
import {Link} from'react-router-dom'; 

class About1 extends Component {
  state = {};
  render() {
    return (
      <div id="About2">
        <div className="bg2txt">
          <span>
            "주위 식당들을
            <br /></span>
          <span>한눈에 비교할 수 있다면?"</span>
          <div className="service_btn"> 
          <h3 ><Link className="service_btn_title" to ="/whatToEat"> 👉 서비스 이용하기 </Link></h3></div>
        </div>
        <div className="bg2map">
        </div>
        <style jsx>{`

            .service_btn{
              color: white;
              display:flex;
              justify-content: flex-end;
              text-shadow:none;
              
            }

            .service_btn h3{
              font-size: 2rem;
            }

     
            .service_btn_title{
              background-color: #fc8403;
              display: inline;
              padding: 0.5rem 1.5rem;
              font-weight:lighter;
              border-radius: 10px;
              text-decoration:none;
          
            }

            a.service_btn_title:visited{
              color:white;
      
            }

            h5{
              margin-top:3rem;
              margin-bottom:0;
              padding:0;
            }

            a.service_btn_title:hover{
              transition:0.2s;
              background-color:#f07c00;
              box-shadow : 6px 6px black;
            }



        `}
        </style>
      </div>
      
    );
  }
}

export default About1;
