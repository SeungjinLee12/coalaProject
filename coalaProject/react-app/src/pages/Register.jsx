import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kki from "../img/kakao.png";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Register = () => {
  ///////////////////////버튼//////////////////////////////////
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState("");

  const [categoryData, setCategoryData] = useState(null);

  const isEmailValid = (email) => {
    // 이메일 형식 체크
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // 비밀번호 길이 체크 (8자리 이상)
    return password.length >= 8;
  };

  const isNicknameValid = (nickname) => {
    // 닉네임에 특수문자 체크
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    return nicknameRegex.test(nickname);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // 전화번호 형식 체크 (11자리, - 제외)
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phoneNumber.replace(/-/g, ""));
  };

  // 예시: 모든 유효성 검사를 수행하는 함수
  const isFormValid = (email, password, nickname, phoneNumber) => {
    return (
      isEmailValid(email) &&
      isPasswordValid(password) &&
      isNicknameValid(nickname) &&
      isPhoneNumberValid(phoneNumber)
    );
  };

  // handleButtonClick 함수에서 유효성 검사 후에 페이지 이동 여부 판단
  const handleButtonClick = () => {
    const isValid = isFormValid(email, password, nickname, phoneNumber);
    if (emailMessage.color !== "green") {
      alert("이메일 중복 체크를 해주세요.");
      return;
    }

    // 비밀번호 일치 확인
    if (passwordMatch !== "green") {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 닉네임 중복 체크 결과에 따른 검사
    if (nicknameMessage.color !== "green") {
      alert("닉네임 중복 체크를 해주세요.");
      return;
    }
    if (isValid) {
      setTimeout(() => {
        navigate("/Register_interest", {
          state: {
            email,
            password,
            nickname,
            phoneNumber,
            categoryData,
            birth,
          },
        });
      }, 1000);
    } else {
      console.log("가입이 불가능합니다. 양식을 다시 확인하세요.");
      alert("가입이 불가능합니다. 양식을 다시 확인하세요.");
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:4001/login/join/interest`).then((res) => {
      setCategoryData(res.data);
    });
  }, []);

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
  ///////////////////////이메일중복체크//////////////////////////////////

  const [email, setEmail] = useState(""); // 이메일 상태 추가
  const [emailMessage, setEmailMessage] = useState("중복체크를 해주세요"); // 초기 메시지 설정

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // email 상태 업데이트
    setEmailMessage("중복체크를 해주세요"); // 이메일이 변경되면 초기 메시지로 설정
    console.log(emailMessage); // 추가
  };

  const handleEmailCheck = () => {
    axios
      .post(`${serverUrl}/login/join/emailCheck`, { EMAIL: email })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "duplicate") {
          setEmailMessage({ text: res.data.message, color: "red" });
        } else if (res.data.status === "available") {
          setEmailMessage({ text: res.data.message, color: "green" });
        } else if (res.data.status === "invalid") {
          setEmailMessage({ text: res.data.message, color: "red" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  ///////////////////////비밀번호 일치 확인//////////////////////////////////

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Check if passwords match when the user types
    setPasswordMatch(newPassword === confirmPassword ? "green" : "red");
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    // Check if passwords match when the user types
    setPasswordMatch(password === newConfirmPassword ? "green" : "red");
  };
  /////////////////////////////////////////////////////////////////////////

  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [nicknameMessage, setNicknameMessage] = useState("중복체크를 해주세요"); // 초기 메시지 설정

  const handleNicknameChange = (e) => {
    setNickname(e.target.value); // nickname 상태 업데이트
    setNicknameMessage("중복체크를 해주세요"); // 이메일이 변경되면 초기 메시지로 설정
    console.log(emailMessage); // 추가
  };

  const handleNicknameCheck = () => {
    axios
      .post(`${serverUrl}/login/join/nameCheck`, { NAME: nickname })
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

  useEffect(() => {
    console.log(nicknameMessage); // 상태 업데이트 후의 값 확인
  }, [nicknameMessage]);

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
                  value={email}
                  onChange={handleEmailChange} // 입력된 값을 표시
                />
                <button
                  type="button"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "30px",
                    width: "400px",
                    backgroundColor: "whitesmoke",
                    borderColor: "black",
                  }}
                  onClick={handleEmailCheck} // 중복확인 버튼 클릭 시
                >
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                    }}
                  >
                    √
                  </p>
                </button>
              </label>
              <p
                style={{
                  width: "100%",
                  marginLeft: "10px",
                  color: emailMessage.color, // emailMessage의 color 속성에 따라 색상 적용
                }}
              >
                {emailMessage.text}
              </p>
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
                  placeholder="8자리 이상 비밀번호"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                    borderColor: passwordMatch,
                  }}
                  value={password}
                  onChange={handlePasswordChange}
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
                style={{
                  marginLeft: "50px",
                  width: "190px",
                  borderColor: passwordMatch,
                  marginTop: "-20px",
                }}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              {passwordMatch === "green" && (
                <p
                  style={{
                    color: "green",
                    marginLeft: "80px",
                    width: "100%",
                  }}
                >
                  비밀번호가 일치합니다
                </p>
              )}
              {passwordMatch === "red" && (
                <p style={{ color: "red", marginLeft: "65px", width: "200%" }}>
                  비밀번호가 일치하지 않습니다
                </p>
              )}
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
                    width: "150px",
                  }}
                  value={nickname}
                  onChange={handleNicknameChange} // 입력된 값을 표시
                />
                <button
                  type="button"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "30px",
                    width: "400px",
                    backgroundColor: "whitesmoke",
                    borderColor: "black",
                  }}
                  onClick={handleNicknameCheck} // 중복확인 버튼 클릭 시
                >
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                    }}
                  >
                    √
                  </p>
                </button>
              </label>
              <p
                style={{
                  width: "100%",
                  marginLeft: "40px ",
                  color: nicknameMessage.color, // emailMessage의 color 속성에 따라 색상 적용
                }}
              >
                {nicknameMessage.text}
              </p>
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
                  placeholder="- 제외 11자리 입력해주세요"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  placeholder="6자리 입력해주세요"
                  style={{
                    marginRight: "10px",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
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
