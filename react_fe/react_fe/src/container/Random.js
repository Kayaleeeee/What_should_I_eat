import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Random = () => {
  const menuList = ["퓨전요리", "한식", "분식", "해장국", "삼겹살", "생선", "우동",
    "음식점", "떡볶이", "국밥", "회", "일본식주점", "두부전문점", "해물", "전골",
    "돈까스", "도넛", "멕시칸", "햄버거", "찌개", "닭요리", "일식", "일식집", "브라질", 
    "전골", "치킨", "이탈리안", "삼겹살", "게", "대게", "족발", "보쌈", "아시아음식", "초밥", 
    "롤", "퓨전일식", "중화요리", "갈비", "스테이크", "립", "양식", "동남아음식", "곱창", "막창", 
    "양꼬치", "샌드위치", "패스트푸드", "도시락", "설렁탕"];
  const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
  localStorage.setItem("randomMenu", randomMenu);
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
            <Link to="/currentLocationRandom">
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
          width: 90%;
          height: 85vh;
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