const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();

// /api

// 메인페이지(로그인x)
router.get("/", (req, res) => {
  try {
    db.query(
      "SELECT LECTURE_NO, STAR, IMAGEURL, TITLE , PRICE FROM LECTURE ORDER BY VIEW_CNT DESC, TITLE ASC;",
      function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (rows.length === 0) {
          // 데이터가 없을 경우
          res.status(404).json({ message: "No data found" });
          return;
        }

        var Lectures = rows.map((row) => ({
          title: row.TITLE,
          imageSrc: row.IMAGEURL,
          star: row.STAR,
          price: row.PRICE,
          lectureNo: row.LECTURE_NO,
        }));

        db.query(
          "SELECT CATEGORY_NO, CATEGORY_NAME, PARENT_CATEGORY FROM CATEGORY ORDER BY CATEGORY_NAME ASC;",
          function (err, rows) {
            if (err) {
              console.error(err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }

            if (rows.length === 0) {
              // 데이터가 없을 경우
              res.status(404).json({ message: "No data found" });
              return;
            }

            var category = rows.map((row) => ({
              category_no: row.CATEGORY_NO,
              category_name: row.CATEGORY_NAME,
              parent_category: row.PARENT_CATEGORY,
            }));

            const resResult = {
              mainpage_lecture_list: Lectures,
              category_list: category,
            };

            res.json(resResult);
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 메인페이지(로그인o)
router.post("/1", (req, res) => {
  const userNo = req.body.userNo;
  db.query(
    `
    WITH table2 as (
                WITH table1 AS (
                    SELECT DISTINCT C.CATEGORY_NAME, C.CATEGORY_NO AS table1_category_no
                    FROM CATEGORY C
                    WHERE C.CATEGORY_NO IN (
                        SELECT INTEREST1 FROM USER WHERE USER_NO = ${userNo}
                    )
                )
                SELECT t1.CATEGORY_NAME, t1.table1_category_no
                FROM table1 t1
            )
            SELECT l.LECTURE_NO, CATEGORY_NAME, l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
            FROM LECTURECATEGORY lc
            JOIN table2 t2 ON lc.CATEGORY_NO = t2.table1_category_no
            JOIN LECTURE l ON lc.LECTURE_NO = l.LECTURE_NO;
    `,
    [userNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      var userInterest1 = rows.map((row) => ({
        interest1_category_name: row.CATEGORY_NAME,
        interest1_title: row.TITLE,
        interest1_price: row.PRICE,
        interest1_star: row.STAR,
        interest1_imageUrl: row.IMAGEURL,
        interest1_view_cnt: row.view_cnt,
        interest1_lectureNo: row.LECTURE_NO,
      }));
      db.query(
        `WITH table2 as (
            WITH table1 AS (
                SELECT DISTINCT C.CATEGORY_NAME, C.CATEGORY_NO AS table1_category_no
                FROM CATEGORY C
                WHERE C.CATEGORY_NO IN (
                    SELECT INTEREST2 FROM USER WHERE USER_NO = ${userNo}
                )
            )
            SELECT t1.CATEGORY_NAME, t1.table1_category_no
            FROM table1 t1
        )
        SELECT l.LECTURE_NO, CATEGORY_NAME, l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
        FROM LECTURECATEGORY lc
        JOIN table2 t2 ON lc.CATEGORY_NO = t2.table1_category_no
        JOIN LECTURE l ON lc.LECTURE_NO = l.LECTURE_NO;`,
        [userNo],
        function (err, rows) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          var userInterest2 = rows.map((row) => ({
            interest2_category_name: row.CATEGORY_NAME,
            interest2_title: row.TITLE,
            interest2_price: row.PRICE,
            interest2_star: row.STAR,
            interest2_imageUrl: row.IMAGEURL,
            interest2_view_cnt: row.view_cnt,
            interest2_lectureNo: row.LECTURE_NO,
          }));

          db.query(
            `WITH table2 as (
                WITH table1 AS (
                    SELECT DISTINCT C.CATEGORY_NAME, C.CATEGORY_NO AS table1_category_no
                    FROM CATEGORY C
                    WHERE C.CATEGORY_NO IN (
                        SELECT INTEREST3 FROM USER WHERE USER_NO = ${userNo}
                    )
                )
                SELECT t1.CATEGORY_NAME, t1.table1_category_no
                FROM table1 t1
            )
            SELECT l.LECTURE_NO, CATEGORY_NAME, l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
            FROM LECTURECATEGORY lc
            JOIN table2 t2 ON lc.CATEGORY_NO = t2.table1_category_no
            JOIN LECTURE l ON lc.LECTURE_NO = l.LECTURE_NO;`,
            [userNo],
            function (err, rows) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }

              var userInterest3 = rows.map((row) => ({
                interest3_category_name: row.CATEGORY_NAME,
                interest3_title: row.TITLE,
                interest3_price: row.PRICE,
                interest3_star: row.STAR,
                interest3_imageUrl: row.IMAGEURL,
                interest3_view_cnt: row.view_cnt,
                interest3_lectureNo: row.LECTURE_NO,
              }));

              db.query(
                `SELECT L.TITLE, S.STARTTIME, S.STUDYRATE, L.IMAGEURL, L.LECTURE_NO, L.STAR, L.PRICE
            FROM STUDY S
            JOIN LECTURE L ON S.LECTURE_NO = L.LECTURE_NO
            WHERE S.USER_NO = ?;`,
                [userNo],
                function (err, rows) {
                  if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }

                  var userStudy = rows.map((row) => ({
                    study_star: row.STAR,
                    study_title: row.TITLE,
                    study_startTime: row.STARTTIME,
                    study_studyRate: row.STUDYRATE,
                    study_imageUrl: row.IMAGEURL,
                    study_lectureNo: row.LECTURE_NO,
                    study_price: row.PRICE,
                  }));

                  const resResult = {
                    userInterest1List: userInterest1,
                    userInterest2List: userInterest2,
                    userInterest3List: userInterest3,
                    userStudyList: userStudy,
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
});

router.post("/2", (req, res) => {
  const lectureNo = req.body.lectureNo;
  const userNo = req.body.userNo;

  db.query(
    `
    SELECT SUM(Progress) AS PROGRESS FROM USERPROGRESS
    WHERE LECTURE_NO =? AND USER_NO = ?;
  `,
    [lectureNo, userNo],
    function (err, rows) {
      if (err) {
        throw err;
      }
      var userProgress = rows[0].PROGRESS;
      db.query(
        `SELECT LECTURETOTALVIDEOTIME 
      FROM LECTURE
      WHERE LECTURE_NO = ?; `,
        [lectureNo],
        function (err, rows) {
          if (err) {
            throw err;
          }
          var totalTime = rows[0].LECTURETOTALVIDEOTIME;
          var percent = (userProgress / totalTime) * 100;

          res.json(percent);
        }
      );
    }
  );
});

// 단어로 검색
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
      SELECT l.LECTURE_NO, l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
      FROM LECTURE l
      JOIN table2 t2 ON l.LECTURE_NO = t2.LECTURE_NO
      UNION ALL
      SELECT l.LECTURE_NO, l.TITLE, l.PRICE, l.STAR, l.IMAGEURL, l.view_cnt
      FROM LECTURE l
      WHERE LOWER(l.TITLE) LIKE LOWER(?)
   )
   SELECT LECTURE_NO, TITLE, PRICE, STAR, IMAGEURL
   FROM table3
   ORDER BY view_cnt DESC;
       `,
    [`%${word}%`, `%${word}%`, `%${word}%`],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (rows.length === 0) {
        res.status(202).json({ status: "no", message: "No data found" });
        return;
      }

      var research_res = rows.map((row) => ({
        title: row.TITLE,
        price: row.PRICE,
        star: row.STAR,
        imageUrl: row.IMAGEURL,
        lectureNo: row.LECTURE_NO,
      }));
      res.status(202).json({ status: "yes", research_res });
    }
  );
});

// 카테고리 선택 카테고리 아이디로 검색으로 바꾸기
router.get("/category", (req, res) => {
  try {
    const word = req.query.WORD;
    db.query(
      `WITH table1 as(
            SELECT LC.LECTURE_NO AS table1_LECTURE_NO
            FROM CATEGORY C
            JOIN LECTURECATEGORY LC ON C.CATEGORY_NO = LC.CATEGORY_NO
            WHERE LOWER(C.CATEGORY_NAME) LIKE LOWER(?)
            
        )SELECT L.TITLE, L.IMAGEURL, L.STAR, L.PRICE, L.LECTURE_NO
        FROM LECTURE L
        JOIN table1 T ON L.LECTURE_NO = T.table1_LECTURE_NO;
        `,
      [`%${word}%`],
      function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (rows.length === 0) {
          // 데이터가 없을 경우
          res.status(404).json({ message: "No data found" });
          return;
        }

        var research_res = rows.map((row) => ({
          title: row.TITLE,
          price: row.PRICE,
          star: row.STAR,
          imageUrl: row.IMAGEURL,
        }));
        res.json(research_res);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/instructorList", (req, res) => {
  db.query(
    `SELECT NAME, INSTRUCTOR_NO, EMAIL, IMAGE
  FROM INSTRUCTOR;`,
    function (err, rows) {
      if (err) {
        throw err;
      }
      var instructorList = rows.map((row) => ({
        name: row.NAME,
        insNo: row.INSTRUCTOR_NO,
        email: row.EMAIL,
        image: row.IMAGE,
      }));

      res.json(instructorList);
    }
  );
});

router.get("/instructorInfo", (req, res) => {
  const insNo = req.query.insNo;
  console.log(insNo);
  db.query(
    `SELECT ins.NAME, ins.INSTRUCTOR_NO, ins.EMAIL, ins.IMAGE, ins.CAREER, ins.Description, l.LECTURE_NO,l.IMAGEURL ,l.TITLE ,l.STAR ,l.PRICE
    FROM INSTRUCTOR ins
    JOIN LECTURE l ON l.INSTRUCTOR_NO = ins.INSTRUCTOR_NO 
    WHERE ins.INSTRUCTOR_NO = ?`,
    [insNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      var instructorInfo = rows.map((row) => ({
        instructor_name: row.NAME,
        instructor_image: row.IMAGE,
        instructor_description: row.Description,
        instructor_email: row.EMAIL,
        instructor_career: row.CAREER,
        lecNo: row.LECTURE_NO,
        lecIMAGE: row.IMAGEURL,
        lecTitle: row.TITLE,
        lecStar: row.STAR,
        lecPrice: row.PRICE,
      }));

      res.json(instructorInfo);
      console.log(instructorInfo);
    }
  );
});

router.get("/insLec", (req, res) => {
  const insNo = req.query.insNo;
  try {
    db.query(
      "SELECT L.LECTURE_NO, L.STAR, L.IMAGEURL, L.TITLE , L.PRICE FROM LECTURE L JOIN INSTRUCTOR ins ON ins.INSTRUCTOR_NO = L.INSTRUCTOR_NO WHERE ins.INSTRUCTOR_NO = ? ORDER BY VIEW_CNT DESC, TITLE ASC;",
      [insNo],
      function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        var Lectures = rows.map((row) => ({
          title: row.TITLE,
          imageSrc: row.IMAGEURL,
          star: row.STAR,
          price: row.PRICE,
          lectureNo: row.LECTURE_NO,
        }));

        res.json(Lectures);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
