const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middelware/validation.middelware');
const LOGIN = require('./login');
const REGISTER = require('./register');

router.get('/',authMiddleware,(req, res) => {
    res.render('userData');
  });
router.use('/login', LOGIN);
router.use('/register', REGISTER);

module.exports = router;
