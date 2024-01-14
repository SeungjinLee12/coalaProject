const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();

//      "/lecture"

//강의상세보기(수강중X)
router.get("/", (req, res) => {
  const lectureNo = req.query.lectureNo;
  db.query(
    `UPDATE LECTURE
    SET VIEW_CNT = VIEW_CNT+1
    WHERE LECTURE_NO = ?;`,
    [lectureNo],
    function (err, rows) {
      if (err) {
        throw err;
      }

      console.log("조회수 1 증가");

      db.query(
        `SELECT TITLE, PERIOD, IMAGEURL, PRICE, STAR, DESCRIPTION 
        FROM LECTURE 
        WHERE LECTURE_NO = ?`,
        [lectureNo],
        function (err, rows) {
          if (err) {
            throw err;
          }

          var lectureView = rows.map((row) => ({
            title: row.TITLE,
            period: row.PERIOD,
            imageUrl: row.IMAGEURL,
            price: row.PRICE,
            star: row.STAR,
            description: row.DESCRIPTION,
          }));

          db.query(
            `SELECT TOC.TITLE, TOC.DESCRIPTION 
            FROM LectureTOC TOC 
            JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
            WHERE L.LECTURE_NO = ?`,
            [lectureNo],
            function (err, rows) {
              if (err) {
                throw err;
              }

              var lectureTOC = rows.map((row) => ({
                title: row.TITLE,
                TOC_description: row.DESCRIPTION,
              }));

              db.query(
                `SELECT INFO.VIDEOURL, INFO.DESCRIPTION 
                FROM LectureInfo INFO 
                JOIN LECTURE L ON L.LECTURE_NO =INFO.LECTURE_NO 
                WHERE L.LECTURE_NO = ?;`,
                [lectureNo],
                function (err, rows) {
                  if (err) {
                    throw err;
                  }

                  var lectureInfo = rows.map((row) => ({
                    videoUrl: row.VIDEOURL,
                    info_description: row.DESCRIPTION,
                  }));

                  db.query(
                    `SELECT R.REVIEW, R.STAR, U.NAME 
                    FROM REVIEW R 
                    JOIN LECTURE L ON L.LECTURE_NO =R.LECTURE_NO 
                    JOIN USER U ON U.USER_NO = R.USER_NO 
                    WHERE L.LECTURE_NO = ?;`,
                    [lectureNo],
                    function (err, rows) {
                      if (err) {
                        throw err;
                      }

                      var review = rows.map((row) => ({
                        review: row.REVIEW,
                        star: row.STAR,
                        userName: row.NAME,
                      }));
                      db.query(
                        `SELECT I.NAME, I.EMAIL, I.CAREER 
                        FROM INSTRUCTOR I
                        JOIN LECTURE L ON L.INSTRUCTOR_NO = I.INSTRUCTOR_NO 
                        WHERE L.LECTURE_NO = ?;`,
                        [lectureNo],
                        function (err, rows) {
                          if (err) throw err;
                          var instructor = rows.map((row) => ({
                            instructor_name: row.NAME,
                            instructor_email: row.EMAIL,
                            instructor_career: row.CAREER,
                          }));

                          const resResult = {
                            lectureView: lectureView,
                            lectureTOC_list: lectureTOC,
                            lectureInfo: lectureInfo,
                            review_list: review,
                            instructor_info: instructor,
                          };

                          res.json(resResult);
                          console.log(resResult);
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

//강의상세보기(수강중)
router.get("/1", (req, res) => {
  const lectureNo = req.query.lectureNo;
  console.log(lectureNo);
  db.query(
    `UPDATE LECTURE
    SET VIEW_CNT = VIEW_CNT+1
    WHERE LECTURE_NO = ?;`,
    [lectureNo],
    function (err, rows) {
      if (err) {
        throw err;
      }

      console.log("조회수 1 증가");

      db.query(
        `SELECT L.TITLE, L.PERIOD, L.IMAGEURL, L.PRICE, L.STAR, L.DESCRIPTION, S.STARTTIME, S.STUDYRATE
        FROM LECTURE L
        JOIN STUDY S ON L.LECTURE_NO = S.LECTURE_NO
        WHERE L.LECTURE_NO = ?;`,
        [lectureNo],
        function (err, rows) {
          if (err) {
            throw err;
          }

          var lectureView = rows.map((row) => ({
            title: row.TITLE,
            period: row.PERIOD,
            imageUrl: row.IMAGEURL,
            price: row.PRICE,
            star: row.STAR,
            description: row.DESCRIPTION,
            starttime: row.STARTTIME,
            studyrate: row.STUDYRATE,
          }));

          db.query(
            `SELECT TOC.TITLE, TOC.DESCRIPTION 
            FROM LectureTOC TOC 
            JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
            WHERE L.LECTURE_NO = ?`,
            [lectureNo],
            function (err, rows) {
              if (err) {
                throw err;
              }

              var lectureTOC = rows.map((row) => ({
                title: row.TITLE,
                TOC_description: row.DESCRIPTION,
              }));

              db.query(
                `SELECT INFO.VIDEOURL, INFO.DESCRIPTION 
                FROM LectureInfo INFO 
                JOIN LECTURE L ON L.LECTURE_NO =INFO.LECTURE_NO 
                WHERE L.LECTURE_NO = ?;`,
                [lectureNo],
                function (err, rows) {
                  if (err) {
                    throw err;
                  }

                  var lectureInfo = rows.map((row) => ({
                    videoUrl: row.VIDEOURL,
                    info_description: row.DESCRIPTION,
                  }));

                  db.query(
                    `SELECT R.REVIEW, R.STAR, U.NAME 
                    FROM REVIEW R 
                    JOIN LECTURE L ON L.LECTURE_NO =R.LECTURE_NO 
                    JOIN USER U ON U.USER_NO = R.USER_NO 
                    WHERE L.LECTURE_NO = ?;`,
                    [lectureNo],
                    function (err, rows) {
                      if (err) {
                        throw err;
                      }

                      var review = rows.map((row) => ({
                        review: row.REVIEW,
                        star: row.STAR,
                        userName: row.NAME,
                      }));
                      db.query(
                        `SELECT I.NAME, I.EMAIL, I.CAREER 
                        FROM INSTRUCTOR I
                        JOIN LECTURE L ON L.INSTRUCTOR_NO = I.INSTRUCTOR_NO 
                        WHERE L.LECTURE_NO = ?;`,
                        [lectureNo],
                        function (err, rows) {
                          if (err) throw err;
                          var instructor = rows.map((row) => ({
                            instructor_name: row.NAME,
                            instructor_email: row.EMAIL,
                            instructor_career: row.CAREER,
                          }));

                          const resResult = {
                            lectureView: lectureView,
                            lectureTOC_list: lectureTOC,
                            lectureInfo: lectureInfo,
                            review_list: review,
                            instructor_info: instructor,
                          };

                          res.json(resResult);
                          console.log(resResult);
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

//리뷰 작성
router.post("/writeReview1", (req, res) => {
  const userNo = req.query.userNo;
  const lectureNo = req.query.lectureNo;
  const review = req.body.REVIEW;
  const star = req.body.STAR;

  db.query(
    `INSERT INTO REVIEW (REVIEW, LECTURE_NO, USER_NO, STAR)
      VALUES (?, ?, ?, ?);`,
    [review, lectureNo, userNo, star],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "서버 오류" });
        return;
      }

      if (result.affectedRows === 1) {
        console.log("리뷰 작성 성공");
        res.sendStatus(200);
      } else {
        console.error("리뷰 작성 실패");
        res.status(500).json({ error: "리뷰 작성 실패" });
      }
    }
  );
});

//리뷰 수정
router.post("/modifyReview", (req, res) => {
  const userNo = req.query.userNo;
  const reviewNo = req.query.reviewNo;
  const lectureNo = req.query.lectureNo;
  const review = req.body.REVIEW;
  const star = req.body.STAR;

  db.query(
    `UPDATE REVIEW 
    SET REVIEW = ?, STAR = ?
    WHERE USER_NO = ? AND REVIEW_NO = ? AND LECTURE_NO = ?`,
    [review, star, userNo, reviewNo, lectureNo],
    function (err, rows) {
      if (err) throw err;
      console.log(rows);
    }
  );
  res.sendStatus(200);
});

//리뷰 삭제
router.post("/deleteReview", (req, res) => {
  const userNo = req.query.userNo;
  const reviewNo = req.query.reviewNo;
  const lectureNo = req.query.lectureNo;

  db.query(
    `DELETE FROM REVIEW
    WHERE USER_NO = ? AND REVIEW_NO = ? AND LECTURE_NO = ?`,
    [userNo, reviewNo, lectureNo],
    function (err, rows) {
      if (err) throw err;
      console.log(rows);
    }
  );
  res.sendStatus(200);
});

//강의 화면
router.get("/watch", (req, res) => {
  const lectureNo = req.query.lectureNo;
  db.query(
    `SELECT TOC.TITLE, TOC.DESCRIPTION, INFO.VIDEOURL, INFO.DESCRIPTION AS INFO_DESCRIPTION, L.TITLE AS LECTURE_TITLE
    FROM LectureTOC TOC
    JOIN LectureInfo INFO ON TOC.LECTURE_NO = INFO.LECTURE_NO
    JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
    WHERE TOC.LECTURETOC_NO = ?;`,
    [lectureNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "서버 오류" });
        return;
      }

      if (rows.length === 0) {
        res.status(404).json({ error: "강의를 찾을 수 없음" });
        return;
      }
      var lecture_watching_TOC = rows.map((row) => ({
        TOC_title: row.TITLE,
        TOC_description: row.DESCRIPTION,
      }));
      var lecture_watching_info = rows.map((row) => ({
        INFO_description: row.INFO_DESCRIPTION,
        videoUrl: row.VIDEOURL,
      }));
      var title = rows.map((row) => ({
        LECTURE_title: row.LECTURE_TITLE,
      }));

      var resResult = {
        lecture_watching_TOC: lecture_watching_TOC,
        lecture_watching_info: lecture_watching_info,
        title: title,
      };
      res.json(resResult);
      console.log(resResult);
    }
  );
});

//Q&A 리스트
router.get("/QNAList", (req, res) => {
  const lectureNo = req.query.lectureNo;
  db.query(
    `SELECT Q.TITLE, U.NAME, L.TITLE AS "LECTURE_TITLE"
    FROM QUESTION Q
    JOIN LECTURE L ON Q.LECTURE_NO = L.LECTURE_NO
    JOIN USER U ON U.USER_NO = Q.USER_NO
    WHERE L.LECTURE_NO = ?;`,
    [lectureNo],
    function (err, rows) {
      if (err) throw err;
      var question = rows.map((row) => ({
        questionTitle: row.TITLE,
        userName: row.NAME,
        lecture_title: row.LECTURE_TITLE,
      }));
      res.json(question);
      console.log(question);
    }
  );
});

//Q&A 작성
router.post("/QNAWrite", (req, res) => {
  const lectureNo = req.query.lectureNo;
  const userNo = req.query.userNo;
  const question = req.body.QUESTION;
  const questionFileUrl = req.body.QUESTIONFILEURL;
  const title = req.body.TITLE;

  db.query(
    `INSERT INTO QUESTION (LECTURE_NO, USER_NO, QUESTION, QUESTIONFILEURL, TITLE, INSERTTIME)
      VALUES (?,?,?,?,?,SYSDATE());`,
    [lectureNo, userNo, question, questionFileUrl, title],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

// Q&A 수정
router.post("/modifyQNA", (req, res) => {
  const questionNo = req.query.questionNo;
  const userNo = req.query.userNo;
  const title = req.body.TITLE;
  const question = req.body.QUESTION;
  const questionFileUrl = req.body.QUESTIONFILEURL;

  db.query(
    `UPDATE QUESTION
    SET TITLE = ?, QUESTION = ?, QUESTIONFILEURL = ?
    WHERE USER_NO = ? AND QUESTION_NO = ?;`,
    [title, question, questionFileUrl, userNo, questionNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//Q&A 삭제
router.post("/deleteQNA", (req, res) => {
  const questionNo = req.query.questionNo;
  const userNo = req.query.userNo;

  db.query(
    `DELETE FROM QUESTION
      WHERE USER_NO = ? AND QUESTION_NO = ?`,
    [userNo, questionNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//Q&A 상세보기
router.post("/QNA", (req, res) => {
  const questionNo = req.query.questionNo;
  db.query(
    `SELECT Q.TITLE, Q.QUESTION, Q.QUESTIONFILEURL, Q.INSERTTIME, U.NAME, L.TITLE, R.REPLY, U2.NAME AS REPLY_USER, R.INSERTTIME AS RP_IN 
    FROM QUESTION Q
    JOIN LECTURE L ON Q.LECTURE_NO = L.LECTURE_NO
    JOIN USER U ON U.USER_NO = Q.USER_NO
    JOIN REPLY R ON R.QUESTION_NO = R.QUESTION_NO
    JOIN USER U2 ON U2.USER_NO = R.USER_NO
    WHERE Q.QUESTION_NO = 1;
    `,
    [questionNo],
    function (err, rows) {
      if (err) throw err;
      var question = rows.map((row) => ({
        title_q: row.TITLE,
        question: row.QUESTION,
        questionFileUrl: row.QUESTIONFILEURL,
        inserttime_q: row.INSERTTIME,
        name_q: row.NAME,
        title_l: row.TITLE,
      }));
      var reply = rows.map((row) => ({
        reply: row.REPLY,
        name_r: row.REPLY_USER,
        inserttime_r: row.RP_IN,
      }));

      const resResult = {
        question_info: question,
        reply_list: reply,
      };
      console.log(resResult);
      res.json(resResult);
    }
  );
});

//Q&A 댓글달기
router.post("/QNA/reply", (req, res) => {
  const questionNo = req.query.questionNo;
  const userNo = req.query.userNo;
  const reply = req.body.REPLY;
  db.query(
    `INSERT INTO REPLY (REPLY, USER_NO, QUESTION_NO, INSERTTIME)
      VALUES (?, ?, ?, sysdate());`,
    [reply, userNo, questionNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

// Q&A 댓글 수정
router.post("/QNA/modifyReply", (req, res) => {
  const replyNo = req.query.replyNo;
  const userNo = req.query.userNo;
  const reply = req.body.REPLY;

  db.query(
    `UPDATE REPLY
      SET REPLY = ?
      WHERE USER_NO = ? AND REPLY_NO = ?;`,
    [reply, userNo, replyNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//Q&A 삭제
router.post("/QNA/deleteReply", (req, res) => {
  const replyNo = req.query.replyNo;
  const userNo = req.query.userNo;
  const reply = req.body.REPLY;

  db.query(
    `DELETE FROM REPLY
        WHERE USER_NO = ? AND REPLY_NO = ?`,
    [userNo, replyNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//수강신청
router.post("/add_study", (req, res) => {
  const lectureNo = req.query.lectureNo;
  const userNo = req.query.userNo;

  db.query(
    `INSERT INTO STUDY (LECTURE_NO, USER_NO, STARTTIME)
      VALUES (?, ?, SYSDATE());`,
    [lectureNo, userNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//카트에 넣기
router.post("/add_cart", (req, res) => {
  const lectureNo = req.query.lectureNo;
  const userNo = req.query.userNo;

  db.query(
    `INSERT INTO CART (LECTURE_NO, USER_NO)
    VALUES (?, ?);`,
    [lectureNo, userNo],
    function (err, rows) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

module.exports = router;
