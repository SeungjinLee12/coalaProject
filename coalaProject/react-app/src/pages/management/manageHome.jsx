import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Logo from "../../img/logo.png";

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

  // useEffect(()=>{
  //   setinputChangeName("")
  //   setinputChangeEmail("")
  //   setinputChangeCarrer("")
  //   setinputChangeDescription("")
  //   setImg(null)
  //   set
  // })

  const handleButtonCheckNicknameClick = () => {
    const data = new FormData();
    if (!img) {
      data.append("img", null);
    }
    data.append("img", img);
    data.append("inputChangeName", inputChangeName);
    data.append("inputChangeEmail", inputChangeEmail);
    data.append("inputChangeDescription", inputChangeDescription);
    data.append("inputChangeCarrer", inputChangeCarrer);

    axios.post(`${serverUrl}/management/imageChange`, data).then((res) => {
      alert("강사가 등록되었습니다");
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
          <h1 style={{ marginLeft: "100px" }}>관리자</h1>
          <h2 style={{ marginTop: "10px" }}>이곳은 관리자 페이지 입니다</h2>
          <div className="logo-name" style={{ alignItems: "center" }}>
            <div className="logo">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modify_Information;
