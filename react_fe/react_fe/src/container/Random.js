import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Random = () => {
  const menuList = ["한식", "중식", "일식", "양식", "아시안 음식"];
  const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="outline">
      <div className="container">
        <h1>오늘의 추천 메뉴는</h1>
        <p className="randomMenu">
          {loading ? (
            <ClipLoader size={150} color={"#123abc"} loading={loading} />
          ) : (
            randomMenu
          )}
          {!loading && (
            <Link to="/">
              <button>내 주변 식당 추천받기</button>
            </Link>
          )}
        </p>
      </div>
      <style jsx>{`
        .randomMenu {
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          flex-direction: column;
        }
        button {
          margin-top: 80px;
          border: solid 1px #0052cc;
          border-radius: 20px;
          height: 40px;
          width: 200px;
          font-size: 18px;
          background-color: #ffffff;
          color: #0052cc;
          cursor: pointer;
        }
        .outline {
          margin: 0;
          padding: 2rem;
        }
        .container {
          //   background-color: crimson;
          width: 1040px;
          height: 630px;
          margin: auto;
          border-radius: 30px;
          border: 8px solid black;
        }
        h1 {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Random;
