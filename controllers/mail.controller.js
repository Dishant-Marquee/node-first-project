const User = require("../models/user.model");
const {sendPasswordResetOTPEmail} = require('../helper/mail.helper');
const { generateNumericOTP } = require('../utils/otpGenerator.utils');
const { saveOTP } = require('../utils/otp.utils');


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const otp = generateNumericOTP(6); 


      await saveOTP(existingUser.email, otp);


    
    await sendPasswordResetOTPEmail(email, otp);
  
      res.status(200).json({success: true, message: 'Password reset OTP sent successfully' });
    } catch (error) {
      console.error('Error sending password reset OTP:', error);
      res.status(500).json({success: false, error: 'Failed to send password reset OTP' });
    }
  };