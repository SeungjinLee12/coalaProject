import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/숲.jpeg";

const CourseCard = ({ imageSrc, title, description }) => {
  return (
    <div class="box actionImg8" className="card">
      <img className="card-image" src={imageSrc} alt="Course Image" />
      <div class="back" className="card-content">
        <div class="back_inner">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
          <button className="card-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const courses = [
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      description: "이승진",
    },
    // Add other courses in a similar format
  ];

  const interestLanguages = [
    // {
    //   language: "React",
    //   lectures: [
    //     {
    //       imageSrc:
    //         "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
    //       title: "INTEREST LECTURE 1",
    //       description: "Some description for Lecture 1",
    //     },
    //     {
    //       imageSrc:
    //         "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
    //       title: "INTEREST LECTURE 2",
    //       description: "Some description for Lecture 2",
    //     },
    //     // Add other lectures for React
    //   ],
    // },
    {
      language: "Node.js",
      lectures: [
        {
          imageSrc:
            "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
          title: "INTEREST LECTURE 3",
          description: "Some description for Lecture 3",
        },
        {
          imageSrc:
            "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
          title: "INTEREST LECTURE 4",
          description: "Some description for Lecture 4",
        },
        {
          imageSrc:
            "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
          title: "INTEREST LECTURE 4",
          description: "Some description for Lecture 4",
        },
        {
          imageSrc:
            "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
          title: "INTEREST LECTURE 4",
          description: "Some description for Lecture 4",
        },
        // Add other lectures for Node.js
      ],
    },
    // Add other interest languages
  ];

  const [showAllLectures, setShowAllLectures] = useState(false);

  const calculateButtonStyle = (lectureCount) => {
    if (lectureCount <= 3) {
      return { display: "none" };
    } else {
      return { display: "inline-block" };
    }
  };

  return (
    <div className="home">
      <div className="banner">
        <img src={Logo} alt="Logo" className="banner-image" />
      </div>
      <div className="horizontal-line"></div>

      {interestLanguages.map((interestLanguage, index) => (
        <div key={index}>
          <h2 style={{ display: "inline-block", marginRight: "10px" }}>
            {interestLanguage.language}
          </h2>
          {!showAllLectures && (
            <button
              style={calculateButtonStyle(interestLanguage.lectures.length)}
              onClick={() => setShowAllLectures(true)}
            >
              더 보기
            </button>
          )}
          <div className="card-container">
            {interestLanguage.lectures
              .slice(0, showAllLectures ? interestLanguage.lectures.length : 3)
              .map((lecture, lectureIndex) => (
                <CourseCard key={lectureIndex} {...lecture} />
              ))}
          </div>
          <div className="horizontal-line"></div>
        </div>
      ))}

      <div className="card-container">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Home;
