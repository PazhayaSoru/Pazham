const Transaction = require('../models/TransactionModel');
const budgetRepo = require('../repositories/BudgetRepo');
class TransactionRepository {
  async findByUserId(userId) {
    // Ensure the Transaction model has been imported correctly.
    return Transaction.findAll({
      where: { user_id: userId },
      attributes: ['id', 'amount', 'type','category','created_at'],
      // You can include associations if needed:
      // include: [{ model: User }, { model: Category }]
    });
  }

  async findById(id) {
    return Transaction.findByPk(id);
  }

  async create(transaction) {
    await budgetRepo.updateAmountSpent(
      transaction.user_id,
      transaction.category,
      transaction.amount
    );
    return Transaction.create(transaction);
  }

  async update(id, data) {
    await Transaction.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    return Transaction.destroy({ where: { id } });
  }


}

module.exports = new TransactionRepository();
