import React from "react";
import Home from "./Home";
import About from "./About";
import Nav from "./Nav";
import Random from "../container/Random";
import KakaoSearchCurrent from "../container/KakaoSearchCurrent";
import KakaoSearchRandom from "../container/KakaoSearchRandom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <Nav />
      </nav>
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/random" component={Random} />
          <Route path="/currentLocation" component={KakaoSearchCurrent} />
          <Route path="/currentLocationRandom" component={KakaoSearchRandom} />
        </Switch>
      </main>
      <style jsx>{`
        nav {
          //여기에 값 수정하시면 돼요!!
          margin: 20px;
        }
      `}
      </style>
    </Router>
  );
}

export default App;
