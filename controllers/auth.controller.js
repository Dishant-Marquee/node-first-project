const USER = require("../models/user");

exports.register = async (req, res) => {
  try {
    // const data = req.body;
    // console.log(data);
    const {fname, lname, email, password} = req.body;
    // if (!fname || !lname || !email || !password) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    //   };
    const user = await USER.create({ fname, lname, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error, "Register-Error");
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;
    // if (data) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    //   };
    const user = await USER.create(data);
    res.status(201).json(user);
  } catch (error) {
    console.log(error,"Login-Error");
  }
};
