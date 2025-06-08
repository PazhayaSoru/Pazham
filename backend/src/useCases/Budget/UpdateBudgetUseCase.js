
const budgetRepo = require('../../infrastructure/DB/repositories/BudgetRepo');

class UpdateBudgetUseCase{
  static async execute(id, data) {
    return await budgetRepo.update(id, data);
  }
}

module.exports = UpdateBudgetUseCase;