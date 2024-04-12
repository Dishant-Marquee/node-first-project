const express = require("express");
const router = express.Router();

router.use('/', require('./web/index')); // Assuming login route handler is in a file named login.js

router.use('/api', require('./api/index'));// api  routes handled by the api folder

module.exports = router;
