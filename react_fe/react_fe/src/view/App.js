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
          <Nav id ="nav_bar"/>
        </nav>
      <main>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact component={About} />
          <Route path="/currentLocation" component={KakaoSearchCurrent} />
          <Route path="/currentLocationRandom" component={KakaoSearchRandom} />
          <Route path="/searchLocation" component={KakaoSearch} />
          <Route path="/whatToEat" exact component={Home} />
        </Switch>
      </main>
      </div>
      <style jsx>{`

        #web_wrap{
          position:relative;
          width: 100wh;
          overflow:hidden;
        }
        
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
