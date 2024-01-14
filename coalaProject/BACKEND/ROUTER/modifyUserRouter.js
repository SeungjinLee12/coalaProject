const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

// /modifyUser

//비밀번호확인
router.post("/userCheck", (req, res) => {
  const inputPassword = req.body.PASSWORD;
  const userNo = req.query.userNo;

  db.query(
    `
        SELECT PASSWORD
        FROM USER
        WHERE USER_NO = ?;`,
    [userNo],
    async (err, rows) => {
      if (err) {
        // 데이터베이스 오류가 발생한 경우
        res.status(500).json({ error: "서버 오류" });
      } else {
        if (rows.length > 0) {
          // 사용자가 존재하고 비밀번호가 일치하는 경우
          const storedPassword = rows[0].PASSWORD;

          try {
            // bcrypt.compare를 사용하여 비밀번호 비교
            const passwordMatch = await bcrypt.compare(
              inputPassword,
              storedPassword
            );

            if (passwordMatch) {
              res.status(200).json({ success: true, message: "비밀번호 일치" });
            } else {
              res
                .status(401)
                .json({ success: false, message: "비밀번호 불일치" });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "서버 오류" });
          }
        } else {
          // 사용자가 존재하지 않는 경우
          res
            .status(404)
            .json({ success: false, message: "사용자를 찾을 수 없음" });
        }
      }
    }
  );
});

//유저정보수정
router.post("/information", (req, res) => {
  const name = req.body.NAME;
  const phone = req.body.PHONE;
  const image = req.body.IMAGE;
  const userNo = req.query.userNo;

  db.query(
    `
    UPDATE USER
    SET
      PHONE = ?,
      IMAGE = ?,
      NAME = ?
  WHERE USER_NO = '${userNo}';`,
    [phone, image, name],
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
          success: true,
          message: "수정이 완료되었습니다.",
        });
      }
    }
  );
});

//유저 비밀번호 변경
router.post("/password", async (req, res) => {
  const newPassword = req.body.PASSWORD;
  const userNo = req.query.userNo;

  try {
    // 새로운 비밀번호를 bcrypt를 사용하여 해싱
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    db.query(
      `
          UPDATE USER
          SET
            PASSWORD = ?
        WHERE USER_NO = ?;`,
      [hashedPassword, userNo],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "내부 서버 오류" });
        } else {
          res.status(200).json({
            success: true,
            message: "수정이 완료되었습니다.",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

//유저정보수정 -> 장바구니 리스트
router.get("/cart", (req, res) => {
  db.query(
    `SELECT L.PRICE, L.TITLE, L.IMAGEURL
      FROM CART C
      JOIN LECTURE L ON C.LECTURE_NO = L.LECTURE_NO
      WHERE C.USER_NO = ${req.query.userNo};`,
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      var update_cart = rows.map((row) => ({
        title: row.TITLE,
        imageUrl: row.IMAGEURL,
        price: row.PRICE,
      }));
      res.json(update_cart);
    }
  );
});

//유저정보수정 -> 결제내역 리스트
router.get("/payment", (req, res) => {
  const userNo = req.query.userNo;
  db.query(
    `SELECT P.PAYMENTTIME, L.TITLE, L.PRICE, L.IMAGEURL 
    FROM PAYMENT P
    JOIN LECTURE L ON P.LECTURE_NO = L.LECTURE_NO 
    JOIN USER U ON U.USER_NO = P.USER_NO
    WHERE U.USER_NO = ?
    ORDER BY P.PAYMENTTIME ASC;`,
    [userNo],
    function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      var update_payment = rows.map((row) => ({
        title: row.TITLE,
        imageUrl: row.IMAGEURL,
        price: row.PRICE,
        paymenttime: row.PAYMENTTIME,
      }));
      res.json(update_payment);
    }
  );
});

//유저정보수정 -> 관심과목
router.get("/interest", (req, res) => {
  const userNo = req.query.userNo;
  const i1 = req.body.INTEREST1;
  const i2 = req.body.INTEREST2;
  const i3 = req.body.INTEREST3;

  db.query(
    `UPDATE USER
      SET 
        INTEREST1 = ?,
        INTEREST2 = ?,
        INTEREST3 = ?
      WHERE USER_NO = ?`,
    [i1, i2, i3, userNo],
    function (err, rows) {
      if (err) {
        throw err;
      }
    }
  );
  res.sendStatus(200);
});

module.exports = router;
