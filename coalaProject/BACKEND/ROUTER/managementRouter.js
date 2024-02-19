const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();
const { query } = require("express");
const multer = require("multer");
const fs = require("fs");

// /management

const insImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/InstructorImage");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const uploadInsImage = multer({ storage: insImgStorage });

router.post("/imageChange", uploadInsImage.single("img"), (req, res) => {
  const name = req.body.inputChangeName;
  const email = req.body.inputChangeEmail;
  const description = req.body.inputChangeDescription;
  const carrer = req.body.inputChangeCarrer;
  const encodedFileName = encodeURIComponent(req.file.originalname);
  const imageFilePath = `http://localhost:4001/InstructorImage/${encodedFileName}`;

  const sql = `INSERT INTO INSTRUCTOR (NAME, EMAIL, CAREER, DESCRIPTION,IMAGE)
    VALUES (?,?,?,?,?);`;
  const values = [name, email, carrer, description, imageFilePath];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send({ mesaage: "ok" });
  });
});

router.get("/zz", (req, res) => {
  db.query(
    `
  SELECT INSTRUCTOR_NO, NAME, IMAGE,EMAIL
FROM INSTRUCTOR;`,
    function (err, rows) {
      if (err) {
        throw err;
      }
      var instructorList = rows.map((row) => ({
        insNo: row.INSTRUCTOR_NO,
        insName: row.NAME,
        insImage: row.IMAGE,
        email: row.EMAIL,
      }));
      res.json(instructorList);
    }
  );
});

const insLecStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const uploadLecImage = multer({ storage: insLecStorage });

router.post("/addLecture", uploadLecImage.single("img"), (req, res) => {
  const title = req.body.lectureTitle;
  const price = req.body.lecturePrice;
  const description = req.body.lectureDescription;
  const insNo = req.body.insNo;
  const encodedFileName = encodeURIComponent(req.file.originalname);
  const imageFilePath = `http://localhost:4001/image/${encodedFileName}`;

  const sql = `INSERT INTO LECTURE (IMAGEURL, Description, INSTRUCTOR_NO, TITLE, price)
  VALUES (?, ?,?, ?, ?);`;
  const values = [imageFilePath, description, insNo, title, price];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    db.query(
      `SELECT LECTURE_NO FROM LECTURE ORDER BY LECTURE_NO DESC LIMIT 1;`,
      function (err, rows) {
        if (err) {
          throw err;
        }
        var lecNo = rows[0].LECTURE_NO;
        res.json(lecNo);
        console.log(lecNo);
      }
    );
  });
});

const TOCLecStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/test");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const uploadTOCVideo = multer({
  storage: TOCLecStorage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.post(
  "/addLectureTOC",
  uploadTOCVideo.array("videoFile"),
  async (req, res) => {
    let lectureTotalVideoTime = 0; // 비디오 총 재생 시간을 저장할 변수
    let setLecNo = 0;

    if (req.files.length === 1) {
      // for (const [index, file] of req.files.entries()) {
      //   const { TOCtitle, TOCdescription, videoDuration, lecNo } = req.body;

      //   const encodedFileName = encodeURIComponent(file.originalname);
      //   const videoFilePath = `http://localhost:4001/test/${encodedFileName}`;

      //   // 각 반복에서의 TOCNo 값을 저장할 변수
      //   let setTOCNo = 0;

      //   setLecNo = lecNo[0];

      //   try {
      //     // LectureTOC 테이블에 데이터 삽입
      //     const insertTOCResult = await new Promise((resolve, reject) => {
      //       db.query(
      //         `INSERT INTO LectureTOC (TITLE, LECTURE_NO, DESCRIPTION,TOTALVIDEOTIME)
      //       VALUES (?,?,?,?);`,
      //         // [
      //         //   TOCtitle[index],
      //         //   lecNo[index],
      //         //   TOCdescription[index],
      //         //   videoDuration[index],
      //         // ],
      //         [TOCtitle, lecNo, TOCdescription, videoDuration],
      //         (err, rows) => {
      //           if (err) reject(err);
      //           resolve(rows);
      //         }
      //       );
      //     });

      //     // 가장 최근에 삽입된 LectureTOC_NO 조회
      //     const selectTOCResult = await new Promise((resolve, reject) => {
      //       db.query(
      //         `SELECT LECTURETOC_NO  FROM LectureTOC ORDER BY LECTURETOC_NO DESC LIMIT 1;`,
      //         (err, rows) => {
      //           if (err) {
      //             reject(err);
      //             resolve(rows);
      //           } else {
      //             resolve(rows);
      //             setTOCNo = rows[0].LECTURETOC_NO;
      //           }
      //         }
      //       );
      //     });

      //     // LectureInfo 테이블에 데이터 삽입
      //     await new Promise((resolve, reject) => {
      //       db.query(
      //         `INSERT INTO LectureInfo (VIDEOURL, DESCRIPTION, LectureTOC_NO, LECTURE_NO)
      //       VALUES (?,?,?,?);`,
      //         // [videoFilePath, TOCdescription[index], setTOCNo, lecNo[index]],
      //         [videoFilePath, TOCdescription, setTOCNo, lecNo],

      //         (err, rows) => {
      //           if (err) reject(err);
      //           resolve(rows);
      //         }
      //       );
      //     });
      //   } catch (error) {
      //     console.error(error);
      //     return res.status(500).send("Internal Server Error");
      //   }
      //   try {
      //     console.log("@@@@@@@@@@@@@", videoDuration, setLecNo);
      //     db.query(
      //       `UPDATE LECTURE  SET LECTURETOTALVIDEOTIME = ? WHERE LECTURE_NO  = ?;`,
      //       [videoDuration, setLecNo],
      //       (err, rows) => {
      //         if (err) throw err;
      //       }
      //     );
      //   } catch (error) {
      //     console.error(error);
      //     return res.status(500).send("Internal Server Error");
      //   }
      // }
      const { TOCtitle, TOCdescription, videoDuration, lecNo } = req.body;

      // 각 반복에서의 TOCNo 값을 저장할 변수
      let setTOCNo = 0;
      let setLecNo = lecNo;

      try {
        for (const file of req.files) {
          const encodedFileName = encodeURIComponent(file.originalname);
          const videoFilePath = `http://localhost:4001/test/${encodedFileName}`;

          // LectureTOC 테이블에 데이터 삽입
          const insertTOCResult = await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO LectureTOC (TITLE, LECTURE_NO, DESCRIPTION,TOTALVIDEOTIME)
        VALUES (?,?,?,?);`,
              [TOCtitle, lecNo, TOCdescription, videoDuration],
              (err, rows) => {
                if (err) reject(err);
                resolve(rows);
              }
            );
          });

          // 가장 최근에 삽입된 LectureTOC_NO 조회
          const selectTOCResult = await new Promise((resolve, reject) => {
            db.query(
              `SELECT LECTURETOC_NO  FROM LectureTOC ORDER BY LECTURETOC_NO DESC LIMIT 1;`,
              (err, rows) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(rows);
                  setTOCNo = rows[0].LECTURETOC_NO;
                }
              }
            );
          });

          // LectureInfo 테이블에 데이터 삽입
          await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO LectureInfo (VIDEOURL, DESCRIPTION, LectureTOC_NO, LECTURE_NO)
        VALUES (?,?,?,?);`,
              [videoFilePath, TOCdescription, setTOCNo, lecNo],
              (err, rows) => {
                if (err) reject(err);
                resolve(rows);
              }
            );
          });

          console.log("@@@@@@@@@@@@@", videoDuration, setLecNo);
          // 강의 총 재생 시간 업데이트
          db.query(
            `UPDATE LECTURE  SET LECTURETOTALVIDEOTIME = ? WHERE LECTURE_NO  = ?;`,
            [videoDuration, setLecNo],
            (err, rows) => {
              if (err) throw err;
            }
          );
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    } else {
      for (const [index, file] of req.files.entries()) {
        const { TOCtitle, TOCdescription, videoDuration, lecNo } = req.body;

        const encodedFileName = encodeURIComponent(file.originalname);
        const videoFilePath = `http://localhost:4001/test/${encodedFileName}`;
        lectureTotalVideoTime += parseFloat(videoDuration[index]);

        // 각 반복에서의 TOCNo 값을 저장할 변수
        let setTOCNo = 0;

        setLecNo = lecNo[0];

        try {
          // LectureTOC 테이블에 데이터 삽입
          const insertTOCResult = await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO LectureTOC (TITLE, LECTURE_NO, DESCRIPTION,TOTALVIDEOTIME)
            VALUES (?,?,?,?);`,
              [
                TOCtitle[index],
                lecNo[index],
                TOCdescription[index],
                videoDuration[index],
              ],
              (err, rows) => {
                if (err) reject(err);
                resolve(rows);
              }
            );
          });

          // 가장 최근에 삽입된 LectureTOC_NO 조회
          const selectTOCResult = await new Promise((resolve, reject) => {
            db.query(
              `SELECT LECTURETOC_NO  FROM LectureTOC ORDER BY LECTURETOC_NO DESC LIMIT 1;`,
              (err, rows) => {
                if (err) reject(err);
                resolve(rows);
              }
            );
          });

          setTOCNo = selectTOCResult[0].LECTURETOC_NO;

          // LectureInfo 테이블에 데이터 삽입
          await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO LectureInfo (VIDEOURL, DESCRIPTION, LectureTOC_NO, LECTURE_NO)
            VALUES (?,?,?,?);`,
              [videoFilePath, TOCdescription[index], setTOCNo, lecNo[index]],
              (err, rows) => {
                if (err) reject(err);
                resolve(rows);
              }
            );
          });
        } catch (error) {
          console.error(error);
          return res.status(500).send("Internal Server Error");
        }
        try {
          console.log("@@@@@@@@@@@@@123", lectureTotalVideoTime);

          db.query(
            `UPDATE LECTURE  SET LECTURETOTALVIDEOTIME = ? WHERE LECTURE_NO  = ?;`,
            [lectureTotalVideoTime, setLecNo],
            (err, rows) => {
              if (err) throw err;
            }
          );
        } catch (error) {
          console.error(error);
          return res.status(500).send("Internal Server Error");
        }
      }
    }

    res.status(200).send({ message: "ok" });
  }
);

module.exports = router;
