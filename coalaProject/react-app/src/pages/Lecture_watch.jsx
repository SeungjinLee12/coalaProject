import React, { useState } from "react";
import Logo from "../img/logo.png";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

const Lecture_watch = () => {
  const lectureData = {
    lectureView: [
      {
        title: "JAVA",
        period: "02:00:00",
        imageUrl:
          "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
        price: null,
        star: null,
        description: "Introduction to Programming",
      },
    ],
    lectureTOC_list: [
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },

      // ... (다른 TOC 항목들)
    ],
  };

  const [showTOC, setShowTOC] = useState(false);

  const toggleTOC = () => {
    setShowTOC((prevShowTOC) => !prevShowTOC);
  };

  return (
    <div>
      <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          className="logo-name"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="logo">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </div>

          <div className="name">
            <h1 style={{ marginBottom: "5px" }}>코알라?</h1>
            <h4 style={{ margin: 0 }}>코드 알아가볼래?</h4>
          </div>
        </div>
      </a>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {lectureData.lectureView.map((lecture, index) => (
          <h1 key={index}>{lecture.title}</h1>
        ))}
        <div style={{ display: "flex", width: "80%" }}>
          <div
            style={{
              flex: 8,
              height: "400px",
              border: "2px solid #000",
              margin: "10px",
            }}
          ></div>

          <div
            style={{
              flex: 2,
              height: "400px",
              border: "2px solid #000",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button style={{ margin: "5px" }}>Q&A</Button>
            <Button style={{ margin: "5px" }} onClick={toggleTOC}>
              목차
            </Button>

            {showTOC && (
              <ul style={{ marginLeft: "25px" }}>
                {lectureData.lectureTOC_list.map((toc, index) => (
                  <li key={index}>
                    <strong>{toc.title}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",
          }}
        >
          <Button style={{ marginRight: "5px" }}> &lt; prev</Button>
          <Button>next &gt;</Button>
        </div>
        <div style={{ marginTop: "20PX" }}>
          {lectureData.lectureTOC_list.length > 0 && (
            <h3>
              이번 화 내용 :
              ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
              {lectureData.lectureTOC_list[0].TOC_description}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

const blue = {
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
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  `
);

export default Lecture_watch;
