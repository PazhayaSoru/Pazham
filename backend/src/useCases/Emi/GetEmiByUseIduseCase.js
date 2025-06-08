
const emiRepository = require('../../infrastructure/DB/repositories/EmiRepo');

class GetEmiByUserIduseCase{
  static async execute(userId){
    return await emiRepository.findByUserId(userId);
  }
}

module.exports = GetEmiByUserIduseCase;