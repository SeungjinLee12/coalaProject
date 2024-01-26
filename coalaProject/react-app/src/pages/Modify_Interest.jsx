import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MonthYearDropdowns = ({ idPrefix, label }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h2 style={{ paddingBottom: "8px" }}>{label}</h2>
      <span style={{ margin: "0 8px" }}></span>
      <select
        id={`${idPrefix}-month`}
        onChange={handleMonthChange}
        style={{
          border: "1px solid #ccc", // 테두리 스타일 추가
        }}
      >
        <option value="hide">----</option>
        <option value="january">1월</option>
        {/* 다른 월 옵션 추가 */}
      </select>
      <span style={{ margin: "0 8px" }}>→</span>
      <select
        id={`${idPrefix}-year`}
        onChange={handleYearChange}
        style={{
          border: "1px solid #ccc", // 테두리 스타일 추가
        }}
      >
        <option value="hide">----</option>
        <option value="2020">2020년</option>
        {/* 다른 연도 옵션 추가 */}
      </select>
    </div>
  );
};

const Modify_Interest = () => {
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

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", padding: "20px", marginTop: "40px" }}>
        <ul>
          <li>
            <a
              href="/modifyUser/password"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              비밀번호 변경
            </a>
          </li>
          <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/information"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              내 정보 수정
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
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <div style={{}}>
          <h1>My Page - 관심분야 설정</h1>
          <div
            style={{
              //   display: "flex",
              alignItems: "center",
              marginTop: "50px",
              marginLeft: "60px",
            }}
          >
            <MonthYearDropdowns idPrefix="first" label="①" />
            <MonthYearDropdowns idPrefix="second" label="②" />
            <MonthYearDropdowns idPrefix="third" label="③" />
          </div>
          <button
            className="bubbly-button"
            onClick={handleButtonClick}
            style={{
              width: "97px",
              height: "50px",
              display: "flex",
              marginTop: "100px",
              marginLeft: "300px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modify_Interest;
