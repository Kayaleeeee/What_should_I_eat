import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav_container">
      <div className="logo">
        <Link to="whatToEat">
          <span>✨ 오늘뭐먹지</span>
        </Link>
      </div>

      <ul id="nav_ul">
        <li>
          <Link to="/">홈</Link>
        </li>
        {/* 
        <li>
          <Link to="/whatToEat">서비스 바로가기</Link>
        </li> */}

        <li>
          <Link to="/currentLocationRandom">메뉴랜덤추천</Link>
        </li>

        <li>
          <Link to="/currentLocation">주변 뭐먹지</Link>
        </li>

        <li>
          <Link to="/searchLocation">가서 뭐먹지</Link>
        </li>

        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
      </ul>
      <style jsx>{`
        .nav_container {
          width: 90%;
          display: inline-flex;
          overflow: hidden;
          padding: 0.5rem;
          align-items: center;
          justify-content: space-between;
        }

        @font-face {
          font-family: "Do Hyeon";
          src: url("${require("../fonts/DoHyeon-Regular.ttf")}")
            format("truetype");
        }

        #nav_ul {
          padding: 0;
          margin: 0;
        }

        .logo {
          display: inline;
          padding: 0;
          margin: 0;
          font-family: "Do Hyeon";
          font-size: 2rem;
          cursor: pointer;
        }

        .logo span {
          font-size: 2rem;
        }

        .nav_container ul {
          font-family: "Do Hyeon";

          list-style: none;
          display: flex;
          width: 35%;
          justify-content: space-evenly;
        }

        .nav_container a {
          font-weight: lighter;
          font-size: 1.2rem;
          text-decoration: none;
          color: #000000;
        }
        .nav_container a:visited {
          color: #000000;
        }
        .nav_container a:hover {
          color: #b1b1b1;
        }

        .nav_container li {
          font-weight: border;
        }
      `}</style>
    </div>
  );
};

export default Nav;
