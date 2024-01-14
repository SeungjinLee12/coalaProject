const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

// /login

//로그인
router.post("/", async (req, res) => {
  const email = req.body.EMAIL;
  const password = req.body.PASSWORD;

  db.query(
    `SELECT EMAIL, PASSWORD, INTEREST1, INTEREST2, INTEREST3, PHONE, NAME, IMAGE
        FROM USER
        WHERE EMAIL = ?;`,
    [email],
    async function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (rows.length > 0) {
        const storedPassword = rows[0].PASSWORD;

        try {
          const passwordMatch = await bcrypt.compare(password, storedPassword);

          if (passwordMatch) {
            var loginUser = rows.map((row) => ({
              login_user_email: row.EMAIL,
              login_user_phone: row.PHONE,
              login_user_name: row.NAME,
              login_user_image: row.IMAGE,
              login_user_interest1: row.INTEREST1,
              login_user_interest2: row.INTEREST2,
              login_user_interest3: row.INTEREST3,
            }));
            console.log(loginUser);
            res.json(loginUser);
          } else {
            res.status(401).send("비밀번호가 일치하지 않습니다.");
          }
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      } else {
        res.status(404).send("해당 이메일로 등록된 사용자가 없습니다.");
      }
    }
  );
});

//회원가입/유저정보수정 닉네임중복체크
router.post("/join/nameCheck", (req, res) => {
  const name = req.body.NAME;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "올바르지 않은 요청입니다." });
  }

  db.query(
    `SELECT NAME
        FROM USER
        WHERE NAME = ?;`,
    [name],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "내부 서버 오류" });
      }

      if (rows.length > 0) {
        return res.status(200).json({ message: "중복된 닉네임입니다." });
      } else {
        return res.status(401).json({ message: "사용 가능한 닉네임입니다." });
      }
    }
  );
});

//회원가입 이메일 중복체크
router.post("/join/emailCheck", (req, res) => {
  const email = req.body.EMAIL;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "올바르지 않은 요청입니다." });
  }
  db.query(
    `SELECT EMAIL
        FROM USER
        WHERE EMAIL = ?;`,
    [email],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "내부 서버 오류" });
      }

      if (rows.length > 0) {
        return res.status(200).json({ message: "중복된 이메일입니다." });
      } else {
        return res.status(401).json({ message: "사용 가능한 이메일입니다." });
      }
    }
  );
});

//회원가입
router.post("/join_user", async (req, res) => {
  const email = req.body.EMAIL;
  const name = req.body.NAME;
  const password = req.body.PASSWORD;
  const phone = req.body.PHONE;
  const image = req.body.IMAGE;
  const birth = req.body.BIRTH;
  const interest1 = req.body.INTEREST1;
  const interest2 = req.body.INTEREST2;
  const interest3 = req.body.INTEREST3;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query(
      `INSERT INTO USER (NAME, EMAIL, PASSWORD, PHONE, BIRTH, IMAGE, INTEREST1, INTEREST2, INTEREST3)
          VALUES (?,?,?,?,?,?,?,?,?);`,
      [
        name,
        email,
        hashedPassword,
        phone,
        birth,
        image,
        interest1,
        interest2,
        interest3,
      ],
      function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).send("회원가입 실패");
        } else {
          console.log(rows);
          res.send("회원가입 성공");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
