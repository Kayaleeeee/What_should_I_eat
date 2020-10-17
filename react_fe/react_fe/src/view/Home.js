import React,{Component,Fragment} from "react";
import KakaoMapView from "./KakaoMapView";

class Home extends Component {

  state={
    choose:true,
  }
  chooseright=()=>{
    this.setState({choose:false});
  }

  render(){

    const{choose}=this.state;
  
    return (
    <div className="outline">
      <div className="container">
      
          { choose ? 
          (
          <div className="container2">
          <div className="img leftimg" ><span className="option">주변 뭐먹지</span><div className="darken-overlay1"></div></div>
          <div className="img rightimg"><span className="option">가서 뭐먹지</span><div onClick={this.chooseright} className="darken-overlay2"></div></div>
          </div>

          )
          :(
            <Fragment>
            <KakaoMapView />
            <div className="map"></div>
            </Fragment>)
          }
      </div>
      <style jsx>{`
        .outline {
          margin: 0;
         padding: 2rem;
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
        .container2{
          width:100%;
          height:100%;
          display:flex;
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
        }
        .darken-overlay2 {
          width: 100%;
          height: 100%;
          border-radius: 0px 20px 20px 0px;
        }
        .darken-overlay1:hover {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 20px 0 0 20px;
          cursor: pointer;
        }
        .darken-overlay2:hover {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 0px 20px 20px 0px;
          cursor:pointer;
        }
        .option {
          font-family: "Do Hyeon";
          position: absolute;
          font-size: 5rem;
          place-self: center;
          color: rgb(236, 240, 229);
        }
      `}</style>
    </div>
  );}
}

export default Home;
