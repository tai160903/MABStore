const express = require("express");
const authMidleware = require("../middlewares/authMidleware");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/create", authMidleware.user, orderController.createOrder);

module.exports = router;
