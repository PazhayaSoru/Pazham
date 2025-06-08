const transactionController = require('../controllers/TransactionController');
const express = require('express');


const router = express.Router();

router.use("/transactions",transactionController);


module.exports = router;


