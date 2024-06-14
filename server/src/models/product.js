const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    quantity: { type: Number, default: 0 },
    rating: { type: Number },
    weight: { type: Number },
    brand: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
  },
  {
    collection: "product",
    timestamps: true,
  }
);
const productModel = mongoose.model("productModel", productSchema);
module.exports = productModel;
