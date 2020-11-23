import React from "react";
import Home from "./Home";
import About from "./About";
import Nav from "./Nav";
import KakaoSearchCurrent from "../container/KakaoSearchCurrent";
import KakaoSearchRandom from "../container/KakaoSearchRandom";
import KakaoSearch from "../container/KakaoSearch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="web_wrap">
        <nav>
          <Nav id="nav_bar" />
        </nav>
        <main>
          <div className="mobile">
            <p>현재 모바일 버전은</p>
            <p> 이용하실 수가 없습니다.</p>
            <p>PC로 접속 부탁드립니다.</p>
          </div>
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact component={About} />
            <Route path="/currentLocation" component={KakaoSearchCurrent} />
            <Route
              path="/currentLocationRandom"
              component={KakaoSearchRandom}
            />
            <Route path="/searchLocation" component={KakaoSearch} />
            <Route path="/whatToEat" exact component={Home} />
          </Switch>
        </main>
      </div>
      <style jsx>
        {`
          #web_wrap {
            position: relative;
            width: 100wh;
            overflow: hidden;
          }

          nav {
            position: fixed;
            top: 0;
            width: 90%;
            right: 0;
          }
          .mobile {
            display: none;
          }
          @media only screen and (max-width: 499px) {
            .mobile {
              font-size: 8vw;
              font-family: "Do Hyeon";
              color: white;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100vw;
              height: 100vh;
              background-color: black;
              position: fixed;
              z-index: 99;
            }
          }
        `}
      </style>
    </Router>
  );
}

export default App;
