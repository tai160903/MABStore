const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 8085;
dotenv.config();

app.get("/", (req, res) => {
  return res.send("Hello word!");
});

app.listen(port, () => {
  console.log("Server started: http://localhost:8085/");
});
