
const transactionRepo = require('../../infrastructure/DB/repositories/TransactionRepo');

class UpdateTransactionUseCase{
  static async execute(id, data) {
    return await transactionRepo.update(id, data);
  }
}

module.exports = UpdateTransactionUseCase