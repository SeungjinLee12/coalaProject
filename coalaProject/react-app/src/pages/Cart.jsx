import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 추가
import { AuthContexProvider, AuthContext } from "../context/authContext";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({}); // 변경 부분
  const [checkCartOk, setCheckCartOk] = useState(true);

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

  const handleButtonClick = () => {
    console.log(cartData, cartData.length);
    // const checkedCartNumbers = Object.entries(checkedItems)
    //   .filter(([_, isChecked]) => isChecked)
    //   .map(([lectureNo, _]) => lectureNo);

    // const totalValue = cartData
    //   .filter((item) => checkedItems[item.lectureNo])
    //   .reduce((sum, item) => sum + item.price, 0);

    // console.log("체크된 항목들의 총 가격:", totalValue);
    // const checkedCartData = cartData.filter(
    //   (item) => checkedItems[item.lectureNo]
    // );

    // console.log("체크된 항목들의 전체 정보:", checkedCartData);
    // if (checkedCartData.length !== 0) {
    //   setTimeout(() => {
    //     navigate("/api/buyLecture", {
    //       state: { checkedCartData, totalValue, checkedCartNumbers },
    //     });
    //   }, 1000);
    // } else {
    //   alert("선택된 과목이 없습니다!");
    // }
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleDeleteButtonClick = () => {
    const checkedCartNumbers = Object.entries(checkedItems)
      .filter(([_, isChecked]) => isChecked)
      .map(([lectureNo, _]) => lectureNo);

    const totalValue = cartData
      .filter((item) => checkedItems[item.lectureNo])
      .reduce((sum, item) => sum + item.price, 0);

    console.log("체크된 항목들의 총 가격:", totalValue);
    const checkedCartData = cartData.filter(
      (item) => checkedItems[item.lectureNo]
    );
    if (checkedCartData.length !== 0) {
      const userNo = currentUser.USER_NO;
      for (const lectureNo of checkedCartNumbers) {
        axios.post(`${serverUrl}/modifyUser/deleteCart`, {
          userNo: userNo,
          lectureNo: lectureNo,
        });
      }
      setTimeout(() => {
        alert("해당 과목이 장바구니에서 삭제되었습니다.");
        window.location.reload();
      }, 1000);
    } else {
      alert("선택된 과목이 없습니다!");
    }
  };

  const handleCheckboxChange = (lectureNo) => {
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [lectureNo]: !prevItems[lectureNo],
    }));

    // 체크 상태가 변경될 때마다 cartData 배열을 업데이트합니다.
    const updatedCartData = cartData.map((item) => {
      if (item.lectureNo === lectureNo) {
        return {
          ...item,
          isChecked: !checkedItems[item.lectureNo],
        };
      }
      return item;
    });
    setCartData(updatedCartData);
  };

  useEffect(() => {
    // 서버에서 장바구니 데이터를 가져오는 함수
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/modifyUser/cart/?userNo=${currentUser.USER_NO}`
        );
        setCartData(response.data); // 받아온 데이터를 상태에 저장
        if (response.data[0].message === "ok") {
          setCheckCartOk(false);
        }
      } catch (error) {
        console.error("장바구니 데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchCartData(); // 함수 호출
  }, [currentUser.USER_NO]);

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
          justifyContent: "center",
          width: "80%",
        }}
      >
        {cartData.length !== 0 ? (
          <>
            <h1 style={{ alignItems: "center", marginLeft: "35%" }}>
              My Page - 장바구니
            </h1>

            {cartData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "50px",
                  marginLeft: "25%",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "20px",
                  }}
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
                <div>
                  <input
                    type="checkbox"
                    checked={checkedItems[item.lectureNo]}
                    onChange={() => handleCheckboxChange(item.lectureNo)}
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
                marginLeft: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              결제하기
            </button>
            <button
              className="bubbly-button"
              onClick={handleDeleteButtonClick}
              style={{
                width: "130px",
                height: "50px",
                marginTop: "10px",
                marginLeft: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              카트에서 빼기
            </button>
          </>
        ) : (
          <div>
            <h1 style={{ alignItems: "center", marginLeft: "35%" }}>
              My Page - 장바구니
            </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3 style={{ alignItems: "center", marginLeft: "40%" }}>
              장바구니가 비었습니다!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
