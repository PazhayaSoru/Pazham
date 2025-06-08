
const subRepository = require('../../infrastructure/DB/repositories/SubscriptionRepo');


class getSubsByUserIdUseCase{
  static async execute(userId){
    return await subRepository.findByUserId(userId);
  }
}

module.exports = getSubsByUserIdUseCase;