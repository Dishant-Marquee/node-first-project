const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname    : { type: String, required: false },
    lname    : { type: String, required: false },
    email    : { type: String, required: true },
    password : { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
