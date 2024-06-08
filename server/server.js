const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
dotenv.config();
const port = process.env.PORT || 8085;

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Database false: ", err));
app.use(cors());

app.get("/", (req, res) => {
  res.send("DDDDD");
});

app.listen(port, () => {
  console.log("Server started: http://localhost:8085/");
});
