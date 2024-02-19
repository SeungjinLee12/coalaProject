import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Modify_Information = () => {
  const selefile = useRef();

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [inputChangeName, setinputChangeName] = useState("");
  const [inputChangeEmail, setinputChangeEmail] = useState("");
  const [inputChangeCarrer, setinputChangeCarrer] = useState("");
  const [inputChangeDescription, setinputChangeDescription] = useState("");
  const [img, setImg] = useState(null);
  const [imgpath, setImgpath] = useState("");

  const handleInputNameChange = (e) => {
    setinputChangeName(e.target.value);
  };
  const handleInputEmailChange = (e) => {
    setinputChangeEmail(e.target.value);
  };
  const handleInputCarrerChange = (e) => {
    setinputChangeCarrer(e.target.value);
  };
  const handleInputDescriptionChange = (e) => {
    setinputChangeDescription(e.target.value);
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

  const checkSpecialCharacters = (input) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g; // 특수 문자를 포함하는 정규 표현식
    return regex.test(input); // 정규 표현식과 일치하는지 여부를 반환
  };

  // 이메일의 유효성을 체크하는 함수
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 주소의 정규 표현식
    return regex.test(email); // 정규 표현식과 일치하는지 여부를 반환
  };

  const handleButtonCheckNicknameClick = () => {
    if (checkSpecialCharacters(inputChangeName)) {
      alert("이름에 특수 문자는 사용할 수 없습니다.");
      return; // 특수 문자가 있으면 함수 종료
    }

    // 이메일의 유효성 체크
    if (!validateEmail(inputChangeEmail)) {
      alert("유효하지 않은 이메일 주소입니다.");
      return; // 유효하지 않은 이메일 주소이면 함수 종료
    }
    if (
      !inputChangeName ||
      !inputChangeEmail ||
      !inputChangeDescription ||
      !inputChangeCarrer ||
      !img
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const data = new FormData();
    data.append("img", img);
    data.append("inputChangeName", inputChangeName);
    data.append("inputChangeEmail", inputChangeEmail);
    data.append("inputChangeDescription", inputChangeDescription);
    data.append("inputChangeCarrer", inputChangeCarrer);

    axios.post(`${serverUrl}/management/imageChange`, data).then((res) => {
      console.log(res.data);
      if (res.data.mesaage === "ok") {
        alert("강사가 등록되었습니다");
        navigate("/management/manage");
      }
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", padding: "20px", marginTop: "40px" }}>
        <ul>
          <li>
            <a
              href="/management/addInstructor"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              강사등록
              <li style={{ marginTop: "20%" }}>
                <a
                  href="/management/addLecture"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  강의등록
                </a>
              </li>
            </a>
          </li>
          {/* <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/interest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              회원 관리
            </a>
          </li> */}
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
          <h1 style={{ marginLeft: "80px" }}>관리자 PAGE - 강사 등록</h1>
          <div style={{ marginLeft: "40px", marginTop: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                marginLeft: "60px",
              }}
            >
              강사 이름
              <input
                value={inputChangeName}
                onChange={handleInputNameChange}
                placeholder="   Enter Instructor Name"
                style={{
                  marginRight: "10px",
                  border: "1px solid #ccc", // 테두리 스타일 추가
                  borderRadius: "8px", // 테두리의 둥글기 조절
                  marginLeft: "33px",
                  alignItems: "center",
                  width: "200px",
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
              EMAIL
              <input
                value={inputChangeEmail}
                onChange={handleInputEmailChange}
                placeholder="   Enter Instructor EMAIL"
                style={{
                  marginRight: "10px",
                  border: "1px solid #ccc", // 테두리 스타일 추가
                  borderRadius: "8px", // 테두리의 둥글기 조절
                  marginLeft: "33px",
                  alignItems: "center",
                  width: "200px",
                  height: "30px",
                }}
              />
            </div>

            <div
              style={{
                alignItems: "center",
                marginTop: "20px",
                marginLeft: "60px",
              }}
            >
              CARRER
              <br />
              <textarea
                value={inputChangeCarrer}
                onChange={handleInputCarrerChange}
                placeholder="   Enter Instructor Carrer"
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  border: "1px solid #ccc", // 테두리 스타일 추가
                  borderRadius: "8px", // 테두리의 둥글기 조절
                  marginLeft: "-50px",
                  alignItems: "center",
                  width: "450px",
                  height: "200px",
                  resize: "none",
                }}
              />
            </div>
            <div
              style={{
                alignItems: "center",
                marginTop: "20px",
                marginLeft: "60px",
              }}
            >
              DESCRIPTION
              <br />
              <textarea
                value={inputChangeDescription}
                onChange={handleInputDescriptionChange}
                placeholder="   Enter Instructor Description"
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  border: "1px solid #ccc", // 테두리 스타일 추가
                  borderRadius: "8px", // 테두리의 둥글기 조절
                  marginLeft: "-50px",
                  alignItems: "center",
                  width: "450px",
                  height: "200px",
                  resize: "none",
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
              <button
                className="bubbly-button"
                onClick={() => selefile.current.click()}
                style={{ marginTop: "-245px", marginRight: "20px" }}
              >
                사진
              </button>
              <br />
              <img
                src={imgpath} // imgpath 상태를 사용하여 미리보기를 표시합니다.
                alt="이미지 선택"
                style={{
                  width: "200px",
                  height: "300px",
                  objectFit: "cover", // 이미지가 잘리지 않도록 설정합니다.
                  cursor: "pointer",
                  border: "1px solid #ccc", // 테두리 스타일 추가
                }}
                // onClick={() => selefile.current.click()}
              />
              <input
                type="file"
                ref={selefile}
                style={{ display: "none" }}
                onChange={(e) => {
                  setImg(e.target.files[0]);

                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = () => {
                    setImgpath(reader.result); // 선택된 파일의 내용을 읽어와서 imgpath 상태에 저장합니다.
                  };
                }}
              />
            </div>
          </div>
          <button
            className="bubbly-button"
            onClick={handleButtonCheckNicknameClick}
            style={{
              width: "140px",
              height: "50px",
              display: "flex",
              marginTop: "100px",
              marginLeft: "300px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            강사등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modify_Information;
