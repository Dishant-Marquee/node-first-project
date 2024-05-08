const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    service: 'gmail',
    auth: {
      user: "dishant.marquee@gmail.com",
      pass: "quxtxbwlzxmjxvzs",
    },
  })
);

exports.sendRegistrationEmail = async (req, res, email) => {
  try {
    const mailOptions = {
      from: {
        name: 'Data-Table',
        address: "dishant.marquee@gmail.com",
      },
      to: email,
      subject: "Registration Successful",
      text: `Dear User,

      Congratulations! Your registration on Data-Table was successful.
      
      Thank you for joining us. We look forward to providing you with a great experience.
      
      Best regards,
      Data-Table Team`,
    };
    
    if (!email || !email.trim()) {
      console.error("Error: Invalid email address");
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ error: "Failed to send email" });
      }
    
      console.log("Mail sent:", info);
    });
  } catch (error) {
    console.error("Error in sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};




// ==================================for-otp-=====================================\\


exports.sendPasswordResetOTPEmail = async (email, otp) => {

  try {
    const mailOptions = {
      from: {
        name: 'reset-password',
        address: "dishant.marquee@gmail.com",
      },
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transport.sendMail(mailOptions);
    console.log('Password reset OTP email sent successfully!');
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
  }
};


