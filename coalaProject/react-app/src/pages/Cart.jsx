import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
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
      navigate("/modifyUser/information");
    }, 1000);
  };

  // 체크박스 상태를 관리할 상태 변수
  const [isChecked, setIsChecked] = useState(false);

  // 체크박스 상태가 변경될 때 호출되는 함수
  const handleCheckboxChange = () => {
    // 상태를 반전시켜서 업데이트
    setIsChecked(!isChecked);
  };

  const courses = [
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩njfksanfasdjknfadk",
      price: "10000",
    },
    // ... (이하 생략)
  ];

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        paddingBottom: "100px",
      }}
    >
      <div style={{ alignItems: "center" }}>
        <h1 style={{ alignItems: "center" }}>장바구니</h1>
        {courses.map((course, index) => (
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
              src={course.imageSrc}
              alt={course.title}
              style={{ width: "100px", height: "100px", marginRight: "20px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <p>제목: {course.title}</p>
              <p>가격: {course.price}원</p>
            </div>
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ marginLeft: "40px" }}
              />
            </div>
          </div>
        ))}

        <button
          className="bubbly-button"
          onClick={handleButtonClick}
          style={{
            width: "130px",
            height: "50px",
            marginTop: "100px",
            marginLeft: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default Cart;
