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
  const { email, password, nickname, phoneNumber, birth } = state;
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
            PASSWORD: password,
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

  return (
    <>
      <h1>관심분야 설정</h1>
      {[0, 1, 2].map((index) => (
        <div style={{ display: "flex" }} key={index}>
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
      <button className="bubbly-button" onClick={handleButtonClick}>
        success
      </button>
    </>
  );
};

export default Register;

// ////////////////////////////////////////////////////////////////////////////////
