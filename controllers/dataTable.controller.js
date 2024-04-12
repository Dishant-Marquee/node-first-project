

const User = require('../models/user');

exports.dataTable = async (req, res) => {
  try {
    const users = await User.find();


    const data = users.map(user => ({
      _id      : user._id,
      fname    : user.fname,
      lname    : user.lname,
      email    : user.email,
      password : user.password,
      // Add more fields as needed
    }));

    // Send the data as JSON response
    res.status(200).json({
      data: data // The array of objects representing the rows of the table
    });
  } catch (error) {
    console.log(error, "Data-Not-Found");
    res.status(500).json({ error: "Data retrieval failed" });
  }}