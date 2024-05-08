const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: "dishant.marquee@gmail.com",
        pass: "quxtxbwlzxmjxvzs",
      },
    })
  );
  

async function sendPasswordResetOTPEmail(email, otp) {
  try {
    const mailOptions = {
      from: 'dishant.marquee@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset OTP email sent successfully!');
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
  }
}

module.exports = sendPasswordResetOTPEmail;
