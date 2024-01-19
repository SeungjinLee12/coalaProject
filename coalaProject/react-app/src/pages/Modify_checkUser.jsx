import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Modify_checkUser = () => {
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
      navigate("/modifyUser/information");
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>My Page - 비밀번호 확인</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        PASSWORD
        <textarea
          aria-label="minimum height"
          type="password"
          placeholder="Enter your password"
          style={{
            marginRight: "10px",
            width: "200px",
            marginLeft: "5px",
            textAlign: "center", // 텍스트 수평 가운데 정렬
            border: "1px solid #ccc", // 테두리 스타일 추가
            borderRadius: "8px", // 테두리의 둥글기 조절
          }}
        />
        <button
          className="bubbly-button"
          onClick={handleButtonClick}
          style={{
            width: "50px",
            height: "20px",
            display: "flex",
            marginTop: "100px",
            marginLeft: "-80px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          NEXT
        </button>
      </div>
      <div style={{ paddingBottom: "250px" }}></div>
    </div>
  );
};

export default Modify_checkUser;
