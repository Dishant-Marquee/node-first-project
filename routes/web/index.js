const express = require('express');
const router = express.Router();
const LOGIN = require('./login');
const REGISTER = require('./register');
const DATATABLE = require( './userData');

router.use('/userdata', DATATABLE); 
router.use('/login', LOGIN);
router.use('/register', REGISTER);

module.exports = router;
