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
        <button type="submit">검색</button>
      </form>
      <KakaoMap searchPlace={place} />

      <style jsx>{`
        .inputForm {
          margin: 1rem auto;
          text-align: center;
          width: 20rem;
        }

        input {
          width: 15rem;
          height: 2rem;
        }

        button {
          margin-left: 1rem;
          padding: 0.2rem;
        }
      `}</style>
    </>
  );
};

export default KakaoSearch;
