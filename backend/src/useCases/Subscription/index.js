const subRepository = require('../../infrastructure/DB/repositories/SubscriptionRepo');

class CreateSubUseCase{
  static async execute(subData){
    return await subRepository.createSub(subData);
  }
}

class UpdateSubUseCase{
  static async execute(subsId, updateData){
    return await subRepository.updateSub(subsId, updateData);
  }
}

class DeleteSubUseCase{
  static async execute(subsId){
    return await subRepository.deleteSub(subsId);
  }
}

class getSubsByUserIdUseCase{
  static async execute(userId){
    return await subRepository.findByUserId(userId);
  }
}



module.exports = {
  CreateSubUseCase,
  UpdateSubUseCase,
  DeleteSubUseCase,
  getSubsByUserIdUseCase,
};
