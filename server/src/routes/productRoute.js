const express = require("express");
const authMidleware = require("../middlewares/authMidleware");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.getAllProduct);
router.get("/detail/:id", productController.detailProduct);
router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
