
const transactionRepo = require('../../infrastructure/DB/repositories/TransactionRepo');

class DeleteTransactionUseCase{
  static async execute(id) {
    return await transactionRepo.delete(id);
  }
}  

module.exports = DeleteTransactionUseCase;