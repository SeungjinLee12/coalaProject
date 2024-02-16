import { Link, useNavigate } from "react-router-dom";
import kki from "../img/kakao.png";
import { AuthContext } from "../context/authContext";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import KakaoLogin from "react-kakao-login";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const restapiKey = process.env.REACT_APP_Rest_api_key;
const redirectUri = process.env.REACT_APP_redirect_uri;
const jsKey = process.env.REACT_APP_javascriptKey;

const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    await login(userData);

    navigate("/api"); // 로그인 성공 시 "/"로 이동
  };

  const kakaoOnSuccess = async (data) => {
    const idToken = data.response.access_token;
    if (idToken) {
      try {
        const response = await axios.post(
          `${serverUrl}/login/kakao/callback`,
          {
            idToken,
          }
          // ,
          // {
          //   withCredentials: true,
          // }
        );
        if (response.data.message === "first") {
          const email = response.data.data.UserEmail;
          const password = response.data.data.Password;
          const phoneNumber = response.data.data.UserCellPhone;
          const birth = response.data.data.Birth;
          alert(
            "카카오 로그인 첫 시도 시 닉네임과 관심과목을 등록하셔야 됩니다."
          );
          navigate("/registerKakao", {
            state: {
              email,
              password,
              phoneNumber,
              birth,
            },
          });
        } else {
          const email = response.data.loginData.UserEmail;
          const password = response.data.loginData.Password;
          console.log("?");
          const userData = {
            email: email,
            password: password,
          };
          await login(userData);

          navigate("/api"); // 로그인 성공 시 "/"로 이동
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  const kakaoOnFailure = (error) => {
    // window.location.href = "http://localhost:3000";
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", error);
  };

  return (
    <div
      className="back"
      style={{ backgroundColor: "#e2e0e0", padding: "70px" }}
    >
      <div className="auth-container">
        <div className="auth">
          <h1 style={{ color: "black", marginTop: "70px" }}>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="EMAIL"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
            <div id="kakao-login-btn" className="custom-kakao-btn">
              <img
                src={kki}
                style={{ width: "20px", height: "auto" }}
                alt="Kakao Logo"
                className="kakao-logo"
              />
              <KakaoLogin
                token={jsKey}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFailure}
                style={{
                  width: "80%",
                  padding: "10px",
                  backgroundColor: "#FAE100",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            </div>
            <span>
              회원이 아직 아니신가요? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
