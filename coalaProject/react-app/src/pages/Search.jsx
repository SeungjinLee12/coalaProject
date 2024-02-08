import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const addCommasToPrice = (price) => {
  // 숫자를 문자열로 변환
  if (price == null) {
    return "";
  }
  const priceString = price.toString();

  // 천 단위로 쉼표를 추가한 문자열 생성
  let formattedPrice = "";
  for (let i = 0; i < priceString.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedPrice = "," + formattedPrice;
    }
    formattedPrice = priceString[priceString.length - 1 - i] + formattedPrice;
  }

  return formattedPrice;
};

const CourseCard = ({ imageUrl, title, price, star, lectureNo }) => {
  const formattedPrice = addCommasToPrice(price);
  const navigate = useNavigate();

  const createEmptyStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>&#9734;</span>); // 별 모양의 유니코드
    }
    return stars;
  };

  // 칠해진 별을 생성하는 함수
  const createFilledStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < count ? "gold" : "grey" }}>
          &#9733;
        </span> // 별 모양의 유니코드
      );
    }
    return stars;
  };

  const handleButtonClick = () => {
    navigate(`/lecture/${lectureNo}`);
  };

  return (
    <div className="card box actionImg8" style={{}}>
      <img
        className="card-image"
        style={{ width: "!00%", height: "200px" }}
        src={imageUrl}
        alt="Course Image"
      />
      <div className="card-content back">
        <div className="back_inner">
          <h2 className="card-title">{title}</h2>
          <div style={{ display: "flex" }}>
            <br />
            {star !== undefined
              ? createFilledStars(star)
              : createEmptyStars()}{" "}
            <h6 style={{ marginTop: "5px", marginLeft: "3px" }}>({star}점)</h6>
          </div>
          <br />
          <h6>{formattedPrice}원</h6>
        </div>
        <button
          className="card-button"
          style={{ marginBottom: "5px", marginLeft: "5px" }}
          onClick={handleButtonClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get("word");
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  // Extract status and research_res from searchResults
  const { status, research_res } = searchResults;

  return (
    <div className="home">
      <h1 style={{ marginTop: "10px" }}>"{myParam}"에 대한 검색 결과</h1>

      {status === "yes" ? (
        <div className="card-container">
          {research_res.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      ) : (
        <div
          style={{ display: "flex", marginTop: "200px", marginLeft: "20px" }}
        >
          <h1>검색 결과가 없어요 ㅠ </h1>
        </div>
      )}
      {/* <div className="horizontal-line" style={{ marginTop: "10px" }}></div> */}
    </div>
  );
};

export default Search;
