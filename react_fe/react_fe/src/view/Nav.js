import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        &nbsp;|&nbsp;
        <li>
          <Link to="./random">랜덤 추천 메뉴</Link>
        </li>
        &nbsp;|&nbsp;
        <li>
          <Link to="/about">About</Link>
        </li>
        &nbsp;|&nbsp;
        <li>Menu1</li>
        &nbsp;|&nbsp;
        <li>Menu2</li>
      </ul>
    </div>
  );
};

export default Nav;
