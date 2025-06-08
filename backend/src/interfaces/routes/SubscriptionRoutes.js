const subController = require('../controllers/SubController');
const express = require('express');


const router = express.Router();

router.use("/subs",subController);


module.exports = router;