const { Op } = require('sequelize');
const moment = require('moment');

const Budget = require('../models/BudgetModel');
const Transaction = require('../models/TransactionModel');

class BudgetRepository {
  async findByUserId(userId) {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    try{
    return Budget.findAll({
      where: { user_id: userId ,
        created_at: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      },
      attributes: ['id', 'budget_amount','category','created_at','amount_spent'],
    })
  }catch(err){
    console.log(err);
  }};

  async findById(id) {
    return Budget.findByPk(id);
  }

  async create(budget) {
    try{
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    // Sum transactions for this user, category, and month
    const totalSpent = await Transaction.sum('amount', {
      where: {
        user_id: budget.user_id,
        category: budget.category,
        created_at: { [Op.between]: [startOfMonth, endOfMonth] }
      }
    });
    // Set initial amount_spent in the budget
    budget.amount_spent = totalSpent || 0;

    return Budget.create(budget);
  } catch (err) {
  console.error('🔥 Budget creation error:', err);
  throw err; // rethrow so your controller sees it too
}
}

  async update(id, data) {
    await Budget.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    return Budget.destroy({ where: { id } });
  }

  async updateAmountSpent(userId, category, amount) {

    console.log(`🔁 Updating amount_spent for ${userId}, ${category}, +${amount}`);
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    // Find the corresponding budget
    const budget = await Budget.findOne({
      where: {
        user_id: userId,
        category:category,
        created_at: { [Op.between]: [startOfMonth, endOfMonth] }
      }
    });

    if (budget) {
      // Update amount_spent
      console.log(` Found matching budget: ${budget.id}, amount_spent: ${budget.amount_spent}, adding: ${amount}`);
      await Budget.update(
        { amount_spent: parseFloat(budget.amount_spent) + parseFloat(amount) },
        { where: { id: budget.id } });
      return budget;
    }

    return null; // No matching budget found
  }
}

module.exports = new BudgetRepository();
