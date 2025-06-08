
const dueRepository = require('../../infrastructure/DB/repositories/DueRepo');

class GetDuesByUserIdUseCase{
  static async execute(userId){
    return await dueRepository.findByUserId(userId);
  }
}

module.exports = GetDuesByUserIdUseCase;