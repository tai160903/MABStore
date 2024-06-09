const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.put("/update/:id", userController.updateUser);

module.exports = router;
