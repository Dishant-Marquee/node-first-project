const USER = require("../models/user.model");
const bcrypt = require("bcrypt");
const emailController = require("../helper/mail.helper");
const DATATABLEWEB = require("../helper/dataTable.helper");
const OTP = require('../models/otp.modal');


exports.register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }
    const newUser = new USER({ fname, lname, email, password });
    await newUser.save();

    emailController.sendRegistrationEmail(req, res, email);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ===============================login======================================

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const userSession = {
      _id: user._id,
      email: user.email,
    };

    req.session.userId = userSession;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// ===================================user-data==============================

exports.userData = async (req, res) => {
  try {
    const users = await USER.find({ isDeleted: false });

    const data = users.map((user) => ({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
    }));

    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error, "Data-Not-Found");
    res.status(500).json({ error: "Data retrieval failed" });
  }
};

// =================================data-Update=============================

exports.dataUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    let userDataUpdate = req.body;

    if (userDataUpdate.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userDataUpdate.password, salt);
      userDataUpdate.password = hashedPassword;
    }

    const users = await USER.findOneAndUpdate(
      { _id: id },
      { $set: userDataUpdate },
      { new: true }
    );

    res.status(200).json(users);
  } catch (error) {
    console.log(error, "Data update failed");
    res.status(500).json({ error: "Data update failed" });
  }
};

// ==============================data-delete=============================

exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await USER.findOne({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await USER.findOneAndUpdate(
      { _id: deletedUser.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//================================find-data==================

exports.findData = async(req, res) => {
  try {
    let userFind = USER;
    let searchFields = ['fname', 'lname', 'email'];
    let conditionQuery = { isDeleted: false };
    let projectionQuery = '-createdAt -updatedAt -__v';
    let sortingQuery = { createdAt: -1 };
    let populateQuery = [];


    DATATABLEWEB.fetchDatatableRecords(req.body, userFind, searchFields, conditionQuery, projectionQuery, sortingQuery, populateQuery, function (err, data) {
      if (err) {
          res.status(200).send({
              "draw": 1,
              "recordsFiltered": 0,
              "recordsTotal": 0,
              "data": []
          });
      } else {
       
          const jsonString = JSON.stringify(data);
          res.send(jsonString);
      }
  });
} catch (err) {
  res.status(200).send({
      "draw": 1,
      "recordsFiltered": 0,
      "recordsTotal": 0,
      "data": []
  });
}
};


// ======================================otp-valid===================================

exports.otpvalid = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log(`Received email: ${email}, OTP: ${otp}`);

    if (!email && !otp) {
      console.log('Email or OTP is missing.');
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const otpEntry = await OTP.findOne({ email: email, otp: otp });
    console.log(`OTP Entry found: ${otpEntry}`);

    if (!otpEntry) {
      console.log('Invalid OTP or email.');
      return res.status(400).json({ message: 'Invalid OTP or email' });
    }

    if (otpEntry.expired) {
      console.log('OTP already used or expired.');
      return res.status(400).json({ message: 'OTP already used or expired' });
    }

    otpEntry.expired = true;
    await otpEntry.save();

    await OTP.deleteOne({ _id: otpEntry._id });

    const user = await USER.findOne({ email: email });
    if (!user) {
      console.log('User not found.');
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'OTP verified successfully', success: true, user: user });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//================================rewsend-otp===================================

exports.resendotp = async (req, res) => {
  
  try {
    const { email } = req.body;

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.findOneAndUpdate(
      { email: email },
      { otp: newOtp, expired: false, createdAt: Date.now() },
      { upsert: true }
    );

    console.log(`New OTP sent to ${email}: ${newOtp}`);

        res.status(200).json({ message: 'New OTP sent successfully!' });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//================================new=crt=pass===================================


exports.resetpassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    console.log('Received email:', email);
    console.log('Received newPassword:', newPassword);

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required.' });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await USER.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.password = newPassword;
  
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
