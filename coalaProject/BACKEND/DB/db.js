const mysql = require("mysql");

var db = mysql.createConnection({
  host: "54.180.102.152",
  port: "3306",
  user: "coalaProject",
  password: "wlgp4624@",
  database: "coalaDB",
});

module.exports = db;
