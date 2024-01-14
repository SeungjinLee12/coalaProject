var express = require("express");
var app = express();
var url = require("url");
var template = require("./lib/template.js");
var db = require("./lib/db.js");
var topic = require("./lib/topic.js");
var author = require("./lib/author.js");
var cookieParser = require("cookie-parser");
var join = require("./lib/join.js");

app.use(cookieParser());

app.get("/", function (req, res) {
  var _url = req.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (queryData.id === undefined) {
    topic.home(req, res);
  } else {
    topic.page(req, res);
  }
});

app.get("/join", join.join);
app.post("/join_process", join.join_process);

app.get("/create", topic.create);
app.post("/create_process", topic.create_process);
app.get("/update", topic.update);
app.post("/update_process", topic.update_process);
app.post("/delete_process", topic.delete_process);

app.get("/author", author.home);
app.post("/author/create_process", author.create_process);
app.get("/author/update", author.update);
app.post("/author/update_process", author.update_process);
app.post("/author/delete_process", author.delete_process);

app.listen(3007, function () {
  console.log("example app listening on port 3007!");
});
