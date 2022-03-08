require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./configs/db")();
const app = express();
app.use(express.json());
const winecontroller = require("./controllers/wine.controller");
app.use("/", winecontroller);;
var port = process.env.PORT || 3000;
app.set("port", port);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});