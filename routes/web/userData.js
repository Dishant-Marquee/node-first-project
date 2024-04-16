const router = require("express").Router();

router.get("/", (req, res) => {res.render("userData")});

module.exports = router;