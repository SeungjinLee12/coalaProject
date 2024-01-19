const db = require("../DB/db");
const router = require("express").Router();

// 강의 상세보기 (수강중X)
router.get("/", async (req, res) => {
  try {
    const lectureNo = req.query.lectureNo;

    // 조회수 증가
    await db.query(
      `UPDATE LECTURE
      SET VIEW_CNT = VIEW_CNT+1
      WHERE LECTURE_NO = ?;`,
      [lectureNo]
    );

    // 강의 정보 조회
    const [lectureView] = await db.query(
      `SELECT TITLE, PERIOD, IMAGEURL, PRICE, STAR, DESCRIPTION 
      FROM LECTURE 
      WHERE LECTURE_NO = ?`,
      [lectureNo]
    );

    // TOC 조회
    const lectureTOC = await db.query(
      `SELECT TOC.TITLE, TOC.DESCRIPTION 
      FROM LectureTOC TOC 
      JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
      WHERE L.LECTURE_NO = ?`,
      [lectureNo]
    );

    // LectureInfo 조회
    const lectureInfo = await db.query(
      `SELECT INFO.VIDEOURL, INFO.DESCRIPTION 
      FROM LectureInfo INFO 
      JOIN LECTURE L ON L.LECTURE_NO =INFO.LECTURE_NO 
      WHERE L.LECTURE_NO = ?;`,
      [lectureNo]
    );

    // 리뷰 조회
    const review = await db.query(
      `SELECT R.REVIEW, R.STAR, U.NAME 
      FROM REVIEW R 
      JOIN LECTURE L ON L.LECTURE_NO =R.LECTURE_NO 
      JOIN USER U ON U.USER_NO = R.USER_NO 
      WHERE L.LECTURE_NO = ?;`,
      [lectureNo]
    );

    // 강사 정보 조회
    const instructor = await db.query(
      `SELECT I.NAME, I.EMAIL, I.CAREER 
      FROM INSTRUCTOR I
      JOIN LECTURE L ON L.INSTRUCTOR_NO = I.INSTRUCTOR_NO 
      WHERE L.LECTURE_NO = ?;`,
      [lectureNo]
    );

    const resResult = {
      lectureView: lectureView,
      lectureTOC_list: lectureTOC,
      lectureInfo: lectureInfo,
      review_list: review,
      instructor_info: instructor,
    };

    res.json(resResult);
    console.log(resResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 리뷰 작성
router.post("/writeReview", async (req, res) => {
  try {
    const userNo = req.query.userNo;
    const lectureNo = req.query.lectureNo;
    const review = req.body.REVIEW;
    const star = req.body.STAR;

    const result = await db.query(
      `INSERT INTO REVIEW (REVIEW, LECTURE_NO, USER_NO, STAR)
        VALUES (?, ?, ?, ?);`,
      [review, lectureNo, userNo, star]
    );

    if (result.affectedRows === 1) {
      console.log("리뷰 작성 성공");
      res.sendStatus(200);
    } else {
      console.error("리뷰 작성 실패");
      res.status(500).json({ error: "리뷰 작성 실패" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 리뷰 수정
router.post("/modifyReview", async (req, res) => {
  try {
    const userNo = req.query.userNo;
    const reviewNo = req.query.reviewNo;
    const lectureNo = req.query.lectureNo;
    const review = req.body.REVIEW;
    const star = req.body.STAR;

    await db.query(
      `UPDATE REVIEW 
      SET REVIEW = ?, STAR = ?
      WHERE USER_NO = ? AND REVIEW_NO = ? AND LECTURE_NO = ?`,
      [review, star, userNo, reviewNo, lectureNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 리뷰 삭제
router.post("/deleteReview", async (req, res) => {
  try {
    const userNo = req.query.userNo;
    const reviewNo = req.query.reviewNo;
    const lectureNo = req.query.lectureNo;

    await db.query(
      `DELETE FROM REVIEW
      WHERE USER_NO = ? AND REVIEW_NO = ? AND LECTURE_NO = ?`,
      [userNo, reviewNo, lectureNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 강의 화면
router.get("/watch", async (req, res) => {
  try {
    const lectureNo = req.query.lectureNo;

    const [lecture] = await db.query(
      `SELECT TOC.TITLE, TOC.DESCRIPTION, INFO.VIDEOURL, INFO.DESCRIPTION AS INFO_DESCRIPTION, L.TITLE AS LECTURE_TITLE
      FROM LectureTOC TOC
      JOIN LectureInfo INFO ON TOC.LECTURE_NO = INFO.LECTURE_NO
      JOIN LECTURE L ON L.LECTURE_NO = TOC.LECTURE_NO
      WHERE TOC.LECTURETOC_NO = ?;`,
      [lectureNo]
    );

    if (lecture.length === 0) {
      res.status(404).json({ error: "강의를 찾을 수 없음" });
      return;
    }

    const lecture_watching_TOC = lecture.map((row) => ({
      TOC_title: row.TITLE,
      TOC_description: row.DESCRIPTION,
    }));
    const lecture_watching_info = lecture.map((row) => ({
      INFO_description: row.INFO_DESCRIPTION,
      videoUrl: row.VIDEOURL,
    }));
    const title = lecture.map((row) => ({
      LECTURE_title: row.LECTURE_TITLE,
    }));

    const resResult = {
      lecture_watching_TOC: lecture_watching_TOC,
      lecture_watching_info: lecture_watching_info,
      title: title,
    };

    res.json(resResult);
    console.log(resResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

// Q&A 작성
router.post("/writeQNA", async (req, res) => {
  try {
    const lectureNo = req.query.lectureNo;
    const userNo = req.query.userNo;
    const question = req.body.QUESTION;
    const questionFileUrl = req.body.QUESTIONFILEURL;
    const title = req.body.TITLE;

    await db.query(
      `INSERT INTO QUESTION (LECTURE_NO, USER_NO, QUESTION, QUESTIONFILEURL, TITLE, INSERTTIME)
      VALUES (?, ?, ?, ?, ?, SYSDATE());`,
      [lectureNo, userNo, question, questionFileUrl, title]
    );

    res.sendStatus(200);
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
router.post("/QNA", async (req, res) => {
  try {
    const questionNo = req.query.questionNo;

    const [rows] = await db.query(
      `SELECT Q.TITLE, Q.QUESTION, Q.QUESTIONFILEURL, Q.INSERTTIME, U.NAME, L.TITLE, R.REPLY, U2.NAME AS REPLY_USER, R.INSERTTIME AS RP_IN 
      FROM QUESTION Q
      JOIN LECTURE L ON Q.LECTURE_NO = L.LECTURE_NO
      JOIN USER U ON U.USER_NO = Q.USER_NO
      JOIN REPLY R ON R.QUESTION_NO = Q.QUESTION_NO
      JOIN USER U2 ON U2.USER_NO = R.USER_NO
      WHERE Q.QUESTION_NO = ?;`,
      [questionNo]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "질문을 찾을 수 없음" });
      return;
    }

    const question = rows.map((row) => ({
      title_q: row.TITLE,
      question: row.QUESTION,
      questionFileUrl: row.QUESTIONFILEURL,
      inserttime_q: row.INSERTTIME,
      name_q: row.NAME,
      title_l: row.TITLE,
    }));
    const reply = rows.map((row) => ({
      reply: row.REPLY,
      name_r: row.REPLY_USER,
      inserttime_r: row.RP_IN,
    }));

    const resResult = {
      question_info: question,
      reply_list: reply,
    };

    res.json(resResult);
    console.log(resResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Q&A 댓글달기
router.post("/QNA/reply", async (req, res) => {
  try {
    const questionNo = req.query.questionNo;
    const userNo = req.query.userNo;
    const reply = req.body.REPLY;

    await db.query(
      `INSERT INTO REPLY (REPLY, USER_NO, QUESTION_NO, INSERTTIME)
      VALUES (?, ?, ?, sysdate());`,
      [reply, userNo, questionNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Q&A 댓글 수정
router.post("/QNA/modifyReply", async (req, res) => {
  try {
    const replyNo = req.query.replyNo;
    const userNo = req.query.userNo;
    const reply = req.body.REPLY;

    await db.query(
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
    const replyNo = req.query.replyNo;
    const userNo = req.query.userNo;

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

// 수강신청
router.post("/add_study", async (req, res) => {
  try {
    const lectureNo = req.query.lectureNo;
    const userNo = req.query.userNo;

    await db.query(
      `INSERT INTO STUDY (LECTURE_NO, USER_NO, STARTTIME)
      VALUES (?, ?, SYSDATE());`,
      [lectureNo, userNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 카트에 넣기
router.post("/add_cart", async (req, res) => {
  try {
    const lectureNo = req.query.lectureNo;
    const userNo = req.query.userNo;

    await db.query(
      `INSERT INTO CART (LECTURE_NO, USER_NO)
      VALUES (?, ?);`,
      [lectureNo, userNo]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
