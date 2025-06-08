
const subRepository = require('../../infrastructure/DB/repositories/SubscriptionRepo');


class UpdateSubUseCase{
  static async execute(subsId, updateData){
    return await subRepository.updateSub(subsId, updateData);
  }
}

module.exports = UpdateSubUseCase;