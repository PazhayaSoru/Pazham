
const budgetRepo = require('../../infrastructure/DB/repositories/BudgetRepo');

class GetUserByIdUseCase{
  static async execute(userId) {
    return budgetRepo.findByUserId(userId);
  }
}

class CreateBudgetUseCase{
  static async execute(data) {
    return await budgetRepo.create(data);
  }
}

class UpdateBudgetUseCase{
  static async execute(id, data) {
    return await budgetRepo.update(id, data);
  }
}

class GetBudgetByIdUseCase{
  static async execute(id) {
    const bg = await budgetRepo.findById(id);
    if (!bg) throw new Error('Budget not found');
    return bg;
  }
}

class DeleteBudgetUseCase{
  static async execute(id) {
    return await budgetRepo.delete(id);
  }
}  


module.exports = {
  GetUserByIdUseCase,
  CreateBudgetUseCase,
  UpdateBudgetUseCase,
  DeleteBudgetUseCase,
  GetBudgetByIdUseCase
}