import React, { useState, useContext } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { AuthContexProvider, AuthContext } from "../context/authContext";
import { useAuth } from "../context/authContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const WriteQNA = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { lectureNo, lectureTitle } = state;
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const handleQuestionTitle = (e) => {
    setQuestionTitle(e.target.value);
  };

  const handleQuestionContent = (e) => {
    setQuestionContent(e.target.value);
  };

  const handleSubmitButton = () => {
    const userNo = currentUser.USER_NO;
    if (
      questionTitle !== "" &&
      questionContent !== "" &&
      questionTitle.length < 30 &&
      questionContent.length < 3050
    ) {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!");
      axios
        .post(`${serverUrl}/lecture/writeQNA`, {
          TITLE: questionTitle,
          userNo: userNo,
          lectureNo: lectureNo,
          QUESTION: questionContent,
        })
        .then((res) => {
          console.log("dasfkjdsnfkjdsanfajkd", res.data.lectureNo1);
          alert("질문이 작성되었습니다");
          navigate(`/lecture/QNAList/?lectureNo=${res.data.lectureNo1}`, {
            state: { lectureNo, lectureTitle },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (questionTitle === "" || questionTitle === null) {
      alert("제목을 작성해주세요");
    } else if (questionContent === null || questionContent === "") {
      alert("질문을 작성해주세요");
    } else if (questionTitle.length > 30) {
      alert("질문의 제목은 30자 이하만 작성이 가능합니다.");
    } else if (questionContent.length > 3000) {
      alert("질문은 3000자 이하만 작성이 가능합니다.");
    }
  };

  return (
    <div>
      <div>
        <h1>Question - {lectureTitle}</h1>
      </div>
      <h3 style={{ marginTop: "20px" }}> 제목 :</h3>
      <textarea
        type="text"
        style={{
          marginTop: "5px",
          border: "3px solid black",
          width: "100%",
          height: "50px",
          padding: "10px",
          boxSizing: "border-box",
          whiteSpace: "normal", // 줄 바꿈을 하지 않음
        }}
        value={questionTitle}
        onChange={handleQuestionTitle} // 입력된 값을 표시
      />
      <div style={{ marginTop: "10px" }}>
        <h3>질문 내용 :</h3>
      </div>
      <div>
        <textarea
          type="text"
          style={{
            marginTop: "5px",
            border: "3px solid black",
            width: "100%",
            height: "300px",
            padding: "10px",
            boxSizing: "border-box",
            whiteSpace: "normal", // 줄 바꿈을 하지 않음
          }}
          value={questionContent}
          onChange={handleQuestionContent} // 입력된 값을 표시
        />
      </div>
      <div>
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          onClick={handleSubmitButton}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

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

export default WriteQNA;
