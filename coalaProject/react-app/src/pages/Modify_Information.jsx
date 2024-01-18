import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Modify_Information = () => {
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
          <li style={{ marginTop: "25%" }}>
            <a
              href="/modifyUser/information"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              내 정보 수정
            </a>
          </li>
          <li style={{ marginTop: "25%" }}>
            <a
              href="/modifyUser/interest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              관심분야 수정
            </a>
          </li>
          <li style={{ marginTop: "25%" }}>
            <a
              href="/modifyUser/payment"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              결제내역
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
              type="text"
              placeholder="Enter your nickname"
              style={{
                marginRight: "10px",
                marginLeft: "5px",

                alignItems: "center",
                width: "128px",
              }}
            />
            <button
              className="bubbly-button"
              onClick={handleButtonClick}
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
              type="text"
              placeholder="Enter your phone"
              style={{
                marginRight: "10px",
                marginLeft: "33px",
                alignItems: "center",
                width: "128px",
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
