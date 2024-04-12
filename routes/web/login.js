const router = require("express").Router();
// const express = require('express');
// const router = express.Router();
// const loginController = require('../../controllers/auth.controller');

router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
