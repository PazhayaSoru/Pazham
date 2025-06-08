
const transactionRepo = require('../../infrastructure/DB/repositories/TransactionRepo');

class GetTransactionsByUserIdUseCase{
  static async execute(userId) {
    return transactionRepo.findByUserId(userId);
  }
}

module.exports = GetTransactionsByUserIdUseCase;