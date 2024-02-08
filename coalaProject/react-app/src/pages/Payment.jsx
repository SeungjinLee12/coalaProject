import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const paykey = process.env.REACT_APP_PAY;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Payment = ({ item, payinfo }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const make_merchant_uid = () => {
    const current_time = new Date();
    const year = current_time.getFullYear().toString();
    const month = (current_time.getMonth() + 1).toString();
    const day = current_time.getDate().toString();
    const hour = current_time.getHours().toString();
    const minute = current_time.getMinutes().toString();
    const second = current_time.getSeconds().toString();
    const merchant_uid = "MIHEE" + year + month + day + hour + minute + second;
    return merchant_uid;
  };
  const merchant_uid = make_merchant_uid();

  const onClickPayment = () => {
    const IMP = window.IMP; // 생략가능
    IMP.init(paykey); // 예: imp00000000
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: merchant_uid,
        name: `"${payinfo.name}"외 ${payinfo.value - 1}개`,
        amount: payinfo.amount,
        buyer_email: payinfo.email,
        buyer_name: payinfo.userName,
        buyer_tel: payinfo.phone,
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          alert("결제완료");
        } else {
          console.log(rsp);
          alert("결제실패", rsp.error_msg, rsp.error_code);
        }
      }
    );
  };

  const onClickKakaoPayment = () => {
    const IMP = window.IMP; // 생략가능
    IMP.init(paykey); // 예: imp00000000
    IMP.request_pay(
      {
        // param
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: merchant_uid,
        name: `"${payinfo.name}"외 ${payinfo.value - 1}개`,
        amount: 100,
        buyer_email: payinfo.email,
        buyer_name: payinfo.userName,
        buyer_tel: payinfo.phone,
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          alert("결제완료");
          const userNo = currentUser.USER_NO;
          for (const lectureNo of payinfo.checkedCartNumbers) {
            axios.post(`${serverUrl}/lecture/insertPayment`, {
              userNo: userNo,
              lectureNo: lectureNo,
            });
          }
          setTimeout(() => {
            alert("결제가 완료되었습니다.");
            navigate("/api");
          }, 1000);
        } else {
          console.log(rsp);
          alert("결제실패");
        }
      }
    );
  };

  return (
    <div style={{ marginLeft: "-10px" }}>
      <button
        className="bubbly-button"
        onClick={onClickPayment}
        style={{
          width: "150px",
          height: "50px",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        카드결제
      </button>
      <button
        className="bubbly-button"
        onClick={onClickKakaoPayment}
        style={{
          width: "150px",
          height: "50px",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        카카오페이
      </button>
    </div>
  );
};

export default Payment;
