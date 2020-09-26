import React from "react";
import Home from "./view/Home";
import About from "./view/About";
import Nav from "./view/Nav";
import Random from "./view/Random";
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
