const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    enum: ["self", "google"],
    default: "self",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: false,
  },
  lastLoginAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
