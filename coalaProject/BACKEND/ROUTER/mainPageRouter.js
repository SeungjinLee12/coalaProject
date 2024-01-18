const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();

// /api

// 메인페이지(로그인x)
router.get("/", (req, res) => {
  db.query(
    "SELECT STAR, IMAGEURL, TITLE FROM LECTURE ORDER BY VIEW_CNT DESC, TITLE ASC;",
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      var Lectures = rows.map((row) => ({
        title: row.TITLE,
        imageUrl: row.IMAGEURL,
        star: row.STAR,
      }));

      db.query(
        "SELECT CATEGORY_NAME, PARENT_CATEGORY FROM CATEGORY ORDER BY CATEGORY_NAME ASC;",
        function (err, rows) {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
          }

          var category = rows.map((row) => ({
            category_name: row.CATEGORY_NAME,
            parent_category: row.PARENT_CATEGORY,
          }));

          const resResult = {
            mainpage_lecture_list: Lectures,
            category_list: category,
          };

          console.log(resResult);
          res.json(resResult);
        }
      );
    }
  );
});

// 메인페이지(로그인o)
router.post("/1", (req, res) => {
  const userNo = req.body.userNo;
  db.query(
    `WITH table2 as (
        WITH table1 AS (
          SELECT DISTINCT C.CATEGORY_NAME, C.CATEGORY_NO AS table1_category_no
          FROM CATEGORY C
          WHERE C.CATEGORY_NO IN (
            SELECT INTEREST1 FROM USER WHERE USER_NO = ?
            UNION
            SELECT INTEREST2 FROM USER WHERE USER_NO = ?
            UNION
            SELECT INTEREST3 FROM USER WHERE USER_NO = ?
          )
        )
        SELECT *
        FROM LECTURECATEGORY lc
        JOIN table1 t ON lc.CATEGORY_NO = t.table1_category_no
      )
      SELECT l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
      FROM LECTURE l
      JOIN table2 t2 ON l.LECTURE_NO = t2.LECTURE_NO;`,
    [userNo, userNo, userNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
      var userInterest = rows.map((row) => ({
        interest_title: row.TITLE,
        interest_price: row.PRICE,
        interest_star: row.STAR,
        interest_imageUrl: row.IMAGEURL,
        interest_view_cnt: row.view_cnt,
      }));
      db.query(
        `SELECT L.TITLE, S.STARTTIME, S.STUDYRATE, L.IMAGEURL
          FROM STUDY S
          JOIN LECTURE L ON S.LECTURE_NO = L.LECTURE_NO
          WHERE S.USER_NO = ?;`,
        [userNo],
        function (err, rows) {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          }
          var userStudy = rows.map((row) => ({
            study_title: row.TITLE,
            study_startTime: row.STARTTIME,
            study_studyRate: row.STUDYRATE,
            study_imageUrl: row.IMAGEURL,
          }));

          const resResult = {
            userInterestList: userInterest,
            userStudyList: userStudy,
          };

          console.log(resResult);
          res.json(resResult);
        }
      );
    }
  );
});

//단어로 검색
router.get("/research", (req, res) => {
  const word = req.query.WORD;

  db.query(
    `WITH table3 AS (
        WITH table2 as (
           WITH table1 as (
              SELECT C.CATEGORY_NAME, C.CATEGORY_NO AS TEST_CATEGORY_NO, C.PARENT_CATEGORY
              FROM CATEGORY C
              WHERE LOWER(C.CATEGORY_NAME) LIKE LOWER(?)
              UNION ALL
              SELECT C1.CATEGORY_NAME, C1.CATEGORY_NO AS TEST_CATEGORY_NO, C1.PARENT_CATEGORY
              FROM CATEGORY C1
              JOIN CATEGORY C2 ON C1.PARENT_CATEGORY = C2.CATEGORY_NO
              WHERE LOWER(C2.CATEGORY_NAME) LIKE LOWER(?)
           )
           SELECT *
           FROM LECTURECATEGORY lc
           JOIN table1 t ON lc.CATEGORY_NO = t.TEST_CATEGORY_NO
        )
        SELECT l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
        FROM LECTURE l
        JOIN table2 t2 ON l.LECTURE_NO = t2.LECTURE_NO
        UNION ALL
        SELECT l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
        FROM LECTURE l
        WHERE LOWER(l.TITLE) LIKE LOWER(?)
     )
     SELECT TITLE, PRICE, STAR, IMAGEURL
     FROM table3
     ORDER BY view_cnt DESC;
     `,
    [`%${word}%`, `%${word}%`, `%${word}%`],
    function (err, rows) {
      if (err) {
        throw err;
      }
      var research_res = rows.map((row) => ({
        title: row.TITLE,
        price: row.PRICE,
        star: row.STAR,
        imageUrl: row.IMAGEURL,
      }));
      console.log(research_res);
      res.json(research_res);
    }
  );
});

//카테고리 선택 카테고리 아이디로 검색으로 바꾸기
router.get("/category", (req, res) => {
  const word = req.query.WORD;
  db.query(
    `WITH table1 as(
            SELECT LC.LECTURE_NO AS table1_LECTURE_NO
            FROM CATEGORY C
            JOIN LECTURECATEGORY LC ON C.CATEGORY_NO = LC.CATEGORY_NO
            WHERE LOWER(C.CATEGORY_NAME) LIKE LOWER(?)
            
        )SELECT L.TITLE, L.IMAGEURL, L.STAR, L.PRICE
        FROM LECTURE L
        JOIN table1 T ON L.LECTURE_NO = T.table1_LECTURE_NO;
        `,
    [`%${word}%`],
    function (err, rows) {
      if (err) {
        throw err;
      }
      var research_res = rows.map((row) => ({
        title: row.TITLE,
        price: row.PRICE,
        star: row.STAR,
        imageUrl: row.IMAGEURL,
      }));
      console.log(research_res);
      res.json(research_res);
    }
  );
});

module.exports = router;
