import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./instructorModal.css"; // 모달 스타일을 위한 CSS 파일을 불러옵니다.
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Modal({ onClose, onSelectInstructor }) {
  const [instructorList, setInstructorList] = useState([]);
  const [selectedIns, setSelectedIns] = useState(""); // 선택된 강사 상태 추가
  const endOfPageRef = useRef(null);

  useEffect(() => {
    axios.get(`${serverUrl}/management/zz`).then((res) => {
      setInstructorList(res.data);
    });
  }, []);

  const handleSelectInstructor = (insName) => {
    setSelectedIns(insName); // 강사 선택 시 상태 업데이트
    endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCompleteSelection = () => {
    if (selectedIns === "") {
      alert("강사를 선택해주세요");
    } else {
      onClose(); // 모달 닫기
      onSelectInstructor(selectedIns); // 새로운 콜백 함수 호출
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>강사 선택</h2>
        <table className="instructor-table" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>이름</th>
              <th>EMAIL</th>
              <th>이미지</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {instructorList.map((instructor) => (
              <tr key={instructor.insNo}>
                <td>{instructor.insName}</td>
                <td>{instructor.email}</td>
                <td style={{ height: "140px" }}>
                  <img
                    src={instructor.insImage}
                    alt={instructor.insName}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>
                  <Button
                    onClick={() => handleSelectInstructor(instructor)}
                    style={{ marginRight: "-16px", marginLeft: "-5px" }}
                  >
                    선택
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex" }} ref={endOfPageRef}>
          <h3 style={{ marginTop: "20px" }}>
            선택된 강사: {selectedIns ? selectedIns.insName : ""}
          </h3>
          <button
            className="select-button"
            onClick={handleCompleteSelection}
            style={{ marginLeft: "auto" }}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}

const blue1 = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue1[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  display: flex; /* 추가된 스타일 */
  align-items: center; /* 추가된 스타일 */
  justify-content: center; /* 추가된 스타일 */
  cursor: pointer;
  border: 1px solid ${blue1[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue1[400]}, inset 0 -2px 1px ${blue1[600]};

  &:hover {
    background-color: ${blue1[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue1[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue1[300] : blue1[200]
    };
    outline: none;
  }

  
  &.small {
    font-size: 0.5rem; // 작은 크기에 맞게 조절
  }

  `
);

export default Modal;
