const db = require("../DB/db");
const router = require("express").Router();

//  /lecture

// 강의 상세보기 (수강중X)
router.get("/", async (req, res) => {
  const lectureNo = req.query.lectureNo;

  // 조회수 증가
  db.query(
    `UPDATE LECTURE
      SET VIEW_CNT = VIEW_CNT+1
      WHERE LECTURE_NO = ?;`,
    [lectureNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      // 강의 정보 조회
      db.query(
        `SELECT TITLE, PERIOD, IMAGEURL, PRICE, STAR, DESCRIPTION 
          FROM LECTURE 
          WHERE LECTURE_NO = ?`,
        [lectureNo],
        function (err, rows) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          var lectureView = rows.map((row) => ({
            title: row.TITLE,
            period: row.PERIOD,
            imageUrl: row.IMAGEURL,
            price: row.PRICE,
            star: row.STAR,
            description: row.DESCRIPTION,
          }));
          // TOC 조회
          db.query(
            `SELECT TOC.TITLE, TOC.DESCRIPTION , TOC.LECTURETOC_NO
              FROM LectureTOC TOC 
              JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
              WHERE L.LECTURE_NO = ?`,
            [lectureNo],
            function (err, rows) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }

              var lectureTOC = rows.map((row) => ({
                toc_title: row.TITLE,
                toc_description: row.DESCRIPTION,
                tocNo: row.LECTURETOC_NO,
              }));
              // LectureInfo 조회
              db.query(
                `SELECT INFO.VIDEOURL, INFO.DESCRIPTION 
                  FROM LectureInfo INFO 
                  JOIN LECTURE L ON L.LECTURE_NO =INFO.LECTURE_NO 
                  WHERE L.LECTURE_NO = ?;`,
                [lectureNo],
                function (err, rows) {
                  if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  var lectureInfo = rows.map((row) => ({
                    info_videoUrl: row.VIDEOURL,
                    info_description: row.DESCRIPTION,
                  }));
                  // 리뷰 조회
                  db.query(
                    `SELECT R.REVIEW, R.STAR, U.NAME, R.REVIEW_NO
                      FROM REVIEW R 
                      JOIN LECTURE L ON L.LECTURE_NO =R.LECTURE_NO 
                      JOIN USER U ON U.USER_NO = R.USER_NO 
                      WHERE L.LECTURE_NO = ?;`,
                    [lectureNo],
                    function (err, rows) {
                      if (err) {
                        console.error(err);
                        res
                          .status(500)
                          .json({ error: "Internal Server Error" });
                        return;
                      }
                      var review = rows.map((row) => ({
                        review: row.REVIEW,
                        star: row.STAR,
                        name: row.NAME,
                        reviewNo: row.REVIEW_NO,
                      }));
                      // 강사 정보 조회
                      db.query(
                        `SELECT I.NAME, I.EMAIL, I.CAREER 
                          FROM INSTRUCTOR I
                          JOIN LECTURE L ON L.INSTRUCTOR_NO = I.INSTRUCTOR_NO 
                          WHERE L.LECTURE_NO = ?;`,
                        [lectureNo],
                        function (err, rows) {
                          if (err) {
                            console.error(err);
                            res
                              .status(500)
                              .json({ error: "Internal Server Error" });
                            return;
                          }
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

router.get("/userCheck", (req, res) => {
  const userNo = req.query.userNo;
  const lectureNo = req.query.lectureNo;

  db.query(
    `SELECT S.STUDY_NO, S.STARTTIME, S.STUDYRATE  FROM STUDY S  JOIN LECTURE L ON L.LECTURE_NO = S.LECTURE_NO JOIN USER U ON U.USER_NO = S.USER_NO WHERE U.USER_NO = ? AND L.LECTURE_NO = ?;`,
    [userNo, lectureNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      var userStudy = rows.map((row) => ({
        starttime: row.STARTTIME,
        studyrate: row.STUDYRATE,
      }));

      if (rows.length === 0) {
        res
          .status(200)
          .json({ status: "no", message: "수강 중이 아닌 회원입니다" });
      } else {
        res
          .status(200)
          .json({ status: "yes", message: "수강 중인 회원입니다", userStudy });
      }
    }
  );
});

router.get("/userCheck2", (req, res) => {
  const userNo = req.query.userNo;
  const lectureNo = req.query.lectureNo;

  db.query(
    `SELECT R.REVIEW_NO 
    FROM REVIEW R
    JOIN LECTURE L ON L.LECTURE_NO = R.LECTURE_NO
    JOIN USER U ON U.USER_NO = R.USER_NO
    WHERE U.USER_NO = ? AND L.LECTURE_NO = ?;
    `,
    [userNo, lectureNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (rows.length !== 0) {
        res
          .status(200)
          .json({ status: "no", message: "리뷰를 이미 작성한 회원입니다" });
      } else {
        res
          .status(200)
          .json({ status: "yes", message: "리뷰를 작성하지 않은 회원입니다" });
      }
    }
  );
});

// 리뷰 작성
router.post("/writeReview", (req, res) => {
  try {
    const userNo = req.body.userNo;
    const lectureNo = req.body.lectureNo;
    const review = req.body.REVIEW;
    const star = req.body.STAR;

    db.query(
      `INSERT INTO REVIEW (REVIEW, LECTURE_NO, USER_NO, STAR)
        VALUES (?, ?, ?, ?);`,
      [review, lectureNo, userNo, star],
      function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        } else {
          console.log("리뷰 작성 성공");
          res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 리뷰 수정
router.post("/modifyReview", (req, res) => {
  try {
    const userNo = req.body.userNo;
    const reviewNo = req.body.reviewNo;
    const lectureNo = req.body.lectureNo;
    const review = req.body.REVIEW;
    const star = req.body.STAR;

    db.query(
      `UPDATE REVIEW 
      SET REVIEW = ?, STAR = ?
      WHERE USER_NO = ? AND REVIEW_NO = ? AND LECTURE_NO = ?`,
      [review, star, userNo, reviewNo, lectureNo],
      function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        } else {
          console.log("리뷰 수정 성공");
          res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 리뷰 삭제
router.post("/deleteReview", (req, res) => {
  const userNo = req.body.userNo;
  const reviewNo = req.body.reviewNo;
  const lectureNo = req.body.lectureNo;

  db.query(
    `DELETE FROM REVIEW
      WHERE USER_NO = ? AND REVIEW_NO = ? AND LECTURE_NO = ?`,
    [userNo, reviewNo, lectureNo]
  );

  res.sendStatus(200);
});

// 강의 화면
router.post("/watch", (req, res) => {
  const lectureNo = req.body.lectureNo;

  db.query(
    `SELECT TOC.TITLE , TOC.DESCRIPTION, TOC.LECTURETOC_NO
      FROM LectureTOC TOC
      JOIN LECTURE L ON TOC.LECTURE_NO = L.LECTURE_NO 
      WHERE L.LECTURE_NO = ?;`,
    [lectureNo],
    function (err, rows) {
      if (err) {
        throw err;
      }
      const lecture_watching_TOC = rows.map((row) => ({
        TOC_title: row.TITLE,
        TOC_description: row.DESCRIPTION,
        TOC_no: row.LECTURETOC_NO,
      }));
      db.query(
        `SELECT INFO.LECTURETOC_NO, INFO.DESCRIPTION , INFO.VIDEOURL , INFO.VIDEOTYPE
          FROM LectureInfo INFO
          WHERE INFO.LECTURE_NO = ?;`,
        [lectureNo],
        function (err, rows) {
          if (err) {
            throw err;
          }
          const lecture_watching_info = rows.map((row) => ({
            INFO_description: row.DESCRIPTION,
            videoUrl: row.VIDEOURL,
            INFO_lectureTOC_NO: row.LECTURETOC_NO,
            videoType: row.VIDEOTYPE,
          }));
          const resResult = {
            lecture_watching_TOC: lecture_watching_TOC,
            lecture_watching_info: lecture_watching_info,
          };

          res.status(200).json(resResult);
        }
      );
    }
  );
});

//Q&A 리스트
router.get("/QNAList", (req, res) => {
  const lectureNo = req.query.LectureNo;
  db.query(
    `SELECT Q.TITLE, U.NAME, L.TITLE AS "LECTURE_TITLE", Q.INSERTTIME, Q.QUESTION_NO
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
        inserttime: row.INSERTTIME,
        questionNo: row.QUESTION_NO,
      }));
      res.json(question);
    }
  );
});

// Q&A 작성
router.post("/writeQNA", async (req, res) => {
  try {
    const lectureNo = req.body.lectureNo;
    const userNo = req.body.userNo;
    const question = req.body.QUESTION;
    const questionFileUrl = req.body.QUESTIONFILEURL;
    const title = req.body.TITLE;

    await db.query(
      `INSERT INTO QUESTION (LECTURE_NO, USER_NO, QUESTION, QUESTIONFILEURL, TITLE, INSERTTIME)
      VALUES (?, ?, ?, ?, ?, SYSDATE());`,
      [lectureNo, userNo, question, questionFileUrl, title]
    );

    res.status(200).json({ lectureNo1: lectureNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Q&A 수정
router.post("/modifyQNA", async (req, res) => {
  try {
    const questionNo = req.query.questionNo;
    const userNo = req.query.userNo;
    const title = req.body.TITLE;
    const question = req.body.QUESTION;
    const questionFileUrl = req.body.QUESTIONFILEURL;

    await db.query(
      `UPDATE QUESTION
      SET TITLE = ?, QUESTION = ?, QUESTIONFILEURL = ?
      WHERE USER_NO = ? AND QUESTION_NO = ?;`,
      [title, question, questionFileUrl, userNo, questionNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Q&A 삭제
router.post("/deleteQNA", async (req, res) => {
  try {
    const questionNo = req.query.questionNo;
    const userNo = req.query.userNo;

    await db.query(
      `DELETE FROM QUESTION
      WHERE USER_NO = ? AND QUESTION_NO = ?`,
      [userNo, questionNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Q&A 상세보기
router.post("/QNA", (req, res) => {
  const questionNo = req.query.questionNo;

  db.query(
    `     
    SELECT Q.QUESTION, Q.QUESTIONFILEURL
          FROM QUESTION Q
          WHERE Q.QUESTION_NO = ?;`,
    [questionNo],
    (err, rows) => {
      if (err) {
        throw err;
      }
      const question = rows.map((row) => ({
        question: row.QUESTION,
        questionFileUrl: row.QUESTIONFILEURL,
      }));
      db.query(
        `SELECT R.REPLY, U.NAME, R.INSERTTIME, R.REPLY_NO
        FROM QUESTION Q
        JOIN REPLY R ON R.QUESTION_NO = Q.QUESTION_NO
        JOIN USER U ON U.USER_NO = R.USER_NO
        WHERE Q.QUESTION_NO = ?;`,
        [questionNo],
        (err, rows) => {
          if (err) {
            throw err;
          }
          const replylist = rows.map((row) => ({
            reply: row.REPLY,
            name_r: row.NAME,
            inserttime_r: row.INSERTTIME,
            replyNo: row.REPLY_NO,
          }));

          const resResult = {
            question_info: question,
            reply_list: replylist,
          };
          res.json(resResult);
        }
      );
    }
  );
});

// Q&A 댓글달기
router.post("/QNA/reply", (req, res) => {
  const questionNo = req.body.questionNo;
  const userNo = req.body.userNo;
  const reply = req.body.REPLY;

  db.query(
    `INSERT INTO REPLY (REPLY, USER_NO, QUESTION_NO, INSERTTIME)
      VALUES (?, ?, ?, sysdate());`,
    [reply, userNo, questionNo]
  );

  res.sendStatus(200);
});

// Q&A 댓글 수정
router.post("/QNA/modifyReply", (req, res) => {
  try {
    const replyNo = req.body.replyNo;
    const userNo = req.body.userNo;
    const reply = req.body.REPLY;

    db.query(
      `UPDATE REPLY
      SET REPLY = ?
      WHERE USER_NO = ? AND REPLY_NO = ?;`,
      [reply, userNo, replyNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Q&A 댓글 삭제
router.post("/QNA/deleteReply", async (req, res) => {
  try {
    const replyNo = req.body.replyNo;
    const userNo = req.body.userNo;

    await db.query(
      `DELETE FROM REPLY
      WHERE USER_NO = ? AND REPLY_NO = ?`,
      [userNo, replyNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/insertPayment", (req, res) => {
  const lectureNo = req.body.lectureNo;
  const userNo = req.body.userNo;

  db.query(
    `INSERT INTO PAYMENT (USER_NO, LECTURE_NO, PAYMENTTIME)
      VALUES (?, ?, SYSDATE());`,
    [userNo, lectureNo],
    (err, rows) => {
      if (err) {
        throw err;
      }
      db.query(
        `INSERT INTO STUDY (LECTURE_NO, USER_NO, STARTTIME)
      VALUES (?, ?, SYSDATE());`,
        [lectureNo, userNo],
        (err, rows) => {
          if (err) {
            throw err;
          }
          db.query(
            `DELETE FROM CART
            WHERE USER_NO = ? && LECTURE_NO = ?;`,
            [userNo, lectureNo],
            (err, rows) => {
              if (err) {
                throw err;
              }
              res.sendStatus(200);
            }
          );
        }
      );
    }
  );
});

// 수강신청
router.post("/add_study", (req, res) => {
  try {
    const lectureNo = req.query.lectureNo;
    const userNo = req.query.userNo;

    db.query(
      `INSERT INTO STUDY (LECTURE_NO, USER_NO, STARTTIME)
      VALUES (?, ?, SYSDATE());`,
      [lectureNo, userNo],
      (err, rows) => {
        if (err) {
          throw err;
        }

        db.query(
          `INSERT INTO STUDY (LECTURE_NO, USER_NO, STARTTIME)
        VALUES (?, ?, SYSDATE());`,
          [lectureNo, userNo],
          (err, rows) => {
            if (err) {
              throw err;
            }
            res.sendStatus(200);
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 카트에 넣기
router.post("/add_cart", (req, res) => {
  try {
    const lectureNo = req.body.lectureNo;
    const userNo = req.body.userNo;

    db.query(
      `SELECT CART_NO 
      FROM CART 
      WHERE LECTURE_NO = ? && USER_NO = ?;`,
      [lectureNo, userNo],
      (err, rows) => {
        if (err) {
          throw err;
        }
        if (rows.length > 0) {
          res.status(200).json({
            status: "no",
            message: "해당 강의가 이미 회원님의 장바구니에 담겨 있습니다",
          });
        } else {
          db.query(
            `INSERT INTO CART (LECTURE_NO, USER_NO)
            VALUES (?, ?);`,
            [lectureNo, userNo]
          );
          res.status(200).json({
            status: "yes",
            message: "해당 과목이 장바구니에 담겼습니다.",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/test3", async (req, res) => {
  const title = req.query.title;
  db.query(
    `UPDATE LECTURE
      SET VIEW_CNT = VIEW_CNT+1
      WHERE TITLE = ?;`,
    [title],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      // 강의 정보 조회
      db.query(
        `SELECT TITLE, PERIOD, IMAGEURL, PRICE, STAR, DESCRIPTION, LECTURE_NO
          FROM LECTURE 
          WHERE TITLE = ?`,
        [title],
        function (err, rows) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          var lectureView = rows.map((row) => ({
            title: row.TITLE,
            period: row.PERIOD,
            imageUrl: row.IMAGEURL,
            price: row.PRICE,
            star: row.STAR,
            description: row.DESCRIPTION,
            lectureNo: row.LECTURE_NO,
          }));
          // TOC 조회
          db.query(
            `SELECT TOC.TITLE, TOC.DESCRIPTION 
              FROM LectureTOC TOC 
              JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
              WHERE L.TITLE = ?`,
            [title],
            function (err, rows) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }

              var lectureTOC = rows.map((row) => ({
                toc_title: row.TITLE,
                toc_description: row.DESCRIPTION,
              }));
              // LectureInfo 조회
              db.query(
                `SELECT INFO.VIDEOURL, INFO.DESCRIPTION 
                  FROM LectureInfo INFO 
                  JOIN LECTURE L ON L.LECTURE_NO =INFO.LECTURE_NO 
                  WHERE L.TITLE = ?;`,
                [title],
                function (err, rows) {
                  if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  var lectureInfo = rows.map((row) => ({
                    info_videoUrl: row.VIDEOURL,
                    info_description: row.DESCRIPTION,
                  }));
                  // 리뷰 조회
                  db.query(
                    `SELECT R.REVIEW, R.STAR, U.NAME, R.REVIEW_NO
                      FROM REVIEW R 
                      JOIN LECTURE L ON L.LECTURE_NO =R.LECTURE_NO 
                      JOIN USER U ON U.USER_NO = R.USER_NO 
                      WHERE L.TITLE = ?;`,
                    [title],
                    function (err, rows) {
                      if (err) {
                        console.error(err);
                        res
                          .status(500)
                          .json({ error: "Internal Server Error" });
                        return;
                      }
                      var review = rows.map((row) => ({
                        review: row.REVIEW,
                        star: row.STAR,
                        name: row.NAME,
                        reviewNo: row.REVIEW_NO,
                      }));
                      // 강사 정보 조회
                      db.query(
                        `SELECT I.NAME, I.EMAIL, I.CAREER 
                          FROM INSTRUCTOR I
                          JOIN LECTURE L ON L.INSTRUCTOR_NO = I.INSTRUCTOR_NO 
                          WHERE L.TITLE = ?;`,
                        [title],
                        function (err, rows) {
                          if (err) {
                            console.error(err);
                            res
                              .status(500)
                              .json({ error: "Internal Server Error" });
                            return;
                          }
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

module.exports = router;
