import React, { useState, useEffect } from "react";

const Random = ({randomMenu, closeModal}) => {
  const [loading, setLoading] = useState(true);
  const [randomMenuIcon, setRandomMenuIcon] = useState("🍴");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setRandomMenuIcon(()=> {
      if (randomMenu.includes("면") || randomMenu.includes("우동")) {
        return "🍜";
      }
      else if (randomMenu.includes("한식") || randomMenu.includes("밥")) {
        return "🍚";
      }
      else if (randomMenu.includes("국") || randomMenu.includes("탕")) {
        return "🍲";
      }
      else if (randomMenu.includes("육류") || randomMenu.includes("고기")) {
        return "🥓";
      }
      else if (randomMenu.includes("도시락")) {
        return "🍱";
      }
      else if (randomMenu.includes("일식") || randomMenu.includes("초밥")) {
        return "🍣";
      }
      else if (randomMenu.includes("카레")) {
        return "🍛";
      }
      else if (randomMenu.includes("꼬치")) {
        return "🍢";
      }
      else if (randomMenu.includes("다방")) {
        return "☕️";
      }
      else if (randomMenu.includes("칵테일")) {
        return "🍸";
      }
      else if (randomMenu.includes("와인")) {
        return "🍷";
      }
      else if (randomMenu.includes("해물") || randomMenu.includes("생선")) {
        return "🦐";
      }
      else if (randomMenu.includes("패스트푸드") || randomMenu.includes("햄버거")) {
        return "🍔";
      }
      else if (randomMenu.includes("카페") || randomMenu.includes("디저트")) {
        return "🍰";
      }
      else if (randomMenu.includes("제과") || randomMenu.includes("베이커리") || randomMenu.includes("빵")) {
        return "🥐";
      }
      else if (randomMenu.includes("샌드위치")) {
        return "🥪";
      }
      else if (randomMenu.includes("피자")) {
        return "🍕";
      }
      else if (randomMenu.includes("치킨") || randomMenu.includes("닭")) {
        return "🍗";
      }
      else if (randomMenu.includes("주점") || randomMenu.includes("술")) {
        return "🍶";
      }
      else if (randomMenu.includes("맥주") || randomMenu.includes("호프")) {
        return "🍺";
      }
      else if (randomMenu.includes("스테이크") || randomMenu.includes("립")) {
        return "🥩";
      }
      else if (randomMenu.includes("양식") || randomMenu.includes("파스타") || randomMenu.includes("스파게티")) {
        return "🍝";
      }
      else if (randomMenu.includes("찌개") || randomMenu.includes("전골")) {
        return "🥘";
      }
      else if (randomMenu.includes("튀김") || randomMenu.includes("분식")) {
        return "🍤";
      }
      else if (randomMenu.includes("멕시칸") || randomMenu.includes("브라질") || randomMenu.includes("타코")) {
        return "🌮";
      }
      else {
        return "🍴";
      }
    })
  }, [randomMenu]);
  return (
    <div className="random_container">
        <h1>😋오늘의 추천 메뉴는?🧐</h1>
        <div className="randomMenu">
          {loading ? (
            <img src={require("../static/food.gif")} alt="food image" />
          ) : (
            randomMenuIcon + randomMenu + randomMenuIcon
          )}
          {!loading && (
            <button onClick={closeModal}>내 주변 식당 추천받기</button>
          )}
        </div>
      <style jsx>{`
        .random_container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .randomMenu {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 40px;
          flex-direction: column;
          margin-top: 100px;
        }
        button {
          margin-top: 70px;
          border: solid 1px #0052cc;
          border-radius: 20px;
          height: 40px;
          width: 200px;
          font-size: 18px;
          background-color: #ffffff;
          color: #0052cc;
          cursor: pointer;
        }
        h1 {
          text-align: center;
        }
        .randomMenu img {
          width: 5rem;
        }
      `}</style>
    </div>
  );
};

export default Random;