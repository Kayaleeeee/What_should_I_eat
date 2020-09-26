import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./scss/random.scss";
import ClipLoader from "react-spinners/ClipLoader";

const Random = () => {
  const menuList = ["한식", "중식", "일식", "양식", "아시안 음식"];
  const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className={"outline"}>
      <div className={"container"}>
        <h1>오늘의 추천 메뉴는</h1>
        <p className="randomMenu">
          {loading ? (
            <ClipLoader size={150} color={"#123abc"} loading={loading} />
          ) : (
            randomMenu
          )}
          {!loading && (
            <button>
              <Link to="/">내 주변 식당 추천받기</Link>
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Random;
