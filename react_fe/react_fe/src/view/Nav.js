import React from "react";
import { Link } from "react-router-dom";

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
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          width: 1040px;
          margin: auto;
          justify-content: flex-end;
        }
        a {
          text-decoration: none;
        }
        a:visited {
          color: #000000;
        }
        a:hover {
          color: #b1b1b1;
        }
      `}</style>
    </div>
  );
};

export default Nav;
