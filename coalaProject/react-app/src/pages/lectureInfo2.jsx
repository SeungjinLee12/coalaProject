import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../img/coalabenner.jpg";
import React, { useState, useEffect, useContext } from "react";
import { AuthContexProvider, AuthContext } from "../context/authContext";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const StarRating = ({ star }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= star ? "star-filled" : "star-empty";
      const starCharacter = i <= star ? "★" : "☆";
      stars.push(
        <span key={i} className={`star ${starClass}`}>
          {starCharacter}
        </span>
      );
    }
    return stars;
  };

  return <div style={{ display: "flex" }}>{renderStars()}</div>;
};

const LectureInfo = () => {
  const { title } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [instructor_info, setInstructor_info] = useState([]);
  const [lectureTOC_list, setLectureTOC_list] = useState([]);
  const [lectureView, setLectureView] = useState([]);
  const [review_list, setReview_list] = useState([]);
  const [userStudy, setUserStudy] = useState([]);

  const [userEnrolled, setUserEnrolled] = useState(false); // 새로운 상태 추가
  const [canWriteReview, setCanWriteReview] = useState(false); // 새로운 상태 추가

  useEffect(() => {
    axios
      .get(`${serverUrl}/lecture/test3`, { params: { title: title } })
      .then((res) => {
        const resResult = res.data;

        console.log(resResult.lectureView);

        setInstructor_info(resResult.instructor_info[0]);
        setLectureTOC_list(resResult.lectureTOC_list);
        setLectureView(resResult.lectureView[0]);
        setReview_list(resResult.review_list);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [title]);

  useEffect(() => {
    if (currentUser !== null) {
      const lectureNo = lectureView.lectureNo;

      axios
        .get(`${serverUrl}/lecture/userCheck`, {
          params: {
            lectureNo: lectureNo,
            userNo: currentUser.USER_NO,
          },
        })
        .then((res) => {
          if (res.data.status === "yes") {
            const resResult = res.data;
            setUserEnrolled(true);
            setUserStudy(resResult.userStudy[0]);
          }
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      axios
        .get(`${serverUrl}/lecture/userCheck2`, {
          params: {
            lectureNo: lectureView.lectureNo,
            userNo: currentUser.USER_NO,
          },
        })
        .then((res) => {
          if (res.data.status === "yes") {
            setCanWriteReview(true);
          }
        });
    }
  }, [currentUser]);

  const reviewModify = (reviewNo, review, star) => {
    // console.log(review, "ddddddddddddddddd", star);
    const lectureTitle = lectureView.title;
    const lectureNo = lectureView.lectureNo;
    navigate("/lecture/modifyReview", {
      state: { lectureNo, lectureTitle, reviewNo, review },
    });
  };

  const reviewDelete = (reviewNo) => {
    const lectureNo = lectureView.lectureNo;

    axios
      .post(`${serverUrl}/lecture/deleteReview`, {
        lectureNo: lectureNo,
        userNo: currentUser.USER_NO,
        reviewNo: reviewNo,
      })
      .then((res) => {
        alert("리뷰가 삭제되었습니다");
        window.location.reload();
      });
  };

  const ReviewWrite = () => {
    const lectureTitle = lectureView.title;
    const lectureNo = lectureView.lectureNo;

    navigate("/lecture/writeReview", { state: { lectureNo, lectureTitle } });
  };

  const WatchLecture = () => {
    const lectureTitle = lectureView.title;
    const lectureNo = lectureView.lectureNo;

    navigate("/lecture/QNAList", { state: { lectureNo, lectureTitle } });
  };

  const lectureQNA = () => {
    const lectureTitle = lectureView.title;
    const lectureNo = lectureView.lectureNo;

    navigate("/lecture/QNAList", { state: { lectureNo, lectureTitle } });
  };

  return (
    <div>
      <div>
        {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> */}
        <div>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              display: "flex",
            }}
          >
            {userEnrolled ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img
                    src={lectureView.imageUrl}
                    alt={lectureView.title}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div style={{ marginLeft: "20px", left: "100%" }}>
                  <h2 style={{ margin: "10px 0" }}>
                    {lectureView.description}
                  </h2>
                  <StarRating star={lectureView.star} />
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    수강 기한: {lectureView.period}
                  </p>
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    가격 : {lectureView.price}
                  </p>
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    수강 시작일 : {userStudy.starttime}
                  </p>
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    수강률 : {userStudy.studyrate}
                  </p>
                  <div style={{ display: "flex" }}>
                    <Button style={{}} onClick={WatchLecture}>
                      이어서 보기
                    </Button>

                    <Button style={{ marginLeft: "20PX" }} onClick={lectureQNA}>
                      강의Q&A
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img
                    src={lectureView.imageUrl}
                    alt={lectureView.title}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div style={{ marginLeft: "20px", left: "100%" }}>
                  <h2 style={{ margin: "10px 0" }}>
                    {lectureView.description}
                  </h2>
                  <StarRating star={lectureView.star} />
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    수강 기한: {lectureView.period}
                  </p>
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    가격 : {lectureView.price}
                  </p>
                  <button style={{}}>장바구니</button>
                </div>
              </div>
            )}
          </div>
          <h2
            style={{
              marginTop: "50px",
            }}
          >
            강사 소개
          </h2>
          <div
            style={{
              flex: 1,
              border: "1px solid #ccc",
              padding: "10px",
              height: "200px",
            }}
          >
            <div>
              <p>이름 : {instructor_info.instructor_name}</p>
              <p>이메일 : {instructor_info.instructor_email}</p>
              <p>경력 : {instructor_info.instructor_career}</p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>강의 목차</h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {lectureTOC_list.map((toc, index) => (
              <li key={index} style={{ margin: "10px 0" }}>
                <strong>
                  {index + 1}. {toc.toc_title}
                </strong>
                : {toc.toc_description}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            marginTop: "10px",
            padding: "10px",
            marginTop: "50px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#C0C0C0" }}>
              <tr>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    width: "20%",
                  }}
                >
                  작성자
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    width: "15%",
                  }}
                >
                  평점
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  내용
                </th>
              </tr>
            </thead>
            <tbody>
              {review_list.map((review, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {review.name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    <StarRating star={review.star} />
                  </td>
                  <td
                    style={{
                      display: "flex",
                      border: "1px solid #ccc",
                      padding: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div>{review.review}</div>
                    <div>
                      {currentUser && currentUser.NAME === review.name && (
                        <div
                          style={{
                            marginLeft: "50px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Button
                            className="small"
                            style={{
                              width: "50px",
                              height: "30px",
                            }}
                            onClick={() =>
                              reviewModify(
                                review.reviewNo,
                                review.review,
                                review.star
                              )
                            }
                          >
                            수정
                          </Button>
                          <Button
                            className="small"
                            style={{
                              marginLeft: "5px",
                              width: "50px",
                              height: "30px",
                            }}
                            type="submit"
                            onClick={() => reviewDelete(review.reviewNo)}
                          >
                            삭제
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {userEnrolled && canWriteReview && (
          <Button
            type="submit"
            onClick={ReviewWrite}
            style={{ marginTop: "10px" }}
          >
            저장
          </Button>
        )}
      </div>
    </div>
  );
};

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

export default LectureInfo;
