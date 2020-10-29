import React from "react";
import Home from "./Home";
import About from "./About";
import Nav from "./Nav";
import Random from "../container/Random";
import KakaoSearchCurrent from "../container/KakaoSearchCurrent";
import KakaoSearchRandom from "../container/KakaoSearchRandom";
import KakaoSearch from "../container/KakaoSearch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="web_wrap">
        <nav>
        <Nav id ="nav_bar"/>
      </nav>
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/random" component={Random} />
          <Route path="/currentLocation" component={KakaoSearchCurrent} />
          <Route path="/currentLocationRandom" component={KakaoSearchRandom} />
          <Route path="/searchLocation" component={KakaoSearch} />
        </Switch>
      </main>
      </div>
      <style jsx>{`

        #web_wrap{
          position:relative;
          width: 100wh;
          // height:100vh;
          overflow:hidden;
        }

        // main{
        //   width: 90%;
        //   height: 85vh;
        //   margin: auto;
        //   border-radius: 30px;
        //   border: 8px solid black;
        //   overflow: hidden;
        // }
        
        nav{
          position: fixed;
          top:0;
          width:90%;
          right:0;
        }
        `}
</style>
    </Router>
  );
}

export default App;
