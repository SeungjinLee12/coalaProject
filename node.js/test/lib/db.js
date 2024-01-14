var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "1234",
  database: "nodejsTest",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
  console.log("Connected to MySQL server");
});

module.exports = db;
