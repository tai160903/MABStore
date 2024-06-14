const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: { type: Number, required: true },
    image: { type: String, required: true },
    toltalPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    note: { type: String },
  },
  {
    collection: "order",
    timestamps: true,
  }
);
const orderModel = mongoose.model("orderModel", orderSchema);
module.exports = orderModel;
