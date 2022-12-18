const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: __dirname + "/.env" });

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io")(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("common"));

// app.set("view engine", "ejs");
//connect
var dbConn = require("./config/config");
mongoose.connection.once("open", () => {
  console.log("Connect mongodb");
  server.listen(port, () => {
    console.log("server api port " + port);
    setInterval(function () {
      console.log("server api port " + port);
    }, 300000);
  });
});

socketIo.on("connection", (socket) => {
  console.log("có người đang kết nối: " + socket.id);

  

  socket.on("client up data drink order", () => {
    console.log("Sever nhận data drink order từ client: ");
    socketIo.sockets.emit("sever up data drink order");
  });

  socket.on("client change data status table", () => {
    console.log("Sever nhận data table status từ client: ");
    socketIo.sockets.emit("sever up data table status");
  });
  socket.on("client up data success drink order", () => {
    console.log("Sever nhận data drink order từ client: ");
    socketIo.sockets.emit("sever up data drink order");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

const userRoute = require("./routes/user");
const drinkRoute = require("./routes/drink");
const categoryRoute = require("./routes/category");
const roleRoute = require("./routes/role");
const areaRoute = require("./routes/area");
const tableRoute = require("./routes/table");
const drinkOrderRoute = require("./routes/drinkOrder");
const orderRoute = require("./routes/order");
const authorization = require("./config/authTokenRequired");

app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/drink", drinkRoute);
app.use("/api/category", categoryRoute);
app.use("/api/area", areaRoute);
app.use("/api/table", tableRoute);
app.use("/api/drinkorder", drinkOrderRoute);
app.use("/api/order", orderRoute);

app.get("/", authorization, (req, res) => {
  return res.json(req.user);
});
module.exports = app;
