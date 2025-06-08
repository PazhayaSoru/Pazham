
const dueRepository = require('../../infrastructure/DB/repositories/DueRepo');

class CreateDueUseCase{
static async execute(dueData){
  return await dueRepository.createDue(dueData);
}
}

module.exports = CreateDueUseCase;