import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ imageSrc, title, description }) => {
  return (
    <div className="card">
      <img className="card-image" src={imageSrc} alt="Course Image" />
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
  const courses = [
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      description: "이승진",
    },
    // Add other courses in a similar format
  ];

  return (
    <div className="home">
      <h1> "~~~~" 검색 결과</h1>
      <div className="card-container">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Search;
