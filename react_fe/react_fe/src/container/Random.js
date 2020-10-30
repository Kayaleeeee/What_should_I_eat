import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Random = ({randomMenu, closeModal}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [randomMenu]);
  return (
    <div className="random_container">
        <h1>오늘의 추천 메뉴는?</h1>
        <div className="randomMenu">
          {loading ? (
            <ClipLoader size={150} color={"#123abc"} loading={loading} />
          ) : (
            randomMenu
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
      `}</style>
    </div>
  );
};

export default Random;