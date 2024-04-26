const USER = require("../models/user.register");
const UserLogin = require('../models/user.login');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const newUser = new USER({ fname, lname, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
// ===============================login======================================

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserLogin.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const userSession = {
    "_id": user._id,
    "email": user.email,
  };

  req.session.userId = userSession;

  res.status(200).json({ message: 'Login successful' });
}
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// ===================================user-data==============================

exports.userData = async (req, res) => {
  try {
    const users = await USER.find({isDeleted:false});

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
      const id =  req.params.id;

      const userDataUpdate = req.body; 
      const users = await USER.findOneAndUpdate({"_id": id }, { $set: userDataUpdate }, { new: true });

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

        const deletedUser = await USER.findOne({"_id" : id});

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        await USER.findOneAndUpdate({ "_id": deletedUser.id },{$set:{isDeleted:true}}); 
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};