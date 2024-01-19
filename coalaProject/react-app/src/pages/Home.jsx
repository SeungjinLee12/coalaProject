import { Link } from "react-router-dom";
import Logo from "../img/coalabenner.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const CourseCard = ({ imageSrc, title, description }) => {
  return (
    <div className="card box actionImg8">
      <img className="card-image" src={imageSrc} alt="Course Image" />
      <div className="card-content back">
        <div className="back_inner">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
          <button className="card-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [studyLectures, setStudyLectures] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/api/`).then((res) => {
      // 받아온 데이터에서 mainpage_lecture_list를 추출하여 상태를 업데이트
      console.log(res.data);
      setStudyLectures(res.data.mainpage_lecture_list);
    });
  }, []);

  return (
    <div className="home">
      <div className="banner">
        <img src={Logo} alt="Logo" className="banner-image" />
      </div>
      <div className="horizontal-line"></div>
      <div className="card-container">
        {studyLectures.map((lecture, index) => (
          <CourseCard
            key={index}
            imageSrc={lecture.imageUrl}
            title={lecture.title}
            description={lecture.star !== null ? lecture.star : 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
