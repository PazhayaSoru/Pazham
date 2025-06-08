const emiController = require('../controllers/EmiController');
const express = require('express');


const router = express.Router();

router.use("/emi",emiController);


module.exports = router;