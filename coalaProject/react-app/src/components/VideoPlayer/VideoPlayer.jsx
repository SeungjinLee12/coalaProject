/**
 * Update User : woo
 * Last : 24.01.31
 * Description : Player
 */

import React, { useContext, useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";
import ProgressBar from "../ProgressBar";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function VideoPlayer({ tocNo, src, lectureNo }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const [selectedTOC, setTocNo] = useState("");

  // const [videoStatus, setVideoStatus] = useState(false);

  useEffect(() => {
    setCurrentTime(0);
    setTocNo(tocNo);
  }, [tocNo]);

  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    console.log(selectedTOC, src, lectureNo);
    videoRef.current.pause();
  };

  const fastForward = () => {
    videoRef.current.currentTime += 10;
  };

  const rewind = () => {
    videoRef.current.currentTime -= 10;
  };
  const restartVideo = () => {
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  useEffect(() => {
    const video = videoRef.current;
    let playIntervalId;

    const timeUpdateHandler = () => {
      setCurrentTime(video.currentTime);
    };

    const loadedMetadataHandler = () => {
      setDuration(video.duration);
    };

    const sendProgressToServer = async () => {
      const currentTime = videoRef.current.currentTime;
      console.log(`Sending progress to server: ${currentTime}`, selectedTOC);
      const res = await axios.post(`${serverUrl}/lecture/tocInfoSet`, {
        TOCNo: selectedTOC,
        userNo: currentUser.USER_NO,
        Progress: currentTime,
        lectureNo: lectureNo,
      });
      console.log("woo", res.data);
      if (res.data.success) {
        console.log(res.data.message);
      } else {
        alert(res.data.message);
      }
    };

    const handleVideoEnd = () => {
      // 비디오가 끝났을 때
      setCurrentTime(video.duration);
      console.log("영상 끝!", video.duration);

      clearInterval(playIntervalId);
      video.removeEventListener("timeupdate", timeUpdateHandler);

      sendProgressToServer();
    };

    const handlePlayButtonClick = () => {
      playIntervalId = setInterval(() => {
        sendProgressToServer();
      }, 1000);
      video.addEventListener("timeupdate", timeUpdateHandler);
      video.addEventListener("ended", handleVideoEnd);
    };
    video.addEventListener("play", handlePlayButtonClick);
    video.addEventListener("loadedmetadata", loadedMetadataHandler);

    return () => {
      clearInterval(playIntervalId);
      video.removeEventListener("timeupdate", timeUpdateHandler);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("play", handlePlayButtonClick);
      video.removeEventListener("loadedmetadata", loadedMetadataHandler);
    };
  }, [selectedTOC]);

  return (
    <div className="video-container">
      <video className="video-player" ref={videoRef} src={src}></video>

      <div className="controls">
        <button className="control-button" onClick={playVideo}>
          Play
        </button>

        <button className="control-button" onClick={pauseVideo}>
          Pause
        </button>

        <button className="control-button" onClick={rewind}>
          10초 전으로
        </button>

        <button className="control-button" onClick={fastForward}>
          10초 후로
        </button>

        <button className="control-button" onClick={restartVideo}>
          다시 보기
        </button>
      </div>

      <div>
        <div
          className="progress-bar"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <ProgressBar
            progress={Number(((currentTime / duration) * 100).toFixed(0))}
          />

          <div
            className="time-indicator"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <span className="current-time">{currentTime.toFixed(1)}</span>
            <span className="duration" style={{ marginLeft: "auto" }}>
              {duration.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
