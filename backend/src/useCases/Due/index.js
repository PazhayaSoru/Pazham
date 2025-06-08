const dueRepository = require('../../infrastructure/DB/repositories/DueRepo');


class CreateDueUseCase{
static async execute(dueData){
  return await dueRepository.createDue(dueData);
}
}

class UpdateDueUseCase{
  static async execute(duesId, updateData){
    return await dueRepository.updateDue(duesId, updateData);
}
}

class DeleteDueUseCase{
  static async execute(duesId){
    return await dueRepository.deleteDue(duesId);
  }
}

class GetDuesByUserIdUseCase{
  static async execute(userId){
    return await dueRepository.findByUserId(userId);
  }
}



module.exports = {
  CreateDueUseCase,
  UpdateDueUseCase,
  DeleteDueUseCase,
  GetDuesByUserIdUseCase,
};
