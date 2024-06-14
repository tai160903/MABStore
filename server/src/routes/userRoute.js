const express = require("express");
const userController = require("../controllers/userController");
const authMidleware = require("../middlewares/authMidleware");
const router = express.Router();

router.get("/", authMidleware.admin, userController.getAllUser);
router.get("/detail/:id", authMidleware.user, userController.detailUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", authMidleware.admin, userController.deleteUser);
router.post("/refresh_token", userController.refreshToken);

module.exports = router;
