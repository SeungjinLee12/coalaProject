import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Logo from "../img/logo.png";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Lecture_watch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { lectureNo, lectureTitle, tocNo, lectureTOC_list, lectureInfo_list } =
    state;
  const { currentUser } = useContext(AuthContext);

  const [showTOC, setShowTOC] = useState(false);
  const [selectedTOC, setSelectedTOC] = useState(tocNo);
  const [selectedTOCList, setSelectedTOCList] = useState([]);
  const [prevButtonCheck, setprevButtonCheck] = useState(false);
  const [nextButtonCheck, setNextButtonCheck] = useState(false);

  const toggleTOC = () => {
    console.log(
      lectureNo,
      lectureTitle,
      tocNo,
      lectureTOC_list,
      lectureInfo_list,
      "############",
      selectedTOCList
    );
    setShowTOC((prevShowTOC) => !prevShowTOC);
  };

  const handleTOCClick = (tocNo) => {
    console.log(`TOC Clicked: ${tocNo}`);
    setSelectedTOC(tocNo);
  };

  const handleBack = () => {
    navigate(`/lecture/${lectureNo}`);
  };

  useEffect(() => {
    let selectedTOCList = lectureInfo_list.find(
      (lectureInfo_list) => lectureInfo_list.INFO_lectureTOC_NO === selectedTOC
    );
    if (selectedTOCList !== null) {
      setSelectedTOCList(selectedTOCList);
    }
  }, [selectedTOC]);

  const checkPrevButtonStatus = (c) => {
    const checkPrevButton =
      lectureInfo_list[0].INFO_lectureTOC_NO !== selectedTOC;
    setprevButtonCheck(checkPrevButton);
  };

  const checkNextButtonStatus = (selectedTOC) => {
    let a = lectureInfo_list.length - 1;
    const checkNextButton =
      lectureInfo_list[a].INFO_lectureTOC_NO !== selectedTOC;
    setNextButtonCheck(checkNextButton);
  };

  useEffect(() => {
    checkPrevButtonStatus(selectedTOC);
    checkNextButtonStatus(selectedTOC);
  }, [selectedTOC]);

  const handleLectureQnA = () => {
    navigate(`/lecture/QNAList/?lectureNo=${lectureNo}`, {
      state: { lectureNo, lectureTitle },
    });
  };

  const handleNextButton = (selectedTOC) => {
    setSelectedTOC((selectedTOC) => selectedTOC + 1);
  };

  const handlePrevButton = (selectedTOC) => {
    setSelectedTOC((selectedTOC) => selectedTOC - 1);
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
        <h1>{lectureTitle}</h1>
        <div style={{ display: "flex", width: "80%" }}>
          <VideoPlayer
            style={{
              flex: 8,
              height: "400px",
              border: "2px solid #000",
              margin: "10px",
              width: "600px",
            }}
            tocId={selectedTOCList.TOC_no}
            src={selectedTOCList.videoUrl}
          ></VideoPlayer>

          <div
            style={{
              flex: 2,
              height: "400px",
              border: "2px solid #000",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              width: "200px",
            }}
          >
            <Button style={{ margin: "5px" }} onClick={handleLectureQnA}>
              Q&A
            </Button>
            <Button style={{ margin: "5px" }} onClick={toggleTOC}>
              목차
            </Button>
            {showTOC && (
              <ul style={{ marginLeft: "25px" }}>
                {lectureTOC_list.map((toc, index) => (
                  <li key={index} onClick={() => handleTOCClick(toc.tocNo)}>
                    <strong>{toc.toc_title}</strong>
                  </li>
                ))}
              </ul>
            )}
            <Button
              style={{ margin: "5px", marginTop: "auto" }}
              onClick={handleBack}
            >
              강의화면으로 돌아가기
            </Button>
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
          {prevButtonCheck && (
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handlePrevButton(selectedTOC)}
            >
              &lt; prev
            </Button>
          )}
          {nextButtonCheck && (
            <Button onClick={() => handleNextButton(selectedTOC)}>
              next &gt;
            </Button>
          )}
        </div>
        <div style={{ marginTop: "80px", marginRight: "80%" }}>
          <h3>이번 화 내용 :{selectedTOCList.INFO_description}</h3>
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
