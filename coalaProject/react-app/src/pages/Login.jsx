import { Link, useNavigate } from "react-router-dom";
import kki from "../img/kakao.png";
import { AuthContext } from "../context/authContext";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

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
              <span>카카오 로그인</span>
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
