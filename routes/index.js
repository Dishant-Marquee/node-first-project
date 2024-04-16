const express = require("express");
const router = express.Router();

router.use('/', require('./web/index'));

router.use('/api', require('./api/index'));

module.exports = router;
