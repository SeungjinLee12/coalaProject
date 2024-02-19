import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import React, { useState, useEffect, useContext } from "react"; // Keep only one import line
import axios from "axios";
import { AuthContexProvider, AuthContext } from "../context/authContext";
import { useAuth } from "../context/authContext";
import Menu2 from "./Menu2";
import Menu from "./Menu";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Navbar = () => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchSearchTerm();
    }
  };

  const [searchTerm, setsearchTerm] = useState("");

  const searchSearchTerm = () => {
    if (!searchTerm) {
      return;
    }
    axios
      .get(`${serverUrl}/api/research`, { params: { WORD: searchTerm } })
      .then((res) => {
        const searchResults = res.data;
        const word = searchTerm;
        console.log("dsfnajnakdjsf", searchResults);
        navigate(`/api/search/?word=${word}`, {
          state: {
            searchResults,
            word,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////
  const { currentUser } = useContext(AuthContext);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubCategoryOpen, setSubCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const { categories, setCategories } = useAuth();

  const [dropdownItems, setDropdownItems] = useState([]);
  const [generatedSubItems, setGeneratedSubItems] = useState({});

  // const { logout } = useContext(AuthContext);
  // const handleLogout = async () => {
  //   logout();
  //   navigate("/login"); // "/"로 이동
  // };

  ///////////////////////////////////////////////////////////////////////////////////////
  const searchSearchCategory = (item) => {
    if (!item) {
      return;
    }
    axios
      .get(`${serverUrl}/api/research`, { params: { WORD: item } })
      .then((res) => {
        const searchResults = res.data;
        const word = item;
        console.log("dsfnajnakdjsf", searchResults);

        navigate(`/api/search/?word=${word}`, {
          state: {
            searchResults,
            word,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////
  const handleCategoryHover = (categoryName, categoryNo) => {
    console.log("Hovered Category:", categoryName);
    console.log("Category No:", categoryNo);

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
  //////////////////////////////////////////////////////////////////////////////////////////
  const myPageEnter = () => {
    const userNo = currentUser.USER_NO;
    navigate(`/modifyUser/userCheck/?userNo=${userNo}`, {
      state: { currentUser },
    });
  };

  const generateDropdownItems = (items) => {
    console.log("dropdownItems : ", dropdownItems);
    console.log("generatedSubItems : ", generatedSubItems);

    const categoryData_list = {
      upperCategory: dropdownItems,
      lowerCategory: generatedSubItems,
    };
    localStorage.setItem(
      "categoryData_list",
      JSON.stringify(categoryData_list)
    );

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
        <h4 style={{ margin: 0, fontWeight: "bold" }}>Category</h4>
        {isCategoryOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "0", // 수정: 왼쪽 위치를 0으로 설정
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              width: "130px",
              // marginRight: "100px",
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
                onClick={() => searchSearchCategory(item)}
              >
                {item}
              </div>
            ))}
            {isSubCategoryOpen && (
              <div
                style={{
                  position: "absolute",
                  top:
                    items.findIndex((item) => item === selectedCategory) * 30, // 수정: 인덱스와 높이를 고려하여 top 설정
                  left: "100%",
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
                      <div onClick={() => searchSearchCategory(subItem)}>
                        {subItem}
                      </div>
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

  useEffect(() => {
    axios.get(`${serverUrl}/api/`).then((res) => {
      const topLevelCategories = res.data.category_list.filter(
        (category) => category.parent_category === null
      );

      const topLevelCategoryNames = topLevelCategories.map(
        (category) => category.category_name
      );

      setDropdownItems(topLevelCategoryNames);

      // 동적으로 generatedSubItems 생성
      const categoryMap = res.data.category_list.reduce((map, category) => {
        const parentCategoryName = category.parent_category
          ? res.data.category_list.find(
              (c) => c.category_no === category.parent_category
            ).category_name
          : null;

        if (!parentCategoryName) {
          map[category.category_no] = {
            parent: "upperCategory",
            children: category.category_name,
          };
        } else {
          if (!map[parentCategoryName]) {
            map[parentCategoryName] = { parent: null, children: [] };
          }
          map[parentCategoryName].children.push(category.category_name);
        }
        return map;
      }, {});

      const generatedSubItems = {};
      for (const categoryName in categoryMap) {
        const categoryInfo = categoryMap[categoryName];
        const parentKey = categoryName;
        const children = categoryInfo.children;
        generatedSubItems[parentKey] = children;
      }

      // setGeneratedSubItems를 호출하여 generatedSubItems 설정
      setGeneratedSubItems(generatedSubItems);

      // const categoryData_list = {
      //   upperCategory: dropdownItems,
      //   lowerCategory: generatedSubItems,
      // };
      // localStorage.setItem(
      //   "categoryData_list",
      //   JSON.stringify(categoryData_list)
      // );
    });
  }, []);

  const getSubDropdownItems = (item) => {
    return generatedSubItems[item] || [];
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

        <div
          className="code_view actionBtn7 category"
          style={{ marginLeft: "20px", marginBottom: "" }}
        >
          {generateDropdownItems(dropdownItems)}
        </div>
        <div style={{ marginTop: "80px", marginLeft: "" }}>
          <Menu2 />
        </div>

        <form
          className="search-container"
          style={{
            marginRight: "",
            width: "230px",
          }}
        >
          <input
            type="text"
            id="search-bar"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <button type="button" onKeyDown={handleKeyDown}>
            <img
              className="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt="Search Icon"
              onClick={searchSearchTerm}
            />
          </button>
        </form>
        <div>
          {currentUser !== null ? (
            <div style={{ marginTop: "80px" }}>
              <Menu currentUser={currentUser} />
            </div>
          ) : (
            <div style={{ marginTop: "80px", marginLeft: "", display: "flex" }}>
              <Link
                to="/login"
                className="code_view actionBtn7"
                style={{ marginBottom: "10px", marginRight: "0px" }}
              >
                <h4 style={{ margin: 0 }}>LogIN</h4>
              </Link>

              <Link
                to="/register"
                className="code_view actionBtn7"
                style={{
                  marginBottom: "10px",
                  marginRight: "20px",
                  width: "100px",
                }}
              >
                <h4 style={{ margin: 0 }}>Register</h4>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Navbar;
