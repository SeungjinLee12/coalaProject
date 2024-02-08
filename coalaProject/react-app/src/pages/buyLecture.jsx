import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Payment from "./Payment";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const BuyLecture = (payinfo) => {
  const [cartData, setCartData] = useState([]);
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { checkedCartData, totalValue, checkedCartNumbers } = state;
  const { currentUser } = useContext(AuthContext);

  let body = {
    userNo: currentUser.USER_NO,
    userName: currentUser.NAME,
    name: checkedCartData[0].title,
    amount: totalValue,
    phone: currentUser.PHONE,
    email: currentUser.EMAIL,
    value: checkedCartData.length,
    checkedCartNumbers: checkedCartNumbers,
  };

  return (
    <div
      style={{
        padding: "20px",
        justifyContent: "center",
        width: "80%",
      }}
    >
      <h1 style={{ alignItems: "center", marginLeft: "50%" }}>강의 결제</h1>
      {checkedCartData.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
            marginLeft: "40%",
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ width: "100px", height: "100px", marginRight: "20px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p>제목: {item.title}</p>
            <p>가격: {formatNumberWithCommas(item.price)}원</p>
          </div>
        </div>
      ))}
      <div style={{ marginLeft: "50%", marginTop: "100px" }}>
        <p style={{}}>총 : {formatNumberWithCommas(totalValue)}원 </p>
        <Payment item={payinfo} payinfo={body} />
      </div>
    </div>
  );
};

export default BuyLecture;
