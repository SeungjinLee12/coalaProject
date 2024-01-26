// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../img/숲.jpeg";

// const CourseCard = ({ imageSrc, title, description }) => {
//   return (
//     <div class="box actionImg8" className="card">
//       <img className="card-image" src={imageSrc} alt="Course Image" />
//       <div class="back" className="card-content">
//         <div class="back_inner">
//           <h2 className="card-title">{title}</h2>
//           <p className="card-description">{description}</p>
//           <button className="card-button">Learn More</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   const courses = [
//     {
//       imageSrc:
//         "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//       title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
//       description: "이승진",
//     },
//     // Add other courses in a similar format
//   ];

//   const interestLanguages = [
//     {
//       language: "React",
//       lectures: [
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 1",
//           description: "Some description for Lecture 1",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 1",
//           description: "Some description for Lecture 1",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 1",
//           description: "Some description for Lecture 1",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 1",
//           description: "Some description for Lecture 1",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 1",
//           description: "Some description for Lecture 1",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 1",
//           description: "Some description for Lecture 1",
//         },

//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 2",
//           description: "Some description for Lecture 2",
//         },
//         // Add other lectures for React
//       ],
//     },
//     {
//       language: "Node.js",
//       lectures: [
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 3",
//           description: "Some description for Lecture 3",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 4",
//           description: "Some description for Lecture 4",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 4",
//           description: "Some description for Lecture 4",
//         },
//         {
//           imageSrc:
//             "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
//           title: "INTEREST LECTURE 4",
//           description: "Some description for Lecture 4",
//         },
//         // Add other lectures for Node.js
//       ],
//     },
//     // Add other interest languages
//   ];
//   const [showAllLectures, setShowAllLectures] = useState(false);

//   const calculateButtonStyle = (lectureCount) => {
//     if (lectureCount <= 3) {
//       return { display: "none" };
//     } else {
//       return { display: "inline-block" };
//     }
//   };

//   return (
//     <div className="home">
//       <div className="banner">
//         <img src={Logo} alt="Logo" className="banner-image" />
//       </div>
//       <div className="horizontal-line"></div>

//       {interestLanguages.map((interestLanguage, index) => (
//         <div key={index}>
//           <h2 style={{ display: "inline-block", marginRight: "10px" }}>
//             {interestLanguage.language}
//           </h2>
//           {!showAllLectures && (
//             <button
//               style={calculateButtonStyle(interestLanguage.lectures.length)}
//               onClick={() => setShowAllLectures(true)}
//             >
//               더 보기
//             </button>
//           )}
//           <div className="card-container">
//             {interestLanguage.lectures
//               .slice(0, showAllLectures ? interestLanguage.lectures.length : 3)
//               .map((lecture, lectureIndex) => (
//                 <CourseCard key={lectureIndex} {...lecture} />
//               ))}
//           </div>
//           <div className="horizontal-line"></div>
//         </div>
//       ))}

//       <div className="card-container">
//         {courses.map((course, index) => (
//           <CourseCard key={index} {...course} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../img/숲.jpeg";
import { AuthContext } from "../context/authContext";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const CourseCard = ({ imageSrc, title, description }) => {
  // console.log("%%%%%%%%%%%%%%", title);
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
  const { currentUser } = useContext(AuthContext);
  // const [studyLectures, setStudyLectures] = useState([]);
  const [userInterest1List, setUserInterest1List] = useState([]);
  const [userInterest2List, setUserInterest2List] = useState([]);
  const [userInterest3List, setUserInterest3List] = useState([]);
  const [userStudyList, setUserStudyList] = useState([]);
  const [showAllLectures, setShowAllLectures] = useState(false);

  console.log("@@@@@@@@@@@@@@@@", currentUser.USER_NO);

  useEffect(() => {
    // currentUser가 null이 아닐 때에만 실행
    if (currentUser !== null) {
      axios
        .post(`${serverUrl}/api/1`, { userNo: currentUser.USER_NO })
        .then((res) => {
          const {
            userInterest1List,
            userInterest2List,
            userInterest3List,
            userStudyList,
          } = res.data;

          setUserInterest1List(userInterest1List); // 배열인지 확인
          setUserInterest2List(userInterest2List);
          setUserInterest3List(userInterest3List);
          setUserStudyList(userStudyList);
          // console.log(userInterest1List);
          console.log("userInterest1List:", res.data.userInterest1List);

          // setStudyLectures(res.data.mainpage_lecture_list);
        })
        .catch((error) => {
          console.error(error);
          // 오류 처리를 원하는 대로 추가하세요.
        });
    }
  }, [currentUser]);

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

      {[userInterest1List, userInterest2List, userInterest3List].map(
        (interestList, index) => (
          <div key={index}>
            <h2 style={{ display: "inline-block", marginRight: "10px" }}>
              {/* 여기에 관심 언어의 이름을 표시하거나 원하는 대로 수정하세요 */}
              {`Interest ${index + 1}`}
            </h2>
            {!showAllLectures && (
              <button
                style={calculateButtonStyle(interestList.length)}
                onClick={() => setShowAllLectures(true)}
              >
                더 보기
              </button>
            )}
            <div className="card-container">
              {interestList
                .slice(0, showAllLectures ? interestList.length : 3)
                .map((interest, interestIndex) => (
                  <CourseCard key={interestIndex} {...interest} />
                ))}
            </div>
            <div className="horizontal-line"></div>
          </div>
        )
      )}

      <div className="card-container">
        {studyLectures.map((lecture, index) => (
          <CourseCard key={index} {...lecture} />
        ))}
      </div>
    </div>
  );
};

export default Home;
