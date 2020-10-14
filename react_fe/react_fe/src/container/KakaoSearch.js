import React, { useState } from "react";
import KakaoMap from "./KakaoMap";

const KakaoSearch = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="검색할 장소를 입력해주세요."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit"><h5 className="search_icon">🔎</h5></button>
      </form>
      <KakaoMap searchPlace={place} />

      <style jsx>{`
        .inputForm {
          margin: 1rem auto;
          text-align: center;
          width: 30rem;
       
        }

        input {
          width: 25rem;
          border-radius: 20px;
          border: 1px solid lightgray;
          height: 2rem;
          text-align: center;
        }

        input:focus{
          border:none;
        }

        button {
          margin-left: 1rem;
          padding: .5rem;
          background: lightgray;
          border:none;
          border-radius: 20px;
        }


        .search_icon{
          font-size: 0.5rem;
          padding:0 .5rem;
        }
        fas{
          font-size: 1rem;
        }
      `}</style>
    </>
  );
};

export default KakaoSearch;
