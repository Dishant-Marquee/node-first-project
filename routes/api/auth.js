const router = require("express").Router();
const authController = require('../../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/datafind', authController.userData);
router.put('/updatedata/:id',authController.dataUpdate);
router.delete('/deletedata/:id', authController.deleteData);

module.exports = router;

