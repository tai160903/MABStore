const orderModel = require("../models/order");
const productModel = require("../models/product");

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
      try {
        const promises = orderItems.map(async (order) => {
          const productData = await productModel.findByIdAndUpdate(
            {
              _id: order.product,
              quantity: { $gte: order.amount },
            },
            {
              $inc: {
                quantity: -order.amount,
                selled: +order.amount,
              },
            },
            { new: true }
          );
          console.log("productData", productData);
          if (productData) {
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
              return {
                status: "OK",
                message: "SUCCESS",
              };
            } else {
              return {
                status: "ERR",
                message: "ERR",
                id: order.product,
              };
            }
          }
        });
        const result = await Promise.all(promises);
        const newData = result && result.filter((item) => item.id);
        if (newData.length) {
          resolve({
            status: "ERR",
            message: `PRoduct have id ${newData.join(",")} not enough quantity`,
          });
        }
        resolve({
          status: "OK",
          message: "SUCCESS",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOrderDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await orderModel.findOne({ user: id });
        if (order === null) {
          return resolve({
            status: "ERR",
            message: "Can not find order!",
          });
        }
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: order,
        });
      } catch (error) {
        return reject(err);
      }
    });
  },
};

module.exports = orderService;
