import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <h2 style={{ paddingBottom: "8px" }}>{label}-------------------------</h2>
      <select id={`${idPrefix}-month`} onChange={handleMonthChange}>
        <option value="hide">----</option>
        <option value="january">1월</option>
        {/* 다른 월 옵션 추가 */}
      </select>

      <select id={`${idPrefix}-year`} onChange={handleYearChange}>
        <option value="hide">----</option>
        <option value="2020">2020년</option>
        {/* 다른 연도 옵션 추가 */}
      </select>
    </div>
  );
};

const Register = () => {
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
    }, 500);
  };
  return (
    <>
      <h1>관심분야 설정</h1>
      <MonthYearDropdowns idPrefix="first" label="①" />
      <MonthYearDropdowns idPrefix="second" label="②" />
      <MonthYearDropdowns idPrefix="third" label="③" />
      <button className="bubbly-button" onClick={handleButtonClick}>
        success
      </button>
    </>
  );
};

export default Register;
