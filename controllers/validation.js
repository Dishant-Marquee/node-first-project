const USERMODEL = require("../models/user.login");

const authMiddleware = async (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      const userData = await USERMODEL.findOne({ "_id": req.session.userId._id, "email": req.session.userId.email });
      if (!userData) {
        req.session.destroy();     
        return res.render("login");
      }
      req.session.userId = userData;
      next();
    } else {
      req.session.destroy();
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authMiddleware;
