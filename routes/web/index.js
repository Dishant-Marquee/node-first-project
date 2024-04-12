const express = require('express');
const router = express.Router();
const LOGIN = require('./login');
const REGISTER = require('./register');
const DATATABLE = require( '../web/dataTable');

router.use('/datatable', DATATABLE); 
router.use('/login', LOGIN);
router.use('/register', REGISTER);
// router.use('/datatable', require( '../web/dataTable'));

module.exports = router;
