import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Modify_Payment = () => {
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
  const courses = [
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      price: "10000",
      starttime: "~~~~~~~~~~",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      price: "10000",
      starttime: "~~~~~~~~~~",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      price: "10000",
      starttime: "~~~~~~~~~~",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      price: "10000",
      starttime: "~~~~~~~~~~",
    },
    {
      imageSrc:
        "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
      title: "생활코딩 ! NODE.JS 노드제이에스 프로그래밍",
      price: "10000",
      starttime: "~~~~~~~~~~",
    },
    // Add other courses in a similar format
  ];

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
          <li style={{ marginTop: "25%" }}>
            <a
              href="/modifyUser/information"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              내 정보 수정
            </a>
          </li>
          <li style={{ marginTop: "25%" }}>
            <a
              href="/modifyUser/interest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              관심분야 수정
            </a>
          </li>
          <li style={{ marginTop: "25%" }}>
            <a
              href="/modifyUser/payment"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              결제내역
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
              <div style={{ marginRight: "130px" }}>
                <p>제목 : {course.title}</p>
                <p>가격: {course.price}원</p>
                <p>시작 시간: {course.starttime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modify_Payment;
