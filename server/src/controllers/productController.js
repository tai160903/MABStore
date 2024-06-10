const productService = require("../services/productService");
const productController = {
  createProduct: async (req, res) => {
    try {
      const {
        name,
        image,
        category,
        quantity,
        rating,
        weight,
        brand,
        price,
        description,
      } = req.body;
      if (
        !name ||
        !image ||
        !category ||
        !quantity ||
        !weight ||
        !brand ||
        !price
      ) {
        return res.status(200).json({
          status: "FAILED",
          message: "The input is required",
        });
      }
      const response = await productService.createProduct(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "FAILED",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const data = req.body;
      if (!productId) {
        return res.json({
          status: "FAILED",
          message: "The productId is required",
        });
      }
      console.log("data", data);
      const response = await productService.updateProduct(productId, data);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "FAILED",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.json({
          status: "FAILED",
          message: "The userId is required",
        });
      }
      const response = await productService.deleteProduct(productId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "FAILED",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  detailProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.json({
          status: "FAILED",
          message: "The userId is required",
        });
      }
      const response = await productService.detailProduct(productId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "FAILED",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const { limit, page, sort } = req.query;
      const response = await productService.getAllProduct(
        Number(limit) || 8,
        Number(page) || 0,
        sort
      );
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "FAILED",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },
};
module.exports = productController;
