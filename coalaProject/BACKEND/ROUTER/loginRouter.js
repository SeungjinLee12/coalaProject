// const smtpTransport = require("../config/email");
const db = require("../DB/db");
const bodyParser = require("body-parser");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { query } = require("express");

// /login

// 로그인
router.post("/", (req, res) => {
  const email = req.body.email; // 이 부분도 소문자로 변경
  const password = req.body.password; // 이 부분도 소문자로 변경

  db.query(
    `SELECT USER_NO, EMAIL, PASSWORD, INTEREST1, INTEREST2, INTEREST3, PHONE, NAME, TYPE
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
                  type: rows[0].TYPE,
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
      res.send("회원가입 성공");
    }
  );
});

router.get("/join/interest/check", (req, res) => {
  const INTEREST1 = req.query.INTEREST1;
  const INTEREST2 = req.query.INTEREST2;
  const INTEREST3 = req.query.INTEREST3;

  const categoryNos = [];

  db.query(
    "SELECT CATEGORY_NO FROM CATEGORY WHERE CATEGORY_NAME = ? LIMIT 1;",
    [INTEREST1],
    (err, rows1) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (rows1.length > 0) {
        categoryNos.push(rows1[0].CATEGORY_NO);
      }

      db.query(
        "SELECT CATEGORY_NO FROM CATEGORY WHERE CATEGORY_NAME = ? LIMIT 1;",
        [INTEREST2],
        (err, rows2) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          if (rows2.length > 0) {
            categoryNos.push(rows2[0].CATEGORY_NO);
          }

          db.query(
            "SELECT CATEGORY_NO FROM CATEGORY WHERE CATEGORY_NAME = ? LIMIT 1;",
            [INTEREST3],
            (err, rows3) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }
              if (rows3.length > 0) {
                categoryNos.push(rows3[0].CATEGORY_NO);
              }

              // 모든 처리가 끝나면 결과를 응답
              res.json({ categoryNos });
            }
          );
        }
      );
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

        res.json(category);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/kakao/callback", async function (req, res) {
  const access_token = req.body.idToken;
  let UserEmail = "";
  let Password = "";
  let UserCellPhone = "";
  let BirthYear = "";
  let BirthDay = "";
  let Birth = "";

  if (access_token != null && access_token) {
    const profileUrl = "https://kapi.kakao.com/v2/user/me";
    try {
      const profileResponse = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      Password = profileResponse.data.id.toString();
      PasswordCheck = profileResponse.data.id.toString();
      UserEmail = profileResponse.data.kakao_account.email;
      UserCellPhone =
        "0" +
        profileResponse.data.kakao_account.phone_number.replace(
          /[\s+\-+]|82/g,
          ""
        );
      BirthYear = profileResponse.data.kakao_account.birthyear.toString();
      BirthDay = profileResponse.data.kakao_account.birthday.toString();
      const Year = BirthYear.substring(2, 5);

      Birth = Year + BirthDay;

      var data = {
        UserEmail,
        Password,
        UserCellPhone,
        Birth,
      };

      var loginData = {
        UserEmail,
        Password,
      };

      db.query(
        "SELECT EMAIL FROM USER WHERE EMAIL = ?",
        [UserEmail],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows.length === 0) {
            res.status(200).json({ message: "first", data });
          } else {
            res.status(200).json({ message: "ok", loginData });
          }
        }
      );
    } catch (error) {
      console.error("프로필 요청 중 에러 발생:", error);
      res.status(500).send("프로필 요청 중에 오류가 발생했습니다.");
    }
  } else {
    console.error("액세스 토큰이 없습니다.");
    res.status(400).send("액세스 토큰이 없습니다.");
  }
});

router.post("/email", (req, res) => {
  var generateRandomNumber = function (min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  };

  const number = generateRandomNumber(111111, 999999);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rntmdwlsrmf@gmail.com",
      pass: "lrvt jqjp qabs xjje",
    },
  });

  const email = req.body.EMAIL;

  const mailOptions = {
    from: "rntmdwlsrmf@gmail.com ", // 발신자 이메일 주소.
    to: email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
    subject: " 인증 관련 메일 입니다. ",
    html: "<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>" + number,
  };
  transporter.sendMail(mailOptions, (error, response) => {
    //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
    if (error) {
      res.json({ ok: false, msg: " 메일 전송에 실패하였습니다. " });
      smtpTransport.close(); //전송종료
      return;
    } else {
      res.json({
        ok: true,
        msg: " 메일 전송에 성공하였습니다. ",
        authNum: number,
      });
      smtpTransport.close(); //전송종료
      return;
    }
  });
});

module.exports = router;
