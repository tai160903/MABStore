const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const homeRoute = require("./src/routes/homeRoute");
const userRoute = require("./src/routes/userRoute");
const app = express();
dotenv.config();
const port = process.env.PORT || 8085;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Database false: ", err));

app.use("/", homeRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log("Server started: http://localhost:8085/");
});
