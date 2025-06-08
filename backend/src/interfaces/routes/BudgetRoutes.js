const budgetController = require('../controllers/BudgetController');
const express = require('express');


const router = express.Router();

router.use("/budgets",budgetController);


module.exports = router;
