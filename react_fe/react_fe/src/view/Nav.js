import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav_container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        &nbsp;|&nbsp;
        <li>
          <Link to="/random">랜덤 추천 메뉴</Link>
        </li>
        &nbsp;|&nbsp;
        <li>
          <Link to="/about">About</Link>
        </li>
        &nbsp;|&nbsp;
        <li>
          <Link to="/currentLocation">내 위치 기반 추천</Link>
        </li>
        &nbsp;|&nbsp;
        <li>Menu2</li>
      </ul>
      <style jsx>{`

        // .nav_container{
        //   position:fixed;
        //   top:0;
        //   width:100%;
        // }

        .nav_container ul {
          // padding-top:.5rem;
          list-style: none;
          display: flex;
          width: 90%;
          justify-content: flex-end;
        }

        .nav_container a {
          font-size: 1rem;
          padding: 0.5rem;
          text-decoration: none;
        }
        .nav_container a:visited {
          color: #000000;
        }
        .nav_container a:hover {
          color: #b1b1b1;
        }

      `}</style>
    </div>
  );
};

export default Nav;
