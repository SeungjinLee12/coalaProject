var db = require("./db");
var template = require("./template.js");
var url = require("url");
var qs = require("querystring");

exports.join = function (request, response) {
  var title = "회원가입";
  var html = template.joinhtml(
    title,
    `
    <h2>${title}</h2>
    <form action="/join_process" method="post">
        <div class="form-group">
            <label for="username">사용자명:</label>
            <input type="text" class="form-control" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="id">아이디:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="password">비밀번호:</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary">가입하기</button>
    </form>
        `
  );
  response.writeHead(200);
  response.end(html);
};

exports.join_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query(
      `INSERT INTO user(name, id, password) values(?,?,?)`,
      [post.username, post.email, post.password],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/` });
        response.end();
      }
    );
  });
};
