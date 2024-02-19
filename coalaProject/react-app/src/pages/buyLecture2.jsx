import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Payment2 from "./Payment2";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const BuyLecture = (payinfo) => {
  const [cartData, setCartData] = useState([]);
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { title, imageUrl, price, lectureNo, totalValue } = state;

  console.log(state);
  const { currentUser } = useContext(AuthContext);

  let body = {
    userNo: currentUser.USER_NO,
    userName: currentUser.NAME,
    name: title,
    amount: totalValue,
    lectureNo: lectureNo,
    phone: currentUser.PHONE,
    email: currentUser.EMAIL,
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "50px",
          marginLeft: "40%",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "100px", height: "100px", marginRight: "20px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p>제목: {title}</p>
          <p>가격: {formatNumberWithCommas(price)}원</p>
        </div>
      </div>
      <div style={{ marginLeft: "50%", marginTop: "100px" }}>
        <p style={{}}>총 : {formatNumberWithCommas(totalValue)}원 </p>
        <Payment2 item={payinfo} payinfo={body} />
      </div>
    </div>
  );
};

export default BuyLecture;
