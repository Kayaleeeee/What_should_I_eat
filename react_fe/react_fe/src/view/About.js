import React, { Component } from "react";
import "./scss/about.scss";
import { Link } from "react-scroll";
import About1 from "./About1.js";
import About2 from "./About2.js";
import About3 from "./About3.js";
class About extends Component {
  render() {
    return (
      <div id="About">
        <div className={"logo"}>
          <span>오늘뭐먹지</span>
        </div>
        {/* LOGO */}

        <Link
          className="bg1a"
          activeClass="active"
          to="About1"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <div className="arrow arrow1"></div>
        </Link>

        {/* FIRST CARD */}

        <Link
          className="bg2a"
          activeClass="active"
          to="About2"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <div className="arrow arrow2"></div>
        </Link>
        {/* SECOND CARD */}

        <Link
          className="bg3a"
          activeClass="active"
          to="About3"
          spy={true}
          smooth={true}
          // offset={-70}
          duration={500}
        >
          <div className="arrow arrow3"></div>
        </Link>
        {/* THIRD CARD */}
        <About1 />
        <About2 />
        <About3 />
      </div>
    );
  }
}
export default About;
