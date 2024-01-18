import React from "react";
import { Link } from "react-router-dom";
import kki from "../img/kakao.png";

const Login = () => {
  return (
    <div
      className="back"
      style={{ backgroundColor: "#e2e0e0", padding: "70px" }}
    >
      <div className="auth-container">
        <div className="auth">
          <h1 style={{ color: "black", marginTop: "70px" }}>Login</h1>
          <form>
            <input type="text" placeholder="EMAIL" />
            <input type="password" placeholder="PASSWORD" />
            <button>Login</button>
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
