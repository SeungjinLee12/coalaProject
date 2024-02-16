import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../img/coalabenner.jpg";
import React, { useState, useEffect, useContext } from "react";
import { AuthContexProvider, AuthContext } from "../context/authContext";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Pgbar from "../components/progressbar2";

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
  const { lectureNo } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [instructor_info, setInstructor_info] = useState([]);
  const [lectureTOC_list, setLectureTOC_list] = useState([]);
  const [lectureView, setLectureView] = useState([]);
  const [review_list, setReview_list] = useState([]);
  const [userStudy, setUserStudy] = useState([]);
  const [userlectureLastTime, setLectureLastTime] = useState([]);
  const [lectureTotalProgress, setLectureTotalProgress] = useState(0);

  const [userEnrolled, setUserEnrolled] = useState(false);
  const [userProgress, setUserProgress] = useState(false);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [checkWatchedUser, setCheckWatchedUser] = useState(false);
  const [checkReviewList, setCheckReviewList] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      const userNo = currentUser.USER_NO;
      axios
        .get(`${serverUrl}/lecture`, {
          params: { lectureNo: lectureNo, userNo: userNo },
        })
        .then((res) => {
          const resResult = res.data;

          setInstructor_info(resResult.instructor_info[0]);
          setLectureTOC_list(resResult.lectureTOC_list);
          setLectureView(resResult.lectureView[0]);
          setReview_list(resResult.review_list);

          if (resResult.lectureTOC_list[0].message === "ok") {
            setUserProgress(true);
          }

          if (resResult.userlectureLastTime[0].message === "ok") {
            setCheckWatchedUser(true);
            setLectureLastTime(resResult.userlectureLastTime[0]);
          } else {
            setCheckWatchedUser(false);
          }

          if (resResult.review_list[0].message === "ok") {
            setCheckReviewList(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`${serverUrl}/lecture/not`, {
          params: { lectureNo: lectureNo },
        })
        .then((res) => {
          const resResult = res.data;

          setInstructor_info(resResult.instructor_info[0]);
          setLectureTOC_list(resResult.lectureTOC_list);
          setLectureView(resResult.lectureView[0]);
          setReview_list(resResult.review_list);

          if (resResult.userlectureLastTime[0].message === "ok") {
            setCheckWatchedUser(true);
            setLectureLastTime(resResult.userlectureLastTime[0]);
          } else {
            setCheckWatchedUser(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [lectureNo]);

  useEffect(() => {
    let totalProgress = 0;
    // 반복문을 사용하여 각 요소의 tocProgress 값을 더합니다.
    for (const toc of Object.values(lectureTOC_list)) {
      totalProgress += toc.tocProgress;
    }
    setLectureTotalProgress(totalProgress);

    console.log(totalProgress, lectureView.lectureTotalVideoTime); // 모든 tocProgress 값의 총합이 출력됩니다.
  });

  const [lectureInfo_list, setLectureInfo_list] = useState([]);

  useEffect(() => {
    axios
      .post(`${serverUrl}/lecture/watch`, { lectureNo: lectureNo })
      .then((res) => {
        setLectureInfo_list(res.data.lecture_watching_info);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [lectureNo]);

  useEffect(() => {
    if (currentUser !== null) {
      axios
        .get(`${serverUrl}/lecture/userCheck`, {
          params: { lectureNo: lectureNo, userNo: currentUser.USER_NO },
        })
        .then((res) => {
          if (res.data.status === "yes") {
            const resResult = res.data;
            setUserEnrolled(true);
            setUserStudy(resResult.userStudy[0]);
          }
        });
    }
  }, [lectureNo, currentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      axios
        .get(`${serverUrl}/lecture/userCheck2`, {
          params: { lectureNo: lectureNo, userNo: currentUser.USER_NO },
        })
        .then((res) => {
          if (res.data.status === "yes") {
            setCanWriteReview(true);
          }
        });
    }
  }, [lectureNo, currentUser]);

  const reviewModify = (reviewNo, review, star) => {
    const lectureTitle = lectureView.title;
    navigate("/lecture/modifyReview", {
      state: { lectureNo, lectureTitle, reviewNo, review },
    });
  };

  const reviewDelete = (reviewNo) => {
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
    navigate("/lecture/writeReview", { state: { lectureNo, lectureTitle } });
  };

  const WatchLecture = () => {
    const lectureTitle = lectureView.title;
    navigate(`/lecture/watch/?lectureNo=${lectureNo}`, {
      state: { lectureNo, lectureTitle },
    });
  };

  const lectureQNA = () => {
    const lectureTitle = lectureView.title;
    navigate(`/lecture/QNAList/?lectureNo=${lectureNo}`, {
      state: { lectureNo, lectureTitle },
    });
  };
  const insertCart = () => {
    if (currentUser === null) {
      alert("로그인 한 회원만 가능합니다.");
    } else {
      const userNo = currentUser.USER_NO;
      axios
        .post(`${serverUrl}/lecture/add_cart`, {
          userNo: userNo,
          lectureNo: lectureNo,
        })
        .then((res) => {
          if (res.data.status === "no") {
            alert("해당 강의가 이미 회원님의 장바구니에 담겨 있습니다");
          } else if (res.data.status === "yes") {
            alert("해당 과목이 장바구니에 담겼습니다.");
          }
        });
    }
  };

  const handleTOCClick = (tocNo) => {
    if (userEnrolled === true) {
      const lectureTitle = lectureView.title;
      navigate(`/lecture/watch/?lectureNo=${lectureNo}`, {
        state: {
          lectureNo,
          lectureTitle,
          tocNo,
          lectureTOC_list,
          lectureInfo_list,
        },
      });
    }
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
                    style={{ width: "700px", height: "400px" }}
                  />
                </div>
                <div style={{ marginLeft: "20px", left: "100%" }}>
                  <h1>{lectureView.title}</h1>
                  <h5 style={{ marginTop: "10px" }}>강의 설명 : </h5>
                  <h2>{lectureView.description}</h2>
                  <StarRating star={lectureView.star} />

                  <h5 style={{ marginTop: "20px" }}>강의 진행도 : </h5>
                  <Pgbar
                    value={
                      (lectureTotalProgress /
                        lectureView.lectureTotalVideoTime) *
                      100
                    }
                  />
                  <h5 style={{ marginTop: "10px" }}>
                    마지막 시청시간 : <br />
                    {checkWatchedUser
                      ? formatDate(userlectureLastTime.lectureLastTime)
                      : "아직 강의를 시청하지 않았습니다."}
                  </h5>

                  <div style={{ display: "flex", marginTop: "20px" }}>
                    <Button style={{ marginLeft: "" }} onClick={lectureQNA}>
                      강의Q&A
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleTOCClick(lectureTOC_list[0].tocNo)}
                    >
                      강의보기
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
                  <h1>{lectureView.title}</h1>
                  <h5 style={{ marginTop: "10px" }}>강의 설명 : </h5>
                  <h2>{lectureView.description}</h2>
                  <StarRating star={lectureView.star} />
                  <p style={{ margin: "10px 0", marginTop: "30px" }}>
                    가격 : {lectureView.price}
                  </p>
                  <Button style={{}} onClick={insertCart}>
                    장바구니
                  </Button>
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
              height: "250px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <img
                  src={instructor_info.instructor_image}
                  style={{ maxHeight: "230px" }}
                />
              </div>
              <div style={{ paddingLeft: "10px" }}>
                <div style={{ display: "flex" }}>
                  <h1>"{instructor_info.instructor_name}" 강사님</h1>
                  <p style={{ marginTop: "20px", marginLeft: "10px" }}>
                    EMAIL : {instructor_info.instructor_email}
                  </p>
                </div>
                <p style={{ paddingTop: "5px" }}>
                  {instructor_info.instructor_description}
                </p>
                <p style={{ marginTop: "10px" }}>
                  경력 : {instructor_info.instructor_career}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>강의 목차</h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {lectureTOC_list.map((toc, index) => (
              <li
                key={index}
                style={{ marginLeft: "25%", width: "50%" }}
                onClick={() => handleTOCClick(toc.tocNo)}
              >
                <strong>
                  {index + 1}. {toc.toc_title}
                </strong>
                : {toc.toc_description}
                {userProgress ? (
                  <div>
                    <Pgbar
                      style={{ width: "30%" }}
                      value={(toc.tocProgress / toc.tocTotalVideoTime) * 100}
                    />
                  </div>
                ) : null}
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
          {checkReviewList ? (
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
                      <br />
                      {formatDate(review.inserttime)}
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
          ) : (
            <div
              style={{
                marginLeft: "37%",
                display: "flex",
                padding: "8px",
                alignItems: "center",
              }}
            >
              아직 리뷰가 작성되지 않았어요 ㅠㅠ
            </div>
          )}
        </div>
        {userEnrolled && canWriteReview && (
          <Button
            type="submit"
            onClick={ReviewWrite}
            style={{ marginTop: "10px" }}
          >
            리뷰작성
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

export default LectureInfo;
