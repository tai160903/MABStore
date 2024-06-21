const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const orderSchema = new Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true },
    deliveredAt: { type: Date },
  },
  {
    collection: "order",
    timestamps: true,
  }
);
const orderModel = mongoose.model("orderModel", orderSchema);
module.exports = orderModel;
