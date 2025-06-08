
const dueRepository = require('../../infrastructure/DB/repositories/DueRepo');

class UpdateDueUseCase{
  static async execute(duesId, updateData){
    return await dueRepository.updateDue(duesId, updateData);
}
}

module.exports = UpdateDueUseCase;