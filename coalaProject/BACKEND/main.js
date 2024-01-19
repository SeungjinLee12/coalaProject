const http = require("http");
const express = require("express");
const app = express();
const url = require("url");
const db = require("./DB/db");
const bodyParser = require("body-parser");
const port = 4001;
const cors = require("cors");
// CORS 설정
app.use(cors());

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
