const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const feedbackSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
  },
  {
    collection: "feedback",
    timestamps: true,
  }
);
const feedbackModel = mongoose.model("feedbackModel", feedbackSchema);
module.exports = feedbackModel;
