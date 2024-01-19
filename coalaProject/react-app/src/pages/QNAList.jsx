import React from "react";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

const QNAList = () => {
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
  };

  const questions = [
    {
      questionTitle: "test1231231231231",
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    // ... (다른 질문들)
    {
      questionTitle: "test1231231231231",
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
    {
      questionTitle: null,
      userName: "이승진123",
      lecture_title: "JAVA",
    },
  ];

  const reversedQuestions = [...questions].reverse();

  return (
    <div style={{ marginTop: "20px" }}>
      {lectureData.lectureView.map((lecture, index) => (
        <h1 key={index} style={{ marginLeft: "20px" }}>
          Q&A - {lecture.title}
        </h1>
      ))}

      <table
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#c0c0c0" }}>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                width: "10%",
              }}
            >
              No.
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px", width: "" }}>
              Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
          </tr>
        </thead>
        <tbody>
          {reversedQuestions.map((question, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {questions.length - index}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {question.userName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {formatDate(question.questionTitle)}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button style={{ marginLeft: "93%", marginTop: "20px" }}>Q&A작성</Button>
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

export default QNAList;
