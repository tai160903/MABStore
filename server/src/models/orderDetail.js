const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const orderDetailSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
  },
  {
    collection: "orderDetail",
    timestamps: true,
  }
);
const orderDetailModel = mongoose.model("orderDetailModel", orderDetailSchema);
module.exports = orderDetailModel;
