import React, { useState, useEffect, useContext, useRef } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { AuthContexProvider, AuthContext } from "../context/authContext";
import { useAuth } from "../context/authContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const QNA = () => {
  const replyDivRef = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const {
    lectureNo,
    lectureTitle,
    userName,
    inserttime,
    questionNo,
    questionTitle,
  } = state;

  const [question, setQuestion] = useState([]);
  const [replyList, setReplyList] = useState([]);

  const [comments, setComments] = useState("");
  const [editReplyNo, setEditReplyNo] = useState("");

  const [buttonState, setButtonState] = useState(false);

  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  const handleAddComment = () => {
    const userNo = currentUser.USER_NO;
    if (comments !== "") {
      axios
        .post(`${serverUrl}/lecture/QNA/reply`, {
          questionNo: questionNo,
          userNo: userNo,
          REPLY: comments,
        })
        .then((res) => {
          alert("댓글이 작성되었습니다");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (comments === "" || comments === null) {
      alert("댓글을 작성해주세요");
    }
  };

  const handleReplyDelete = (replyNo, name_r) => {
    const userNo = currentUser.USER_NO;
    if (name_r === currentUser.NAME) {
      axios
        .post(`${serverUrl}/lecture/QNA/deleteReply`, {
          replyNo: replyNo,
          userNo: userNo,
        })
        .then((res) => {
          alert("댓글이 삭제되었습니다");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("본인이 작성한 댓글만 삭제가 가능합니다.");
    }
  };

  const handleReplyModify = (name_r, reply, replyNo) => {
    const userNo = currentUser.USER_NO;
    const userName = currentUser.NAME;

    if (userName === name_r) {
      setComments(reply);
      setButtonState(true);
      setEditReplyNo(replyNo);
      if (replyDivRef.current) {
        replyDivRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      alert("본인이 작성한 댓글만 수정이 가능합니다.");
    }
  };

  const handleModifyComment = () => {
    const userNo = currentUser.USER_NO;
    console.log(comments);
    if (comments !== "") {
      axios
        .post(`${serverUrl}/lecture/QNA/modifyReply`, {
          replyNo: editReplyNo,
          userNo: userNo,
          REPLY: comments,
        })
        .then((res) => {
          alert("댓글이 수정되었습니다");
          setButtonState(false);
          setComments("");
          setEditReplyNo("");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (comments === "" || comments === null) {
      alert("댓글을 작성해주세요");
    }
  };

  useEffect(() => {
    axios
      .post(`${serverUrl}/lecture/QNA/?questionNo=${questionNo}`)
      .then((res) => {
        setQuestion(res.data.question_info[0]);
        setReplyList(res.data.reply_list);
        console.log(res.data.reply_list);
      });
  }, []);

  return (
    <div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <>
        <div>
          <h1 style={{ marginTop: "20px" }}>{lectureTitle} - Q&A</h1>
          <h2>제목 : {questionTitle}</h2>
          <h4>작성자 : {userName}</h4>
          <h5>작성일 : {formatDate(inserttime)}</h5>

          <div style={{ whiteSpace: "normal" }}>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "6px",
                width: "100%",
                minHeight: "200px",
              }}
            >
              {question.question}
            </div>
          </div>
        </div>
      </>
      <h2 style={{ marginTop: "20px" }}>댓글</h2>
      <div
        style={{
          border: "1px solid #ccc",
          marginTop: "10px",
          padding: "10px",
          // marginTop: "50px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {replyList.map((replyList, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid ",
                    height: "150px", // 높이 조절
                    display: "flex",
                    flexDirection: "column", // 열 방향으로 정렬
                  }}
                >
                  {/* 위쪽 칸 (이름) */}
                  <div
                    style={{
                      backgroundColor: "#c0c0c0",
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                      borderBottom: "1px solid #ccc", // 아래쪽 테두리 추가
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ▶ {replyList.name_r}{" "}
                    </p>
                    <p style={{ color: "blue", marginLeft: "5px" }}>
                      {userName === replyList.name_r ? "(작성자)" : null}
                    </p>
                    <div
                      style={{
                        flex: "1",
                        textAlign: "right",
                        marginLeft: "470px",
                      }}
                    >
                      {" "}
                      {userName === replyList.name_r ? (
                        <div style={{}}>
                          <button
                            onClick={() =>
                              handleReplyModify(
                                replyList.name_r,
                                replyList.reply,
                                replyList.replyNo
                              )
                            }
                          >
                            수정
                          </button>{" "}
                          <button
                            onClick={() =>
                              handleReplyDelete(
                                replyList.replyNo,
                                replyList.name_r
                              )
                            }
                          >
                            삭제
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div
                      style={{
                        flex: "1", // 오른쪽에 정렬
                        textAlign: "right",
                      }}
                    >
                      {formatDate(replyList.inserttime_r)}
                    </div>
                  </div>

                  {/* 아래쪽 칸 (내용) */}
                  <div
                    style={{
                      flex: "1", // 아래쪽에 정렬
                      padding: "8px",
                    }}
                  >
                    <div>{replyList.reply}</div>
                  </div>
                </td>
              </tr>
            ))}
            <div
              style={{
                marginBottom: "10px",
                height: "200px",
                display: "flex",
                marginTop: "20px",
              }}
            >
              <div style={{ width: "20%" }}></div>
              <div style={{ border: "1px solid black", width: "65%" }}>
                <div
                  style={{
                    backgroundColor: "#c0c0c0",
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    borderBottom: "1px solid #ccc", // 아래쪽 테두리 추가
                  }}
                >
                  ▶ {currentUser.NAME}
                </div>
                <textarea
                  placeholder="댓글을 입력하세요."
                  value={comments}
                  onChange={handleCommentChange}
                  style={{
                    width: "100%",
                    height: "79%",
                    boxSizing: "border-box",
                    whiteSpace: "normal",
                    resize: "none",
                  }}
                  ref={replyDivRef}
                ></textarea>
              </div>
              {buttonState === true ? (
                <Button
                  type="submit"
                  onClick={handleModifyComment}
                  style={{
                    height: "40px",
                    marginTop: "80px",
                    marginLeft: "10px",
                  }}
                >
                  댓글 수정
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleAddComment}
                  style={{
                    height: "40px",
                    marginTop: "80px",
                    marginLeft: "10px",
                  }}
                >
                  댓글 추가
                </Button>
              )}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
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

const blue = {
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
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  `
);
export default QNA;
