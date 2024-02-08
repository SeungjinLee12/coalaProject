import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/coalabenner.jpg";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

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

const CourseCard = ({ imageSrc, title, price, star, lectureNo }) => {
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
        src={imageSrc}
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

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [studyLectures, setStudyLectures] = useState([]);
  const [userInterest1List, setUserInterest1List] = useState([]);
  const [userInterest2List, setUserInterest2List] = useState([]);
  const [userInterest3List, setUserInterest3List] = useState([]);
  const [userStudyList, setUserStudyList] = useState([]);
  const [showAllLectures, setShowAllLectures] = useState(false);
  const handleToggleLectures = () => {
    setShowAllLectures((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${serverUrl}/api/`).then((res) => {
      // 받아온 데이터에서 mainpage_lecture_list를 추출하여 상태를 업데이트
      console.log(res.data);
      setStudyLectures(res.data.mainpage_lecture_list);
    });
  }, []);

  useEffect(() => {
    // currentUser가 null이 아닐 때에만 실행
    if (currentUser !== null) {
      const userNo = currentUser.USER_NO;
      axios
        .post(`${serverUrl}/api/1`, { userNo: userNo })
        .then((res) => {
          const {
            userInterest1List,
            userInterest2List,
            userInterest3List,
            userStudyList,
          } = res.data;

          setUserInterest1List(userInterest1List);
          setUserInterest2List(userInterest2List);
          setUserInterest3List(userInterest3List);
          setUserStudyList(userStudyList);
        })
        .catch((error) => {
          console.error(error);
          // 오류 처리를 원하는 대로 추가하세요.
        });
    }
  }, [currentUser]);

  const handleToggleInterest = (categoryTitle) => {
    axios
      .get(`${serverUrl}/api/research`, { params: { WORD: categoryTitle } })
      .then((res) => {
        const searchResults = res.data;
        const word = categoryTitle;
        navigate(`/api/search/?word=${word}`, {
          state: {
            searchResults,
            word,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

      {currentUser && userStudyList ? (
        <>
          {userStudyList.length > 0 ? (
            <div>
              <div style={{ display: "flex" }}>
                <h2>수강중인 강의</h2>
                {userStudyList.length > 3 && (
                  <button
                    onClick={handleToggleLectures}
                    style={{ marginLeft: "10px" }}
                  >
                    {showAllLectures ? "접기" : "더 보기"}
                  </button>
                )}
              </div>
              <div className="card-container">
                {userStudyList
                  .slice(0, showAllLectures ? userStudyList.length : 3)
                  .map((study, studyIndex) => (
                    <CourseCard
                      key={studyIndex}
                      imageSrc={study.study_imageUrl}
                      title={study.study_title}
                      lectureNo={study.study_lectureNo}
                      star={study.study_star}
                    />
                  ))}
              </div>
              <div className="horizontal-line"></div>
            </div>
          ) : (
            <div>
              <p>수강중인 강의가 없습니다.</p>
              <div className="horizontal-line"></div>
            </div>
          )}
        </>
      ) : null}

      <div>
        {[userInterest1List, userInterest2List, userInterest3List].map(
          (interestList, index) =>
            interestList &&
            interestList.length > 0 && (
              <div key={index}>
                <h2 style={{ display: "inline-block", marginRight: "10px" }}>
                  {`관심분야 ${index + 1}: ${
                    interestList[0][`interest${index + 1}_category_name`]
                  }`}
                </h2>
                <button
                  style={calculateButtonStyle(interestList.length)}
                  onClick={() =>
                    handleToggleInterest(
                      interestList[0][`interest${index + 1}_category_name`]
                    )
                  }
                >
                  더 보기
                </button>

                <div className="card-container">
                  {interestList.slice(0, 3).map((interest, interestIndex) => (
                    <CourseCard
                      key={interestIndex}
                      imageSrc={interest[`interest${index + 1}_imageUrl`]}
                      title={interest[`interest${index + 1}_title`]}
                      price={interest[`interest${index + 1}_price`]}
                      lectureNo={interest[`interest${index + 1}_lectureNo`]}
                      star={interest[`interest${index + 1}_star`]}
                    />
                  ))}
                </div>
                <div className="horizontal-line"></div>
              </div>
            )
        )}
      </div>

      <div className="card-container">
        {studyLectures.map((lecture, index) => (
          <CourseCard key={index} {...lecture} />
        ))}
      </div>
    </div>
  );
};

export default Home;
