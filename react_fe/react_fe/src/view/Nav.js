import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav_container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/currentLocationRandom">메뉴랜덤추천</Link>
        </li>

        <li>
          <Link to="/currentLocation">주변 뭐먹지</Link>
        </li>

        <li>
          <Link to="/searchLocation">가서 뭐먹지</Link>
        </li>


        <li>
          <Link to="/about">About</Link>
        </li>
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

        .nav_container li {
          font-weight: border;
        }

      `}</style>
    </div>
  );
};

export default Nav;
