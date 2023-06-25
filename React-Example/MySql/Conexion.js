var mysql = require("mysql");
var conexion = mysql.createConnection({
  host: "localhost",
  database: "proyectos",
  user: "root",
  password: "A1234L",
});

module.exports = conexion;
