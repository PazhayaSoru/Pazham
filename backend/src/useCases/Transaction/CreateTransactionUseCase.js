
const transactionRepo = require('../../infrastructure/DB/repositories/TransactionRepo');

class CreateTransactionUseCase{
  static async execute(data) {
    return await transactionRepo.create(data);
  }
}

module.exports = CreateTransactionUseCase;