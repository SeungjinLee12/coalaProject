import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Navbar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubCategoryOpen, setSubCategoryOpen] = useState(false);

  const [studyLectures, setStudyLectures] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/api/`).then((res) => {
      // 받아온 데이터에서 mainpage_lecture_list를 추출하여 상태를 업데이트
      setStudyLectures(res.data.mainpage_lecture_list);
    });
  }, []);

  const dropdownItems = ["a", "b", "c", "d", "e", "f", "g"];

  const subItems = {
    a: ["자바", "파이썬"],
    b: ["다른 항목1", "다른 항목2"],
    c: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
    ],
    d: [
      "p",
      "h",
      "m",
      "7",
      "k",
      "d",
      "d",
      "e",
      "g",
      "f",
      "c",
      "d",
      "a",
      "s",
      "d",
    ],

    // 다른 상위 항목들에 대한 하위 항목들을 추가할 수 있습니다.
  };

  const handleCategoryHover = () => {
    setCategoryOpen(true);
  };

  const handleCategoryLeave = () => {
    setCategoryOpen(false);
    setSelectedCategory(null);
  };

  const handleSubCategoryHover = () => {
    setSubCategoryOpen(true);
  };

  const handleSubCategoryLeave = () => {
    setSubCategoryOpen(false);
  };

  const generateDropdownItems = (items) => {
    return (
      <div
        style={{
          position: "relative",
          marginBottom: "10px",
          marginRight: "10px",
          cursor: "pointer",
          marginTop: "35px",
        }}
        onMouseEnter={handleCategoryHover}
        onMouseLeave={handleCategoryLeave}
      >
        <h4 style={{ margin: 0 }}>Category</h4>
        {isCategoryOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "#fff",
              left: "-20px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              width: "130px",
            }}
            onMouseEnter={handleSubCategoryHover}
            onMouseLeave={handleSubCategoryLeave}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  background:
                    selectedCategory === item ? "#eee" : "transparent",
                }}
                onMouseEnter={() => setSelectedCategory(item)}
              >
                {item}
              </div>
            ))}
            {isSubCategoryOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "120px",
                  background: "#fff",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                  width: "120px",
                }}
              >
                {getSubDropdownItems(selectedCategory).map(
                  (subItem, subIndex) => (
                    <div
                      key={subIndex}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        background: isSubCategoryOpen ? "#eee" : "transparent",
                      }}
                    >
                      <Link
                        to={`/category/${subItem.toLowerCase()}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {subItem}
                      </Link>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getSubDropdownItems = (item) => {
    return subItems[item] || [];
  };

  return (
    <div className="navbar">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="/api/" style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className="logo-name"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="logo">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </div>

            <div className="name">
              <h1 style={{ marginBottom: "5px" }}>코알라?</h1>
              <h4 style={{ margin: 0 }}>코드 알아가볼래?</h4>
            </div>
          </div>
        </a>

        <div className="code_view actionBtn7 category">
          {generateDropdownItems(dropdownItems)}
        </div>

        <form className="search-container" style={{ marginRight: "0px" }}>
          <input type="text" id="search-bar" placeholder="검색" />
          <a href="#">
            <img
              className="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt="Search Icon"
            />
          </a>
        </form>

        {/* 로그인 */}
        <Link
          to="/login"
          className="code_view actionBtn7"
          style={{ marginBottom: "10px", marginRight: "0px" }}
        >
          <h4 style={{ margin: 0 }}>LogIN</h4>
        </Link>

        {/* 회원가입 */}
        <Link
          to="/register"
          className="code_view actionBtn7"
          style={{ marginBottom: "10px", marginRight: "20px" }}
        >
          <h4 style={{ margin: 0 }}>Register</h4>
        </Link>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Navbar;
