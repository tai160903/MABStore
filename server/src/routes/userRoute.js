const express = require("express");
const userController = require("../controllers/userController");
const authMidleware = require("../middlewares/authMidleware");
const router = express.Router();

router.get("/", authMidleware, userController.getAllUser);
router.get("/detail/:id", userController.detailUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", authMidleware, userController.deleteUser);
module.exports = router;
