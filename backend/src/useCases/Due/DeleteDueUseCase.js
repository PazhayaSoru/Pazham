
const dueRepository = require('../../infrastructure/DB/repositories/DueRepo');


class DeleteDueUseCase{
  static async execute(duesId){
    return await dueRepository.deleteDue(duesId);
  }
}

module.exports = DeleteDueUseCase;