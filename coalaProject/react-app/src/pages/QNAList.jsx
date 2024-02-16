import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import axios from "axios";
import WriteQNA from "./WriteQNA";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const QNAList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { lectureNo, lectureTitle } = state;
  const [QNAList, setQNAList] = useState([]);

  const reversedQuestions = [...QNAList].reverse();

  useEffect(() => {
    axios
      .get(`${serverUrl}/lecture/QNAList/?LectureNo=${lectureNo}`)
      .then((res) => {
        console.log(lectureNo);
        setQNAList(res.data);
      });
  }, []);
  const WriteQ = () => {
    navigate(`/lecture/writeQNA/?lectureNo=${lectureNo}`, {
      state: { lectureNo, lectureTitle },
    });
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

  const handleClick = (questionNo, userName, inserttime, questionTitle) => {
    navigate(`/lecture/QNA/?lectureNo=${lectureNo}&questionNo=${questionNo}`, {
      state: {
        lectureNo,
        lectureTitle,
        userName,
        inserttime,
        questionNo,
        questionTitle,
      },
    });
  };
  const handleButtonPrev = () => {
    navigate(`/lecture/${lectureNo}`);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginLeft: "20px" }}>Q&A - {lectureTitle}</h1>
        <Button style={{ marginLeft: "650px" }} onClick={handleButtonPrev}>
          강의소개로 가기
        </Button>
      </div>

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
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                width: "200px",
              }}
            >
              작성자
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                width: "200px",
              }}
            >
              작성시간
            </th>
          </tr>
        </thead>
        <tbody>
          {reversedQuestions.map((QNAList, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {reversedQuestions.length - index}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {QNAList.userName}
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "8px" }}
                onClick={() =>
                  handleClick(
                    QNAList.questionNo,
                    QNAList.userName,
                    QNAList.inserttime,
                    QNAList.questionTitle
                  )
                }
              >
                {QNAList.questionTitle}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {formatDate(QNAList.inserttime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button style={{ marginLeft: "93%", marginTop: "20px" }} onClick={WriteQ}>
        Q&A작성
      </Button>
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

export default QNAList;
