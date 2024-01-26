const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// /login

// 로그인
router.post("/", (req, res) => {
  const email = req.body.email; // 이 부분도 소문자로 변경
  const password = req.body.password; // 이 부분도 소문자로 변경
  console.log(email, password);

  db.query(
    `SELECT USER_NO, EMAIL, PASSWORD, INTEREST1, INTEREST2, INTEREST3, PHONE, NAME, IMAGE
    FROM USER
    WHERE EMAIL = ?;`,
    [email],
    (err, rows) => {
      try {
        if (err) {
          throw err;
        }

        if (rows.length > 0) {
          const storedPassword = rows[0].PASSWORD;
          console.log(storedPassword);

          try {
            const passwordMatch = bcrypt.compareSync(password, storedPassword);

            if (passwordMatch) {
              const token = jwt.sign(
                {
                  email: rows[0].EMAIL,
                  id: rows[0].USER_NO,
                  interest1: rows[0].INTEREST1,
                  interest2: rows[0].INTEREST2,
                  interest3: rows[0].INTEREST3,
                },
                "secretKey"
              );
              // 변경된 부분: passwordMatch 비교 수정
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
              res
                .cookie("access_token", token, {
                  httpOnly: true,
                })

                .status(200)
                .json(rows[0]);
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
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
});

router.get("/logout", (req, res) => {
  try {
    // 클라이언트로부터 쿠키를 얻기 위해 request.cookies 사용
    const cookies = req.cookies;
    if (cookies !== null) {
      for (const userToken in cookies) {
        if (cookies.hasOwnProperty(userToken)) {
          // 쿠키의 maxAge를 0으로 설정하여 쿠키 만료
          res.cookie(userToken, "", { maxAge: 0, httpOnly: true });
        }
      }
    }

    res.send("로그아웃성공");
  } catch (error) {
    console.error("로그아웃 중 오류:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 회원가입/유저정보수정 닉네임 중복체크
router.post("/join/nameCheck", (req, res) => {
  const name = req.body.NAME;

  const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
  const isValidNickname = nicknameRegex.test(name);

  db.query(
    `SELECT NAME
        FROM USER
        WHERE NAME = ?;`,
    [name],
    (err, rows) => {
      try {
        if (err) {
          throw err;
        }
        if (!isValidNickname) {
          return res.status(200).json({
            status: "invalid",
            message: "닉네임에 특수문자를 사용할 수 없습니다.",
          });
        }

        if (rows.length > 0) {
          return res
            .status(200)
            .json({ status: "duplicate", message: "중복된 닉네임입니다." });
        } else {
          return res.status(200).json({
            status: "available",
            message: "사용 가능한 닉네임입니다.",
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "내부 서버 오류" });
      }
    }
  );
});

// 회원가입 이메일 중복체크
router.post("/join/emailCheck", (req, res) => {
  const email = req.body.EMAIL;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = emailRegex.test(email);

  db.query(
    `SELECT EMAIL
        FROM USER
        WHERE EMAIL = ?;`,
    [email],
    (err, rows) => {
      try {
        if (err) {
          throw err;
        }
        if (!isValidEmail) {
          return res.status(200).json({
            status: "invalid",
            message: "Email 형식에 맞지 않습니다.",
          });
        }

        if (rows.length > 0) {
          return res
            .status(200)
            .json({ status: "duplicate", message: "중복된 이메일입니다." });
        } else {
          return res.status(200).json({
            status: "available",
            message: "사용 가능한 이메일입니다.",
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "내부 서버 오류" });
      }
    }
  );
});

// 회원가입
router.post("/join_user", async (req, res) => {
  const email = req.body.EMAIL;
  const name = req.body.NAME;
  const password = req.body.PASSWORD;
  const phone = req.body.PHONE;
  const birth = req.body.BIRTH;
  const interest1 = req.body.INTEREST1;
  const interest2 = req.body.INTEREST2;
  const interest3 = req.body.INTEREST3;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO USER (NAME, EMAIL, PASSWORD, PHONE, BIRTH, INTEREST1, INTEREST2, INTEREST3)
  VALUES (?,?,?,?,?,?,?,?);`;

  console.log(sql);
  db.query(
    sql,
    [
      name,
      email,
      hashedPassword,
      phone,
      birth,
      interest1,
      interest2,
      interest3,
    ],
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
      res.send("회원가입 성공");
    }
  );
});

router.get("/join/interest", (req, res) => {
  try {
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

        // const resResult = {
        //   category_list: category,
        // };
        res.json(category);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
