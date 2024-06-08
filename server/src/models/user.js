const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 5,
      max: 20,
    },
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, min: 8, trim: true },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    isAdmin: { type: Boolean, required: true, default: false },
    phone: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    point: { type: Number, required: false, default: 0 },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    collection: "user",
    timestamps: true,
  }
);
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
