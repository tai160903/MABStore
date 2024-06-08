const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const paymentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    status: { type: String, required: true },
    method: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    collection: "payment",
    timestamps: true,
  }
);

const paymentModel = mongoose.model("paymentModel", paymentSchema);
module.exports = paymentModel;
