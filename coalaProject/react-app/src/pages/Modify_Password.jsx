import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Modify_Password = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirmPassword ? "green" : "red");
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(password === newConfirmPassword ? "green" : "red");
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

  const isPasswordValid = (password) => {
    // 비밀번호 길이 체크 (8자리 이상)
    return password.length >= 8;
  };

  const handleButtonClick = () => {
    const isValid = isPasswordValid(password);
    if (passwordMatch !== "green") {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (isValid) {
      axios.post(
        `${serverUrl}/modifyUser/password/?userNo=${currentUser.USER_NO}`,
        { PASSWORD: password }
      );
      alert("비밀번호 수정이 완료되었습니다");
      setTimeout(() => {
        navigate("/api");
      }, 1000);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", padding: "20px", marginTop: "40px" }}>
        <ul>
          <li>
            <a
              href="/modifyUser/information"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              내 정보 수정
              <li style={{ marginTop: "20%" }}>
                <a
                  href="/modifyUser/password"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  비밀번호 변경
                </a>
              </li>
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
          <h1>My Page - 비밀번호 수정</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
              marginLeft: "60px",
            }}
          >
            PASSWORD
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="   8자리 이상 비밀번호"
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                alignItems: "center",
                width: "200px",
                paddingRight: "15px",
                border: "1px solid #ccc", // 테두리 스타일 추가
                borderRadius: "8px", // 테두리의 둥글기 조절
                height: "30px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "60px",
            }}
          >
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="   Re-enter your password"
              style={{
                marginRight: "10px",
                marginLeft: "102px",
                alignItems: "center",
                width: "200px",
                paddingRight: "15px",
                border: "1px solid #ccc", // 테두리 스타일 추가
                borderRadius: "8px", // 테두리의 둥글기 조절
                height: "30px",
              }}
            />
          </div>
          {passwordMatch === "green" && (
            <p
              style={{
                color: "green",
                marginLeft: "80px",
                width: "100%",
                paddingLeft: "100px",
                paddingTop: "10px",
              }}
            >
              비밀번호가 일치합니다
            </p>
          )}
          {passwordMatch === "red" && (
            <p
              style={{
                color: "red",
                marginLeft: "65px",
                width: "200%",
                paddingLeft: "100px",
                paddingTop: "10px",
              }}
            >
              비밀번호가 일치하지 않습니다
            </p>
          )}
          <button
            className="bubbly-button"
            onClick={handleButtonClick}
            style={{
              width: "97px",
              height: "40px",
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

export default Modify_Password;
