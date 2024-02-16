import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

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

const Modify_Interest = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [upperCategory, setUpperCategory] = useState([]);
  const [lowerCategory, setLowerCategory] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([
    { upper: "", lower: "" },
    { upper: "", lower: "" },
    { upper: "", lower: "" },
  ]);
  const [lowerCategoryOptions, setLowerCategoryOptions] = useState([]);
  const userNo = localStorage.getItem("USER_NO");

  // useEffect(() => {
  //   const categoryDataList = JSON.parse(
  //     localStorage.getItem("categoryData_list")
  //   );

  //   if (categoryDataList) {
  //     setUpperCategory(categoryDataList.upperCategory || []);
  //     setLowerCategory(categoryDataList.lowerCategory || {});
  //   }
  // }, []);

  // useEffect(() => {
  //   // Update lower category options based on the selected categories
  //   const updatedOptions = selectedCategories.map((selectedCategory, index) => {
  //     return selectedCategory.upper && lowerCategory[selectedCategory.upper]
  //       ? lowerCategory[selectedCategory.upper]
  //       : [];
  //   });

  //   setLowerCategoryOptions(updatedOptions);
  // }, [selectedCategories, lowerCategory]);

  // const handleUpperCategoryChange = (index) => (e) => {
  //   const newSelectedCategories = [...selectedCategories];
  //   newSelectedCategories[index] = {
  //     upper: e.target.value,
  //     lower: "",
  //   };
  //   setSelectedCategories(newSelectedCategories);
  // };

  useEffect(() => {
    const categoryDataList = JSON.parse(
      localStorage.getItem("categoryData_list")
    );

    if (categoryDataList) {
      setUpperCategory(categoryDataList.upperCategory || []);
      setLowerCategory(categoryDataList.lowerCategory || {});
    }
    // Update lower category options based on the selected categories
    const updatedOptions = selectedCategories.map((selectedCategory, index) => {
      return selectedCategory.upper && lowerCategory[selectedCategory.upper]
        ? lowerCategory[selectedCategory.upper]
        : [];
    });

    setLowerCategoryOptions(updatedOptions);
  }, [selectedCategories, lowerCategory]);

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
    const userNo = currentUser.USER_NO;
    console.log(userNo);

    axios
      .get(`${serverUrl}/login/join/interest/check`, {
        params: {
          INTEREST1,
          INTEREST2,
          INTEREST3,
        },
      })
      .then((res) => {
        const INTEREST1 = res.data.categoryNos[0];
        const INTEREST2 = res.data.categoryNos[1];
        const INTEREST3 = res.data.categoryNos[2];
        axios
          .post(`${serverUrl}/modifyUser/interest`, {
            INTEREST1: INTEREST1,
            INTEREST2: INTEREST2,
            INTEREST3: INTEREST3,
            userNo: userNo,
          })
          .then((res) => {
            setTimeout(() => {
              navigate("/api");
            }, 500);
            alert("회원정보수정 완료");
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", padding: "20px", marginTop: "40px" }}>
        <ul>
          <li>
            <a
              href="/modifyUser/information"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              내 정보 수정
              <li style={{ marginTop: "20%" }}>
                <a
                  href="/modifyUser/password"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  비밀번호 변경
                </a>
              </li>
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/interest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              관심분야 수정
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/payment"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              결제내역
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              장바구니
            </a>
          </li>
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
          alignItems: "center",
          marginTop: "20px",
          marginLeft: "25%",
        }}
      >
        <h1>My Page - 관심분야 설정</h1>
        <div
          style={{
            alignItems: "center",
            marginTop: "50px",
          }}
        >
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
        </div>
        <button
          className="bubbly-button"
          onClick={handleButtonClick}
          style={{ marginTop: "20px" }}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default Modify_Interest;
