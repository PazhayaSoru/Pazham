
const transactionRepo = require('../../infrastructure/DB/repositories/TransactionRepo');

class GetTransactionByIdUseCase{
  static async execute(id) {
    const tx = await transactionRepo.findById(id);
    if (!tx) throw new Error('Transaction not found');
    return tx;
  }
}

module.exports = GetTransactionByIdUseCase;