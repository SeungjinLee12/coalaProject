const cookieParser = require("cookie-parser");
const http = require("http");
const express = require("express");
const app = express();
const url = require("url");
const db = require("./DB/db");
const bodyParser = require("body-parser");
const port = 4001;
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트의 주소로 변경
  credentials: true,
};

// CORS 설정
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("public"));

const mainPage = require("./ROUTER/mainPageRouter");
const login = require("./ROUTER/loginRouter");
const modifyUser = require("./ROUTER/modifyUserRouter");
const lecture = require("./ROUTER/lectureRouter");

app.set("port", port);
app.use(bodyParser.json());
app.use("/api", mainPage);
app.use("/login", login);
app.use("/modifyUser", modifyUser);
app.use("/lecture", lecture);

app.listen(port, () => {
  console.log("코알라 서버 포트 : " + port);
});
