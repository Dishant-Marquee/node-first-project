const router = require('express').Router();
const dataController = require('../../controllers/dataTable.controller');

router.post('/datafind', dataController.dataTable);

module.exports = router;