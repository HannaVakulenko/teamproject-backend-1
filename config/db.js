require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const sql = "SELECT * FROM NewTable";

pool.query(sql, function (err, result) {
  if (err) {
    throw err;
  }
});

module.exports = pool;
