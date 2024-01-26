import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CourseCard = ({ imageUrl, title, description }) => {
  return (
    <div className="card">
      <img className="card-image" src={imageUrl} alt="Course Image" />
      <div className="back card-content">
        <div className="back_inner">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
          <button className="card-button">Learn More</button>
        </div>
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
