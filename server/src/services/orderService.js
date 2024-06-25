const orderModel = require("../models/order");

const orderService = {
  createOrder: (newOrder) => {
    return new Promise(async (resolve, reject) => {
      const {
        orderItems,
        fullName,
        address,
        city,
        phone,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user,
      } = newOrder;
      console.log("newOrder", newOrder);
      try {
        const createOrder = await orderModel.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
        });
        if (createOrder) {
          return resolve({
            status: "OK",
            message: "SUCCESS",
            data: createOrder,
          });
        } else {
          return resolve({
            status: "ERR",
            message: "User creation failed",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = orderService;
