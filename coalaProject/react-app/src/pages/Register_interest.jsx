// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";

// const extractChildCategories = (categories, parentCategoryId) => {
//   if (!categories) {
//     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
//     return [];
//   } else {
//     console.log("bbbbbbbbbbbbbbbbbbbbbbb");
//     return categories.filter(
//       (category) => category.parent_category === parentCategoryId
//     );
//   }
// };

// const extractSiblingCategories = (categories, parentCategoryId) => {
//   return categories.filter(
//     (category) =>
//       category.parent_category === parentCategoryId &&
//       category.category_no !== parentCategoryId
//   );
// };

// const Dropdown = ({ label, options, onChange }) => {
//   return (
//     <div
//       style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
//     >
//       <h2 style={{ marginRight: "10px" }}>{label}</h2>
//       <select onChange={onChange} style={{ border: "!px" }}>
//         <option value="">Select</option>
//         {options.map((option) => (
//           <option key={option.category_no} value={option.category_no}>
//             {option.category_name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const Register = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { state } = location;
//   const { email, password, nickname, phoneNumber, categoryData } = state;

//   const [selectedCategory1, setSelectedCategory1] = useState("");
//   // const [selectedCategory2, setSelectedCategory2] = useState("");
//   // Add more state variables for additional levels if needed

//   const handleCategory1Change = (e) => {
//     setSelectedCategory1(e.target.value);
//     // Reset other selected categories when the first dropdown changes
//     setSelectedCategory2("");
//     console.log(
//       "dddddddddddddddddddddddddddddddd",
//       extractSiblingCategories(categoryData, e.target.value)
//     );

//     // Update additional state variables if needed
//   };

//   const handleButtonClick = () => {
//     const selectedCategory1Info = categoryData[selectedCategory1];
//     // Additional logic for other selected categories if needed
//     setTimeout(() => {
//       navigate("/");
//     }, 500);
//   };

//   return (
//     <>
//       <h1>관심분야 설정</h1>
//       <div style={{ display: "flex" }}>
//         <Dropdown
//           label="①"
//           options={extractChildCategories(categoryData, null)}
//           onChange={handleCategory1Change}
//         />
//         {/* {selectedCategory1 && (
//           <Dropdown
//             label="---"
//             options={extractSiblingCategories(categoryData, selectedCategory1)}
//             onChange={(e) => setSelectedCategory2(e.target.value)}
//           />
//         )} */}
//       </div>
//       {/* Render additional dropdowns based on the selected categories */}
//       <button className="bubbly-button" onClick={handleButtonClick}>
//         success
//       </button>
//     </>
//   );
// };

// export default Register;

////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const extractSiblingCategories = (categories, parentCategoryId) => {
  return categories;
};

const Dropdown = ({ label, options, onChange }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <h2 style={{ marginRight: "10px" }}>{label}</h2>
      <select onChange={onChange} style={{ border: "!px" }}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.category_no} value={option.category_no}>
            {option.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, nickname, phoneNumber, categoryData, birth } = state;
  const { state } = location;

  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");

  const handleCategory1Change = (e) => {
    setSelectedCategory1(e.target.value);
  };

  const handleCategory2Change = (e) => {
    setSelectedCategory2(e.target.value);
  };

  const handleCategory3Change = (e) => {
    setSelectedCategory3(e.target.value);
  };

  const handleButtonClick = () => {
    // 선택한 카테고리와 회원가입에 필요한 정보를 서버로 전송
    axios
      .post("http://localhost:4001/login/join_user", {
        EMAIL: email,
        NAME: nickname,
        PASSWORD: password,
        PHONE: phoneNumber,
        BIRTH: birth, // 적절한 값으로 변경
        INTEREST1: selectedCategory1,
        INTEREST2: selectedCategory2,
        INTEREST3: selectedCategory3,
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
  };

  return (
    <>
      <h1>관심분야 설정</h1>
      <div style={{}}>
        <Dropdown
          label="1"
          options={extractSiblingCategories(categoryData, null)}
          onChange={handleCategory1Change}
        />
        <br />
        <Dropdown
          label="2"
          options={extractSiblingCategories(categoryData, selectedCategory1)}
          onChange={handleCategory2Change}
        />
        <Dropdown
          label="3"
          options={extractSiblingCategories(categoryData, selectedCategory2)}
          onChange={handleCategory3Change}
        />
      </div>
      <button className="bubbly-button" onClick={handleButtonClick}>
        success
      </button>
    </>
  );
};

export default Register;
