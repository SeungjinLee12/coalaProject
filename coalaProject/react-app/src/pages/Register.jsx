import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import kki from "../img/kakao.png";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState(""); // 이메일 상태 추가
  const [emailMessage, setEmailMessage] = useState("중복체크를 해주세요"); // 초기 메시지 설정
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [nicknameMessage, setNicknameMessage] = useState("중복체크를 해주세요"); // 초기 메시지 설정
  const [categoryData, setCategoryData] = useState(null);
  const [authNum, setAuthNum] = useState("");
  const [randNum, setRandNum] = useState("");

  const [confirmNum, setConfirmNum] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false); // 추가적인 입력 상자의 표시 여부 상태 추가
  const [timer, setTimer] = useState(300); // 5분 타이머 상태 추가 (초 단위)
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머가 실행 중인지 여부를 나타내는 상태 추가

  ///////////////////////이메일중복체크//////////////////////////////////

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // email 상태 업데이트
    setEmailMessage("중복체크를 해주세요"); // 이메일이 변경되면 초기 메시지로 설정
    setIsTimerRunning(false);
    setShowAdditionalInput(false); // 타이머가 0이 되면 추가적인 입력 상자 숨기기
    setTimer(300);
    setAuthNum("");
  };

  const handleAuthNumChange = (e) => {
    setAuthNum(e.target.value);
  };

  const handleEmailCheck = () => {
    axios
      .post(`${serverUrl}/login/join/emailCheck`, { EMAIL: email })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "duplicate") {
          setEmailMessage({ text: res.data.message, color: "red" });
        } else if (res.data.status === "invalid") {
          setEmailMessage({ text: res.data.message, color: "red" });
        } else if (res.data.status === "available") {
          setEmailMessage({ text: res.data.message, color: "green" });
          alert("해당 이메일로 인증번호가 발송되었습니다");
          setShowAdditionalInput(true); // 이메일 중복 확인 후 추가적인 입력 상자 표시
          setIsTimerRunning(true);
          axios
            .post(`${serverUrl}/login/email`, { EMAIL: email })
            .then((res) => {
              console.log(res.data.authNum);
              setRandNum(res.data.authNum);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //////////////////////////////////이메일인증////////////////////////////////

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer < 1) {
            alert("제한시간이 초과되었습니다. 이메일인증을 다시 받으세요");
            clearInterval(intervalId);
            setIsTimerRunning(false);
            setShowAdditionalInput(false); // 타이머가 0이 되면 추가적인 입력 상자 숨기기
            setTimer(300);
            setAuthNum("");
          }
          return prevTimer - 1; // 1초씩 감소
        });
      }, 1000);
    }

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 제거
  }, [isTimerRunning]);

  const handleAuthNumCheck = () => {
    if (authNum == randNum) {
      setIsTimerRunning(false);
      setShowAdditionalInput(false); // 타이머가 0이 되면 추가적인 입력 상자 숨기기
      setTimer(300);
      setEmailMessage({ text: "이메일 인증 완료", color: "green" });
      setAuthNum("");
    } else {
      alert("인증번호가 틀렸습니다. 이메일 인증을 다시 해주세요.");
      setIsTimerRunning(false);
      setShowAdditionalInput(false); // 타이머가 0이 되면 추가적인 입력 상자 숨기기
      setTimer(300);
      setAuthNum("");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0"); // 두 자리로 맞추기 위해 0으로 채우기
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  ///////////////////////비밀번호 일치 확인//////////////////////////////////

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
  /////////////////////////////////////////////////////////////////////////

  const handleNicknameChange = (e) => {
    setNickname(e.target.value); // nickname 상태 업데이트
    setNicknameMessage("중복체크를 해주세요"); // 이메일이 변경되면 초기 메시지로 설정
  };

  const handleNicknameCheck = () => {
    axios
      .post(`${serverUrl}/login/join/nameCheck`, { NAME: nickname })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "duplicate") {
          setNicknameMessage({ text: res.data.message, color: "red" });
        } else if (res.data.status === "invalid") {
          setNicknameMessage({ text: res.data.message, color: "red" });
        } else if (res.data.status === "available") {
          setNicknameMessage({ text: res.data.message, color: "green" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(nicknameMessage); // 상태 업데이트 후의 값 확인
  }, [nicknameMessage]);

  ///////////////////////버튼//////////////////////////////////

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
    } else if (emailMessage.text === "사용 가능한 이메일입니다.") {
      alert("이메일 인증을 해주세요.");
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
    }, []);
  });

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

  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className="back"
      style={{
        backgroundColor: "#e2e0e0",
        padding: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "900px",
      }}
    >
      <div
        className="auth-container-register"
        style={{ maxWidth: "500px", width: "100%", height: "750px" }}
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
              {emailMessage.color === "green" &&
                showAdditionalInput === true && (
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
                        width: "500%",
                      }}
                    >
                      인증번호
                      <input
                        type="text"
                        placeholder="Additional information"
                        style={{
                          marginRight: "10px",
                          marginLeft: "5px",
                          alignItems: "center",
                        }}
                        value={authNum}
                        onChange={handleAuthNumChange} // 입력된 값을 표시
                      />
                      <button
                        type="button"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          height: "30px",
                          width: "30px",
                          backgroundColor: "whitesmoke",
                          borderColor: "black",
                        }}
                        onClick={handleAuthNumCheck}
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
                    <a style={{ marginLeft: "30px", marginTop: "10px" }}>
                      {formatTime(timer)}
                    </a>
                  </div>
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
