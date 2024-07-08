const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  // userId   : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email    : { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  otp      : { type: String, required: true },
  expired  : { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now, expires: 60 } 
},

{
  timestamps: true,
}
);
const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;