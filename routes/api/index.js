const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/datatable',require('./dataTable'));
// router.use('/auth',require('./auth'))

module.exports = router;
