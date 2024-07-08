const OTP = require('../models/otp.modal');

async function saveOTP(email, otp) {
  try {
    const newOTP = new OTP({
      // userId: userId,
      email:  email,
      otp: otp,
    });
    console.log(newOTP);
    await newOTP.save();
    console.log('OTP saved successfully!');
  } catch (error) {
    console.error('Error saving OTP:', error);
  }
}

module.exports = { saveOTP };

// const OTP = require('../models/otp.modal');

// async function saveOTP(newOTP) {
//   try {
//     const otpInstance = new OTP(newOTP);
//     await otpInstance.save();
//     console.log("OTP saved successfully!");
//   } catch (error) {
//     console.error("Error saving OTP:", error);
//     throw error; 
//   }
// }

// module.exports = { saveOTP };
