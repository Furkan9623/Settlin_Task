const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required..."] },
    email: {
      type: String,
      validate: [validator.isEmail, "Email is valid"],
      required: [true, "email is required..."],
    },
    password: { type: String, required: [true, "password is required.."] },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
