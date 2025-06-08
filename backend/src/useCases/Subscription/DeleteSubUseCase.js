
const subRepository = require('../../infrastructure/DB/repositories/SubscriptionRepo');


class DeleteSubUseCase{
  static async execute(subsId){
    return await subRepository.deleteSub(subsId);
  }
}

module.exports = DeleteSubUseCase;