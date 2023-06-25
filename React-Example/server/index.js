const express = require("express");
const app = express();
const route = require("../routes/route");
const path = require("path");

var http = require("http");
var server = http.createServer(app);
const PORT = process.env.PORT || 3031;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json({ limit: "10mb" })),
  app.use(bodyParser.text({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", route);

server.listen(PORT, () => {
  console.log(`servidor conectado en ${PORT}`);
});
