const express = require("express");
const router = express.Router();

router.use('/', require('./web/index.web.routes'));

router.use('/api', require('./api/index.api.routes'));

module.exports = router;
