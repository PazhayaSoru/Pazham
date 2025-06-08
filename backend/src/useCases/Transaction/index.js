
const transactionRepo = require('../../infrastructure/DB/repositories/TransactionRepo');

class GetTransactionsByUserIdUseCase{
  static async execute(userId) {
    return transactionRepo.findByUserId(userId);
  }
}

class CreateTransactionUseCase{
  static async execute(data) {
    return await transactionRepo.create(data);
  }
}

class UpdateTransactionUseCase{
  static async execute(id, data) {
    return await transactionRepo.update(id, data);
  }
}

class GetTransactionByIdUseCase{
  static async execute(id) {
    const tx = await transactionRepo.findById(id);
    if (!tx) throw new Error('Transaction not found');
    return tx;
  }
}

class DeleteTransactionUseCase{
  static async execute(id) {
    return await transactionRepo.delete(id);
  }
}  


module.exports = 
{
  CreateTransactionUseCase,
  UpdateTransactionUseCase,
  DeleteTransactionUseCase,
  GetTransactionByIdUseCase,
  GetTransactionsByUserIdUseCase
}
