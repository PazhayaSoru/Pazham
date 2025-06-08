
const budgetRepo = require('../../infrastructure/DB/repositories/BudgetRepo');

class GetBudgetByIdUseCase{
  static async execute(userId) {
    return budgetRepo.findByUserId(userId);
  }
}

module.exports = GetBudgetByIdUseCase;