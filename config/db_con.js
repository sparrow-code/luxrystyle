var mysql = require('mysql');

//import { promisify } from "util";

var util = require('util');
/*
HOST : 
User Name : cyberyug
Password : Shivam@123
PORT : 3306
DB Name : cyberyug
*/
// DB Configuration

let production = "true";

if (production == "true") {
  var db_host = process.env.DB_HOST || 'sg2plzcpnl490050.prod.sin2.secureserver.net',
  db_user = process.env.DB_USER || 't1rxbcgfl55q',
  db_password = process.env.DB_PASSWORD || 'Shivamdwivedi024@',
  db_port = process.env.DB_PORT || '3306',
  db_name = process.env.DB_name || 'mfr_wholeseller';
} else if (production == "false") {
  var db_host = '192.168.1.4',
  db_user = 'root',
  db_password = '',
  db_port = '3306',
  db_name = 'mfr_wholeseller';
} else {
  console.log("Sorry Enviroment Not Define")
}
var pool = mysql.createPool({
  host: db_host,
  user: db_user,
  password: db_password,
  port: db_port,
  database: db_name
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database Connection was Closed")
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database Has Too many connections")
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database Connection was refused")
    }
  }

  if (connection) connection.release();
  console.log("Database is Connected")

})

pool.query = util.promisify(pool.query)

module.exports = pool;
