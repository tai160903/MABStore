const express = require("express");
const homeController = require("../controllers/homeController");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Homepage");
});

router.post("/register", homeController.register);
router.post("/login", homeController.login);

module.exports = router;
