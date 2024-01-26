const [email, setEmail] = useState(""); // 이메일 상태 추가
const [emailMessage, setEmailMessage] = useState("중복체크를 해주세요"); // 초기 메시지 설정

const handleEmailChange = async (e) => {
  setEmail(e.target.value); // email 상태 업데이트
  await setEmailMessage("중복체크를 해주세요"); // 이메일이 변경되면 초기 메시지로 설정
  console.log(emailMessage); // 추가
};

const handleEmailCheck = () => {
  axios
    .post(`${serverUrl}/login/join/emailCheck`, { EMAIL: email })
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "duplicate") {
        setEmailMessage({ text: res.data.message, color: "red" });
      } else if (res.data.status === "available") {
        setEmailMessage({ text: res.data.message, color: "green" });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

router.post("/join/emailCheck", (req, res) => {
  const email = req.body.EMAIL;
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
