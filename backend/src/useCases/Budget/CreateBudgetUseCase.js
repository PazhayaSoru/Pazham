
const budgetRepo = require('../../infrastructure/DB/repositories/BudgetRepo');

class CreateBudgetUseCase{
  static async execute(data) {
    return await budgetRepo.create(data);
  }
}

module.exports = CreateBudgetUseCase;