
const budgetRepo = require('../../infrastructure/DB/repositories/BudgetRepo');

class DeleteBudgetUseCase{
  static async execute(id) {
    return await budgetRepo.delete(id);
  }
}


module.exports = DeleteBudgetUseCase;