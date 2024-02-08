import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Modify_Information = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [inputChangePhone, setInputPhoneChange] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("중복체크를 해주세요");

  const [inputChangeNickname, setInputNicknameChange] = useState("");
  const handleInputNicknameChange = (e) => {
    setInputNicknameChange(e.target.value);
    setNicknameMessage("중복체크를 해주세요");
  };
  const handleInputPhoneChange = (e) => {
    setInputPhoneChange(e.target.value);
  };

  useEffect(() => {
    var animateButton = function (e) {
      e.preventDefault();
      // reset animation
      e.target.classList.remove("animate");

      e.target.classList.add("animate");
      setTimeout(function () {
        e.target.classList.remove("animate");
      }, 700);
    };

    var bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener("click", animateButton, false);
    }
  }, []);

  const handleButtonCheckNicknameClick = () => {
    console.log(
      "generatedSubItems : 555555555555555555555555555555555555 "
      // generatedSubItems
    );
    axios
      .post(`${serverUrl}/login/join/nameCheck`, { NAME: inputChangeNickname })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "duplicate") {
          setNicknameMessage({ text: res.data.message, color: "red" });
        } else if (res.data.status === "available") {
          setNicknameMessage({ text: res.data.message, color: "green" });
        } else if (res.data.status === "invalid") {
          setNicknameMessage({ text: res.data.message, color: "red" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 닉네임에 특수문자 체크
  const isNicknameValid = (inputChangeNickname) => {
    if (inputChangeNickname !== "") {
      const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
      return nicknameRegex.test(inputChangeNickname);
    } else if (inputChangeNickname === "") {
      return true;
    }
  };

  // 전화번호 형식 체크 (11자리, - 제외)
  const isPhoneNumberValid = (inputChangePhone) => {
    if (inputChangePhone !== "") {
      const phoneRegex = /^[0-9]{11}$/;
      return phoneRegex.test(inputChangePhone.replace(/-/g, ""));
    } else if (inputChangePhone === "") {
      return true;
    }
  };

  // 예시: 모든 유효성 검사를 수행하는 함수
  const isFormValid = (inputChangeNickname, inputChangePhone) => {
    return (
      isNicknameValid(inputChangeNickname) &&
      isPhoneNumberValid(inputChangePhone)
    );
  };

  // handleButtonClick 함수에서 유효성 검사 후에 페이지 이동 여부 판단
  const handleButtonClick = () => {
    if (inputChangeNickname && inputChangePhone !== null) {
      const isValid = isFormValid(inputChangeNickname, inputChangePhone);
      // 닉네임 중복 체크 결과에 따른 검사
      if (inputChangeNickname !== null) {
        if (nicknameMessage.color !== "green") {
          alert("닉네임 중복 체크를 해주세요.");
          return;
        }
      }
      if (isValid) {
        axios.post(
          `${serverUrl}/modifyUser/information/?userNo=${currentUser.USER_NO}`,
          { NAME: inputChangeNickname, PHONE: inputChangePhone }
        );
        setTimeout(() => {
          navigate("/api");
        }, 1000);
        alert("회원정보 수정 완료");
      } else {
        console.log("가입이 불가능합니다. 양식을 다시 확인하세요.");
        alert("가입이 불가능합니다. 양식을 다시 확인하세요.");
      }
    } else {
      alert("수정 내역이 없습니다.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", padding: "20px", marginTop: "40px" }}>
        <ul>
          <li>
            <a
              href="/modifyUser/password"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              비밀번호 변경
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/information"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              내 정보 수정
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/interest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              관심분야 수정
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/payment"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              결제내역
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              장바구니
            </a>
          </li>
        </ul>
      </div>

      <div
        style={{
          width: "1px",
          background: "#ccc",
          marginTop: "40px",
        }}
      ></div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <div style={{}}>
          <h1>My Page - 내 정보 수정</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
              marginLeft: "60px",
            }}
          >
            NICKNAME
            <input
              value={inputChangeNickname}
              onChange={handleInputNicknameChange}
              placeholder="  Enter your nickname"
              style={{
                marginRight: "10px",
                marginLeft: "5px",
                border: "1px solid #ccc", // 테두리 스타일 추가
                borderRadius: "8px", // 테두리의 둥글기 조절
                alignItems: "center",
                width: "200px",
                height: "30px",
              }}
            />
            <button
              className="bubbly-button"
              onClick={handleButtonCheckNicknameClick}
              style={{
                width: "50px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              check
            </button>
          </div>
          <p
            style={{
              width: "100%",
              marginLeft: "150px ",
              color: nicknameMessage.color, // emailMessage의 color 속성에 따라 색상 적용
            }}
          >
            {nicknameMessage.text}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "60px",
            }}
          >
            PHONE
            <input
              value={inputChangePhone}
              onChange={handleInputPhoneChange}
              placeholder="   Enter your phone"
              style={{
                marginRight: "10px",
                border: "1px solid #ccc", // 테두리 스타일 추가
                borderRadius: "8px", // 테두리의 둥글기 조절
                marginLeft: "33px",
                alignItems: "center",
                width: "200px",
                height: "30px",
              }}
            />
          </div>
          <button
            className="bubbly-button"
            onClick={handleButtonClick}
            style={{
              width: "97px",
              height: "50px",
              display: "flex",
              marginTop: "100px",
              marginLeft: "300px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modify_Information;
