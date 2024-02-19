import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/coalabenner.jpg";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const CourseCard = ({ name, email, image, insNo }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/instructorInfo/${insNo}`);
  };

  return (
    <div
      className="card box actionImg8"
      style={{ marginLeft: "27px", width: "250px" }}
    >
      <img
        className="card-image"
        style={{ marginLeft: "25px", width: "200px", height: "250px" }}
        src={image}
        alt="Course Image"
      />
      <div className="card-content back">
        <div className="back_inner">
          <h2 className="card-title">"{name}"강사님</h2>
          <div style={{ display: "flex" }}>
            <br />
            <h6 style={{ marginTop: "5px", marginLeft: "3px" }}>
              EMAIL : {email}
            </h6>
          </div>
          <br />
          <h6></h6>
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

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [instructorList, setInstructorList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${serverUrl}/api/instructorList`)
      .then((res) => {
        const instructorList = res.data;

        setInstructorList(instructorList);

        console.log(instructorList);
      })
      .catch((error) => {
        console.error(error);
        // 오류 처리를 원하는 대로 추가하세요.
      });
  }, []);
  return (
    <div className="home">
      <div className="banner">
        <img src={Logo} alt="Logo" className="banner-image" />
      </div>
      <div className="horizontal-line"></div>

      <div className="card-container">
        {instructorList.map((instructor, index) => (
          <CourseCard key={index} {...instructor} />
        ))}
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

export default Home;
