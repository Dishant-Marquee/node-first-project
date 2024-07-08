const router = require("express").Router();
const authController = require('../../controllers/auth.controller');
const mailController = require('../../controllers/mail.controller');


router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/forgotpassword', mailController.forgotPassword);
router.post('/datafind', authController.findData);
router.put('/updatedata/:id',authController.dataUpdate);
router.delete('/deletedata/:id', authController.deleteData);
router.post('/verifyotp', authController.otpvalid);
router.post('/resendotp',authController.resendotp);
router.post('/resetpassword', authController.resetpassword);

module.exports = router;


router.get("/logout", async (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
});

module.exports = router;

