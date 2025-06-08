
const budgetRepo = require('../../infrastructure/DB/repositories/BudgetRepo');

class GetBudgetByIdUseCase{
  static async execute(id) {
    const bg = await budgetRepo.findById(id);
    if (!bg) throw new Error('Budget not found');
    return bg;
  }
}


module.exports = GetBudgetByIdUseCase;