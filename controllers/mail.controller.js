const User = require("../models/user.model");
const {sendPasswordResetOTPEmail} = require('../helper/mail.helper');
const { generateNumericOTP } = require('../utils/otpGenerator.utils');
const { saveOTP } = require('../utils/otp.utils');


// aa function ahiya thi bhi use kari sakai che  
// function generateNumericOTP(length) {
//     const digits = '0123456789';
//     let otp = '';
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * digits.length);
//       otp += digits[randomIndex];
//     }
//     return otp;
//   }

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(req.body);
  
    try {
      const existingUser = await User.findOne({ email });
      console.log(existingUser);
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const otp = generateNumericOTP(6); 


      await saveOTP(existingUser._id, otp);
    //   existingUser.otp = otp;
    //   await existingUser.save();
    //  console.log(otp);


    
    await sendPasswordResetOTPEmail(email, otp);
  
      res.status(200).json({ message: 'Password reset OTP sent successfully' });
    } catch (error) {
      console.error('Error sending password reset OTP:', error);
      res.status(500).json({ error: 'Failed to send password reset OTP' });
    }
  };