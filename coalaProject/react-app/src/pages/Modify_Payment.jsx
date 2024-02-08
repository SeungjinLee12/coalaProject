import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 추가
import { AuthContexProvider, AuthContext } from "../context/authContext";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Modify_Payment = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
      navigate("/modifyUser/information");
    }, 1000);
  };

  const formatDate = (datetimeString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(datetimeString).toLocaleString("ko-KR", options);
  };

  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    // 서버에서 장바구니 데이터를 가져오는 함수
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/modifyUser/payment/?userNo=${currentUser.USER_NO}`
        );
        setPaymentData(response.data); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error("결제내역 데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchCartData(); // 함수 호출
  }, []);

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
          <h1 style={{ marginLeft: "210px" }}>My Page - 결제 내역</h1>
          {paymentData.map((course, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "50px",
                marginLeft: "60px",
              }}
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                style={{ width: "100px", height: "100px", marginRight: "20px" }}
              />
              <div style={{ marginRight: "130px" }}>
                <p>제목 : {course.title}</p>
                <p>가격: {formatNumberWithCommas(course.price)}원</p>
                <p>결제 시간: {formatDate(course.paymenttime)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modify_Payment;
