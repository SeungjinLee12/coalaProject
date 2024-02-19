import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";

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
        style={{ width: "100%", height: "200px" }}
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
          style={{ marginTop: "5px" }}
          onClick={handleButtonClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

const LectureInfo = () => {
  const { insNo } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [studyLectures, setStudyLectures] = useState([]);
  const [insInfoList, setInsInfoList] = useState([]);

  useEffect(() => {
    console.log(insNo);
    axios
      .get(`${serverUrl}/api/instructorInfo`, {
        params: { insNo: insNo },
      })
      .then((res) => {
        const resResult = res.data;
        setInsInfoList(resResult);
        console.log(insInfoList);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${serverUrl}/api/insLec`, {
        params: { insNo: insNo },
      })
      .then((res) => {
        // 받아온 데이터에서 mainpage_lecture_list를 추출하여 상태를 업데이트
        setStudyLectures(res.data);
      });
  }, [insNo]);

  const zz = () => {
    console.log(insInfoList, studyLectures);
  };

  const formatDate = (datetimeString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(datetimeString).toLocaleString("ko-KR", options);
  };

  return (
    <div className="home" style={{ height: "5000px" }}>
      <h2
        style={{
          marginTop: "50px",
        }}
      >
        강사 소개
      </h2>
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "10px",
          height: "250px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <img
                src={insInfoList[0]?.instructor_image}
                style={{ maxHeight: "230px" }}
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ display: "flex" }}>
                <h1>"{insInfoList[0]?.instructor_name}" 강사님</h1>
                <p style={{ marginTop: "20px", marginLeft: "10px" }}>
                  EMAIL : {insInfoList[0]?.instructor_email}
                </p>
              </div>
              <p style={{ paddingTop: "5px" }}>
                {insInfoList[0]?.instructor_description}
              </p>
              <p style={{ marginTop: "10px" }}>
                경력 : {insInfoList[0]?.instructor_career}
              </p>
            </div>
          </div>
        </div>
        <div className="card-container">
          {studyLectures.map((lecture, index) => (
            <CourseCard key={index} {...lecture} />
          ))}
        </div>
      </div>
    </div>
  );
};

const blue1 = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue1[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  display: flex; /* 추가된 스타일 */
  align-items: center; /* 추가된 스타일 */
  justify-content: center; /* 추가된 스타일 */
  cursor: pointer;
  border: 1px solid ${blue1[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue1[400]}, inset 0 -2px 1px ${blue1[600]};

  &:hover {
    background-color: ${blue1[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue1[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue1[300] : blue1[200]
    };
    outline: none;
  }

  
  &.small {
    font-size: 0.5rem; // 작은 크기에 맞게 조절
  }

  `
);

export default LectureInfo;
