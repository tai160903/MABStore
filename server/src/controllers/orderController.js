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

  getOrderDetails: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await orderService.getOrderDetails(userId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};
module.exports = orderController;
