
const subRepository = require('../../infrastructure/DB/repositories/SubscriptionRepo');

class CreateSubUseCase{
  static async execute(subData){
    return await subRepository.createSub(subData);
  }
}

module.exports = CreateSubUseCase;