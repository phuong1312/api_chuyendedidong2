const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config({ path: __dirname + "/.env" });

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(morgan('common'));

// app.set("view engine", "ejs");
//connect
var dbConn = require("./config/config");
mongoose.connection.once("open", () => {
  console.log("Connect mongodb");
  app.listen(port, () => {
    console.log("server api port " + port);
    setInterval(function () {
      console.log("server api port " + port);
    }, 300000);
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
const authorization = require('./config/authTokenRequired');

app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/drink", drinkRoute);
app.use("/api/category", categoryRoute);
app.use("/api/are", areaRoute);
app.use("/api/table", tableRoute);
app.use("/api/drinkorder", drinkOrderRoute);
app.use("/api/order", orderRoute);

app.get('/', authorization, (req, res) => {
    console.log(req.user);
    return res.json(req.user);
});
module.exports = app;
