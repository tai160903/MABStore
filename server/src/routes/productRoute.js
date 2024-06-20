const express = require("express");
const authMidleware = require("../middlewares/authMidleware");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/all", productController.getAllProduct);
router.get("/detail/:id", productController.detailProduct);
router.post("/create", authMidleware.admin, productController.createProduct);
router.put("/update/:id", authMidleware.admin, productController.updateProduct);
router.delete(
  "/delete/:id",
  authMidleware.admin,
  productController.deleteProduct
);

module.exports = router;
