const express = require("express");
const authMidleware = require("../middlewares/authMidleware");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/create", orderController.createOrder);
router.get(
  "/order-detail/:id",
  authMidleware.user,
  orderController.getOrderDetails
);

module.exports = router;
