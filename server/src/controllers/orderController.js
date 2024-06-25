const orderService = require("../services/orderService");
const orderController = {
  createOrder: async (req, res) => {
    try {
      const {
        fullName,
        address,
        city,
        phone,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      console.log("req.body", req.body);
      if (
        !fullName ||
        !address ||
        !city ||
        !phone ||
        !paymentMethod ||
        !itemsPrice ||
        !shippingPrice ||
        !totalPrice
      ) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const response = await orderService.createOrder(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: err,
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
      const response = await productService.getAllProduct(
        Number(limit) || null,
        Number(page) || 0,
        sort,
        filter
      );
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  getAllCate: async (req, res) => {
    try {
      const response = await productService.getAllCate();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },
};
module.exports = orderController;
