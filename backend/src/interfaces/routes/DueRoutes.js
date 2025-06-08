const dueController = require('../controllers/DueController');
const express = require('express');


const router = express.Router();

router.use("/dues",dueController);


module.exports = router;