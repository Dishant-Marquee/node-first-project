const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fname     : { type: String, required: false },
    lname     : { type: String, required: false },
    email     : { type: String, required: true },
    password  : { type: String, required: true },
    isDeleted : { type: Boolean, default: false}
  },

  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {

    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
