import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Modify_checkUser = () => {
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const handleUserCheckPassword = (event) => {
    setUserCheckPassword(event.target.value);
  };
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

  const location = useLocation();
  const { state } = location;
  const { menuItem } = state;
  const { currentUser } = useContext(AuthContext);

  // const currentUser = location.state?.currentUser || [];

  const handleButtonClick = () => {
    axios
      .post(
        `${serverUrl}/modifyUser/userCheck/?userNo=${currentUser.USER_NO}`,
        { PASSWORD: userCheckPassword }
      )
      .then((res) => {
        if (res.data.success === true) {
          if (menuItem === "manage") {
            navigate(`/management/manage`);
          } else {
            setTimeout(() => {
              navigate(`/modifyUser/${menuItem}`);
            }, 1000);
          }
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>My Page - 비밀번호 확인</h1>
      <br />
      <h3 style={{ marginTop: "50px" }}>비밀번호를 입력해주세요</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        PASSWORD
        <input
          type="password"
          placeholder="Enter your password"
          style={{
            marginRight: "10px",
            width: "200px",
            marginLeft: "5px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
          value={userCheckPassword}
          onChange={handleUserCheckPassword}
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
