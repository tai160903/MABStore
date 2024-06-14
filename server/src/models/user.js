const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Username existed!"],
      min: 5,
      max: 20,
    },
    fullName: { type: String, required: false, trim: true },
    password: { type: String, required: true, min: 8, trim: true },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    isAdmin: { type: Boolean, required: true, default: false },
    phone: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    point: { type: Number, required: false, default: 0 },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
  },
  {
    collection: "user",
    timestamps: true,
  }
);
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
