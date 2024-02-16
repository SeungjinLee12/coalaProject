///////////////////////////////////////////////////완성본
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const Dropdown = ({ label, options, onChange }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <h2 style={{ marginRight: "10px" }}>{label}</h2>
      <select
        onChange={onChange}
        style={{ border: "1px solid #ccc", padding: "5px" }}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { email, password, phoneNumber, birth } = state;
  const [upperCategory, setUpperCategory] = useState([]);
  const [lowerCategory, setLowerCategory] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([
    { upper: "", lower: "" },
    { upper: "", lower: "" },
    { upper: "", lower: "" },
  ]);
  const [lowerCategoryOptions, setLowerCategoryOptions] = useState([]);

  useEffect(() => {
    const categoryDataList = JSON.parse(
      localStorage.getItem("categoryData_list")
    );

    if (categoryDataList) {
      setUpperCategory(categoryDataList.upperCategory || []);
      setLowerCategory(categoryDataList.lowerCategory || {});
    }
  }, []);

  useEffect(() => {
    // Update lower category options based on the selected categories
    const updatedOptions = selectedCategories.map((selectedCategory, index) => {
      return selectedCategory.upper && lowerCategory[selectedCategory.upper]
        ? lowerCategory[selectedCategory.upper]
        : [];
    });

    setLowerCategoryOptions(updatedOptions);
  }, [selectedCategories, lowerCategory]);

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

  const handleUpperCategoryChange = (index) => (e) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] = {
      upper: e.target.value,
      lower: "",
    };
    setSelectedCategories(newSelectedCategories);
  };

  const handleLowerCategoryChange = (index) => (e) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index].lower = e.target.value;
    setSelectedCategories(newSelectedCategories);
  };

  const handleButtonClick = () => {
    if (nicknameMessage.color !== "green") {
      alert("닉네임 중복 체크를 해주세요.");
      return;
    }
    // TODO: Implement your logic for handling the selected categories
    let INTEREST1 = null;
    let INTEREST2 = null;
    let INTEREST3 = null;

    selectedCategories.forEach(async (selectedCategory, index) => {
      if (index === 0 && selectedCategory.lower) {
        INTEREST1 = selectedCategory.lower;
      } else if (index === 0 && selectedCategory.upper) {
        INTEREST1 = selectedCategory.upper;
      } else if (index === 1 && selectedCategory.lower) {
        INTEREST2 = selectedCategory.lower;
      } else if (index === 1 && selectedCategory.upper) {
        INTEREST2 = selectedCategory.upper;
      } else if (index === 2 && selectedCategory.lower) {
        INTEREST3 = selectedCategory.lower;
      } else if (index === 2 && selectedCategory.upper) {
        INTEREST3 = selectedCategory.upper;
      }
    });
    console.log(INTEREST1, INTEREST2, INTEREST3);

    axios
      .get(`${serverUrl}/login/join/interest/check`, {
        params: {
          INTEREST1,
          INTEREST2,
          INTEREST3,
        },
      })
      .then((res) => {
        const interest1 = res.data.categoryNos[0];
        const interest2 = res.data.categoryNos[1];
        const interest3 = res.data.categoryNos[2];
        axios
          .post("http://localhost:4001/login/join_user", {
            EMAIL: email,
            NAME: nickname,
            PASSWORD: email,
            PHONE: phoneNumber,
            BIRTH: birth, // 적절한 값으로 변경
            INTEREST1: interest1,
            INTEREST2: interest2,
            INTEREST3: interest3,
          })
          .then((res) => {
            setTimeout(() => {
              navigate("/api");
            }, 500);
            alert("회원가입 성공");
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  ////////////////////////////nickname/////////////////////////////////

  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [nicknameMessage, setNicknameMessage] = useState("중복체크를 해주세요"); // 초기 메시지 설정

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

  return (
    <>
      <h1>관심분야 설정</h1>
      {[0, 1, 2].map((index) => (
        <div style={{ display: "flex", marginTop: "10px" }} key={index}>
          <Dropdown
            label={`Category ${index + 1}`}
            options={upperCategory}
            onChange={handleUpperCategoryChange(index)}
          />
          {lowerCategoryOptions[index] &&
            lowerCategoryOptions[index].length > 0 && (
              <Dropdown
                label="→"
                options={lowerCategoryOptions[index]}
                onChange={handleLowerCategoryChange(index)}
              />
            )}
        </div>
      ))}
      <div style={{ paddingTop: "10px" }}>
        <h1>닉네임 설정</h1>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <h2>NICKNAME</h2>
          <input
            type="text"
            placeholder="   Enter your nickname"
            style={{
              alignItems: "center",
              width: "150px",
              border: "1px solid black", // 테두리 스타일 지정
              marginLeft: "10px",
              height: "30px",
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
              width: "30px",
              backgroundColor: "whitesmoke",
              borderColor: "black",
              border: "1px solid black", // 테두리 스타일 지정
              marginLeft: "10px",
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
      <button
        className="bubbly-button"
        onClick={handleButtonClick}
        style={{ marginTop: "20px" }}
      >
        success
      </button>

      <h1>
        카카오 로그인 첫 시도 시 회원님의 비밀번호는 회원님의 카카오 이메일과
        동일합니다. <br />
        MyPage - 비밀번호 변경에서 비밀번호를 바꿔서 사용하시길 권장드립니다.
      </h1>
    </>
  );
};

export default Register;

// ////////////////////////////////////////////////////////////////////////////////
