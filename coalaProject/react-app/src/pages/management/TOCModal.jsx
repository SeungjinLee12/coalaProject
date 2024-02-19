import React, { useState, useRef } from "react";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";

const TOCModal = ({ onClose, onAddedInstructor }) => {
  const selefile = useRef();

  const [inputChangeTOCTitle, setinputChangeTOCTitle] = useState("");
  const [inputChangeTOCDescription, setinputChangeTOCDescription] =
    useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPath, setVideoPath] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);

  const handleInputTitleChange = (e) => {
    setinputChangeTOCTitle(e.target.value);
  };

  const handleInputDescriptionChange = (e) => {
    setinputChangeTOCDescription(e.target.value);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setVideoPath(reader.result);
    };

    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      setVideoDuration(video.duration);
    };
    video.src = URL.createObjectURL(file);
  };

  const handleSubmit = () => {
    if (videoFile === null) {
      alert("비디오를 넣어주세요");
    } else if (inputChangeTOCTitle === null || inputChangeTOCTitle === "") {
      alert("목차의 제목을 작성해주세요");
    } else if (
      inputChangeTOCDescription === null ||
      inputChangeTOCDescription === ""
    ) {
      alert("목차의 설명을 적어주세요.");
    } else if (inputChangeTOCTitle.length > 50) {
      alert("목차 제목은 50글자 이하로 해주세요");
    } else {
      const tocInfo = {
        videoFile: videoFile, // 비디오 파일 추가
        videoName: videoFile ? videoFile.name : "", // 비디오 파일이 있을 경우 파일 이름을 가져옴
        videoDuration: videoDuration,
        TOCtitle: inputChangeTOCTitle,
        TOCdescription: inputChangeTOCDescription,
        videoPath: videoPath,
      };
      //부모 컴포넌트로 정보를 전달
      onAddedInstructor(tocInfo);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>목차 추가</h2>
        <div style={{ marginLeft: "40px", marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "60px",
            }}
          >
            목차 제목
            <input
              value={inputChangeTOCTitle}
              onChange={handleInputTitleChange}
              placeholder="   Enter Lecture Title"
              style={{
                marginRight: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginLeft: "33px",
                alignItems: "center",
                width: "200px",
                height: "30px",
              }}
            />
          </div>

          <div
            style={{
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "60px",
            }}
          >
            DESCRIPTION
            <br />
            <textarea
              value={inputChangeTOCDescription}
              onChange={handleInputDescriptionChange}
              placeholder="   Enter Lecture Description"
              style={{
                marginTop: "10px",
                marginRight: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginLeft: "-50px",
                alignItems: "center",
                width: "450px",
                height: "200px",
                resize: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <video
              src={videoPath}
              controls
              style={{
                width: "350px",
                height: "200px",
                objectFit: "cover",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="file"
              ref={selefile}
              style={{ display: "none" }}
              accept="video/*"
              onChange={handleVideoChange}
            />
            <Button
              onClick={() => selefile.current.click()}
              style={{ marginLeft: "20px", width: "80px" }}
            >
              비디오
            </Button>
          </div>
          <div style={{ marginLeft: "60px", marginTop: "10px" }}>
            {videoDuration > 0 && <p>비디오 길이: {videoDuration}초</p>}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          style={{
            width: "140px",
            height: "50px",
            display: "flex",
            marginTop: "20px",
            marginLeft: "200px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          추가
        </Button>
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

export default TOCModal;
