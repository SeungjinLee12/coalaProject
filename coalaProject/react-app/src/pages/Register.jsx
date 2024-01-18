import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kki from "../img/kakao.png";

const Register = () => {
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
      navigate("/Register_interest");
    }, 1000);
  };
  return (
    <div
      className="back"
      style={{
        backgroundColor: "#e2e0e0",
        padding: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "800px",
      }}
    >
      <div
        className="auth-container-register"
        style={{ maxWidth: "500px", width: "100%", height: "680px" }}
      >
        <div className="auth">
          <h1 style={{ color: "black", marginTop: "70px" }}>Register</h1>
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  marginLeft: "-47px",
                  alignItems: "center",
                }}
              >
                EMAIL
                <input
                  type="text"
                  placeholder="Enter your email"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                />
                <a
                  href="javascript:;"
                  class="actionBtn6"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    class="hover"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      class="txt"
                      style={{
                        width: "50px",
                        height: "27px",
                        marginTop: "0px",
                        marginRight: "3px",
                        marginLeft: "3px",
                      }}
                    >
                      <a style={{ color: "black" }}>중복확인</a>
                    </span>
                  </span>
                </a>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  marginLeft: "-47px",
                  alignItems: "center",
                }}
              >
                PASSWORD
                <input
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                />
              </label>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <input
                type="password"
                placeholder="Re-enter your password"
                style={{ marginLeft: "50px", width: "170px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  marginLeft: "-47px",
                  alignItems: "center",
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
                <a
                  href="javascript:;"
                  class="actionBtn6"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    class="hover"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      class="txt"
                      style={{
                        width: "50px",
                        height: "27px",
                        marginTop: "0px",
                        marginRight: "3px",
                        marginLeft: "3px",
                      }}
                    >
                      <a style={{ color: "black" }}>중복확인</a>
                    </span>
                  </span>
                </a>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  marginLeft: "-47px",
                  alignItems: "center",
                }}
              >
                PHONE
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                />
              </label>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  marginLeft: "-47px",
                  alignItems: "center",
                }}
              >
                BIRTH
                <input
                  type="text"
                  placeholder="Enter your birth date"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                />
              </label>
            </div>

            <div id="kakao-login-btn" className="custom-kakao-btn">
              <img
                src={kki}
                style={{ width: "20px", height: "auto" }}
                alt="Kakao Logo"
                className="kakao-logo"
              />
              <span>카카오 회원가입</span>
            </div>
          </form>
          <button className="bubbly-button" onClick={handleButtonClick}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
