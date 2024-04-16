const USER = require("../models/user");

exports.register = async (req, res) => {
  try {
    const userLoginData = req.body;
    const user = await USER.create(userLoginData);

    res.status(201).json(user);
  } catch (error) {
    console.log(error,"Register-Error");
  }
};

// ===============================login======================================

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const user = await USER.create(data);

    res.status(201).json(user);
  } catch (error) {
    console.log(error,"Login-Error");
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