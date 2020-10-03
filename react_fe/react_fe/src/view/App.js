import React from "react";
import Home from "./Home";
import About from "./About";
import Nav from "./Nav";
import Random from "../container/Random";
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
        </Switch>
      </main>
    </Router>
  );
}

export default App;
