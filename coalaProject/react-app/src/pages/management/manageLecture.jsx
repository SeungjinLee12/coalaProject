import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsModal from "./InstructorList";
import TOCModal from "./TOCModal";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const TableComponent = ({ tableData, removeTOCItem }) => {
  const handleRemoveClick = (index) => {
    removeTOCItem(index);
  };

  return (
    <table
      style={{
        borderCollapse: "collapse",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={{ ...styles.tableHeader, width: "150px" }}>목차 제목</th>
          <th style={{ ...styles.tableHeader, width: "380px" }}>목차 설명</th>
          <th style={{ ...styles.tableHeader, width: "100px" }}>비디오길이</th>
          <th style={{ ...styles.tableHeader, width: "50px" }}></th>{" "}
          {/* 삭제 버튼 추가 */}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr
            key={index}
            style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
          >
            <td style={{ ...styles.tableCell, ...styles.customCellStyle }}>
              {item.TOCtitle}
            </td>
            <td style={{ ...styles.tableCell, width: "380px" }}>
              {item.TOCdescription}
            </td>
            <td style={{ ...styles.tableCell, ...styles.customCellStyle2 }}>
              {item.videoDuration}초
            </td>
            <td style={{ ...styles.tableCell, width: "50px" }}>
              {" "}
              {/* 삭제 버튼 셀 */}
              <button onClick={() => handleRemoveClick(index)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ManageLecture = () => {
  const selefile = useRef();

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [inputChangeLectureTitle, setinputChangeLectureTitle] = useState("");
  const [inputChangeLecturePrice, setinputChangeLecturePrice] = useState("");
  const [inputChangeLectureDescription, setinputChangeLectureDescription] =
    useState("");
  const [img, setImg] = useState(null);
  const [imgpath, setImgpath] = useState("");
  // const[]

  const handleInputLectureTitleChange = (e) => {
    setinputChangeLectureTitle(e.target.value);
  };
  const handleInputLecturePriceChange = (e) => {
    setinputChangeLecturePrice(e.target.value);
  };
  const handleInputLectureDescriptionChange = (e) => {
    setinputChangeLectureDescription(e.target.value);
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

    for (var i = 0; i < bubblyButtons.lengtah; i++) {
      bubblyButtons[i].addEventListener("click", animateButton, false);
    }
  }, []);

  const handleClickAddLecture = () => {
    if (!inputChangeLectureTitle) {
      alert("강의제목을 입력해주세요");
    } else if (!img) {
      alert("강의 썸네일 이미지를 넣어주세요.");
    } else if (!inputChangeLecturePrice) {
      alert("강의 가격을 입력해주세요.");
    } else if (!inputChangeLectureDescription) {
      alert("강의 설명을 입력해주세요");
    } else if (!selectedInstructor.insNo) {
      alert("강사를 선택해주세요.");
    } else if (!TOCList) {
      alert("강의 목차를 추가해주세요.");
    } else {
      const lectureData = new FormData();
      lectureData.append("img", img);
      lectureData.append("lectureTitle", inputChangeLectureTitle);
      lectureData.append("lecturePrice", inputChangeLecturePrice);
      lectureData.append("lectureDescription", inputChangeLectureDescription);
      lectureData.append("insNo", selectedInstructor.insNo);

      axios
        .post(`${serverUrl}/management/addLecture`, lectureData)
        .then((res) => {
          console.log(res.data);
          const lectureNo = res.data;
          const tocData = new FormData();
          TOCList.forEach((item, index) => {
            tocData.append("TOCtitle", item.TOCtitle);
            tocData.append("TOCdescription", item.TOCdescription);
            tocData.append("videoDuration", item.videoDuration);
            tocData.append("videoFile", item.videoFile);
            tocData.append("lecNo", lectureNo);
          });
          axios
            .post(`${serverUrl}/management/addLectureTOC`, tocData)
            .then((res) => {
              if (res.data.message === "ok") {
                alert("강의가 등록되었습니다.");
                navigate("/api");
              }
            });
        });
    }
  };

  const [insModalOpen, setInsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const handleInsModalOpen = () => {
    setInsModalOpen(true);
  };

  const handleInstructorSelect = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const [TOCModalOpen, setTOCModalOpen] = useState(false);
  const [TOCList, setTOCList] = useState([]); // TOC 리스트 상태
  const [videoPath, setVideoPath] = useState("");

  const removeTOCItem = (index) => {
    const updatedTOCList = [...TOCList];
    updatedTOCList.splice(index, 1); // 인덱스에 해당하는 항목 제거
    setTOCList(updatedTOCList); // TOC 리스트 업데이트
  };

  const handleTOCModalOpen = () => {
    setTOCModalOpen(true);
  };

  const handleTOCAdded = (tocInfo) => {
    setTOCList([...TOCList, tocInfo]);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", padding: "20px", marginTop: "40px" }}>
        <ul>
          <li>
            <a
              href="/management/addInstructor"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              강사등록
              <li style={{ marginTop: "20%" }}>
                <a
                  href="/management/addLecture"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  강의등록
                </a>
              </li>
            </a>
          </li>
          {/* <li style={{ marginTop: "20%" }}>
            <a
              href="/modifyUser/interest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              회원 관리
            </a>
          </li> */}
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
          // width: "80%",
        }}
      >
        <div style={{ marginLeft: "50px" }}>
          <div style={{ marginLeft: "100px" }}>
            <h1 style={{ marginLeft: "80px" }}>관리자 PAGE - 강의 등록</h1>
            <div style={{ marginLeft: "40px", marginTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "60px",
                }}
              >
                강의 제목
                <input
                  value={inputChangeLectureTitle}
                  onChange={handleInputLectureTitleChange}
                  placeholder="   Enter Lecture Title"
                  style={{
                    marginRight: "10px",
                    border: "1px solid #ccc", // 테두리 스타일 추가
                    borderRadius: "8px", // 테두리의 둥글기 조절
                    marginLeft: "33px",
                    alignItems: "center",
                    width: "200px",
                    height: "30px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "60px",
                }}
              >
                <img
                  src={imgpath} // imgpath 상태를 사용하여 미리보기를 표시합니다.
                  alt="이미지 선택"
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "cover", // 이미지가 잘리지 않도록 설정합니다.
                    cursor: "pointer",
                    border: "1px solid #ccc", // 테두리 스타일 추가
                  }}
                />
                <input
                  type="file"
                  ref={selefile}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setImg(e.target.files[0]);

                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => {
                      setImgpath(reader.result); // 선택된 파일의 내용을 읽어와서 imgpath 상태에 저장합니다.
                    };
                  }}
                />
                {/* <br /> */}
                <button
                  className="bubbly-button"
                  onClick={() => selefile.current.click()}
                  style={{
                    // marginTop: "",
                    marginLeft: "20px",
                    width: "100px",
                  }}
                >
                  사진
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "60px",
                }}
              >
                강의 가격
                <input
                  value={inputChangeLecturePrice}
                  onChange={handleInputLecturePriceChange}
                  placeholder="   Enter Lecture Price"
                  style={{
                    marginRight: "10px",
                    border: "1px solid #ccc", // 테두리 스타일 추가
                    borderRadius: "8px", // 테두리의 둥글기 조절
                    marginLeft: "33px",
                    alignItems: "center",
                    width: "200px",
                    height: "30px",
                  }}
                />
              </div>

              <div
                style={{
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "60px",
                }}
              >
                DESCRIPTION
                <br />
                <textarea
                  value={inputChangeLectureDescription}
                  onChange={handleInputLectureDescriptionChange}
                  placeholder="   Enter Lecture Description"
                  style={{
                    marginTop: "10px",
                    marginRight: "10px",
                    border: "1px solid #ccc", // 테두리 스타일 추가
                    borderRadius: "8px", // 테두리의 둥글기 조절
                    marginLeft: "-50px",
                    alignItems: "center",
                    width: "450px",
                    height: "200px",
                    resize: "none",
                  }}
                />
              </div>
              <button
                className="bubbly-button"
                style={{ marginLeft: "150px", marginTop: "20px" }}
                onClick={handleInsModalOpen}
              >
                강사 선택하기
              </button>
              {selectedInstructor && (
                <div
                  style={{
                    border: "1px solid #000000",
                    marginTop: "10px",
                    width: "300px",
                    marginLeft: "80px",
                  }}
                >
                  <h2 style={{ marginLeft: "30%", marginTop: "5px" }}>
                    선택된 강사
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    <h4
                      style={{
                        marginTop: "35px",
                        marginLeft: "30px",
                      }}
                    >
                      "{selectedInstructor.insName}"강사님
                    </h4>
                    <p>
                      <img
                        src={selectedInstructor.insImage}
                        alt={selectedInstructor.insName}
                        style={{
                          width: "100px",
                          height: "auto",
                          marginLeft: "20px",
                        }}
                      />
                    </p>
                  </div>
                </div>
              )}

              {insModalOpen && (
                <InsModal
                  onClose={() => setInsModalOpen(false)}
                  onSelectInstructor={handleInstructorSelect} // 새로운 콜백 함수 전달
                />
              )}
            </div>
          </div>
          <div>
            <button
              className="bubbly-button"
              style={{
                marginLeft: "290px",
                marginTop: "20px",
              }}
              onClick={handleTOCModalOpen}
            >
              목차 추가하기
            </button>
            {TOCModalOpen && (
              <TOCModal
                onClose={() => setTOCModalOpen(false)}
                onAddedInstructor={handleTOCAdded} // 새로운 콜백 함수 전달
              />
            )}
            <TableComponent tableData={TOCList} removeTOCItem={removeTOCItem} />
          </div>
          <button
            className="bubbly-button"
            onClick={handleClickAddLecture}
            style={{
              width: "140px",
              height: "50px",
              display: "flex",
              marginTop: "100px",
              marginLeft: "300px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            강의등록
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  tableHeader: {
    backgroundColor: "#f2f2f2",
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
  tableRowOdd: {
    backgroundColor: "#fff",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  customCellStyle: {
    textAlign: "center",
    padding: "12px", // 패딩을 더 넓게 설정
    width: "150px", // 각 셀의 너비를 30px로 설정
  },
  customCellStyle2: {
    textAlign: "center",
    padding: "12px", // 패딩을 더 넓게 설정
    width: "100px", // 각 셀의 너비를 30px로 설정
  },
};

export default ManageLecture;
