const { response } = require("express");
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
        !weight ||
        !brand ||
        !price ||
        !quantity ||
        !rating
      ) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const response = await productService.createProduct(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
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
        return res.status(200).json({
          status: "ERR",
          message: "The productId is required",
        });
      }
      const response = await productService.updateProduct(productId, data);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
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
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await productService.deleteProduct(productId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err,
      });
    }
  },

  detailProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res.json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await productService.detailProduct(productId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred!",
        error: err.message,
      });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const { limit, page, sort, filter } = req.query;
      console.log("req.query", req.query);
      const response = await productService.getAllProduct(
        Number(limit) || 10,
        Number(page) || 0,
        sort,
        filter
      );
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};
module.exports = productController;
