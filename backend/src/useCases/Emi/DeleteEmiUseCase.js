
const emiRepository = require('../../infrastructure/DB/repositories/EmiRepo');

class DeleteEmiUseCase{
  static async execute(EmisId){
    return await emiRepository.deleteEmi(EmisId);
  }
}

module.exports = DeleteEmiUseCase;