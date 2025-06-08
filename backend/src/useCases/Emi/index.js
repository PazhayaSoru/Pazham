const emiRepository = require('../../infrastructure/DB/repositories/EmiRepo');
const calculateMonthlyEMI = require('C:/Users/thede/OneDrive/Desktop/WT Lab/WT miniproject/backend/utils/emiCalc');

class CreateEmiUseCase{
  static async execute(Data){
    const monthly_installment = calculateMonthlyEMI(
      Data.total_amount,
      Data.interest_rate,
      Data.tenure_months
    );
    return await emiRepository.createEmi({...Data,monthly_installment});
  }
}

class UpdateEmiUseCase{
  static async execute(EmisId, Data){
    const monthly_installment = calculateMonthlyEMI(
      Data.total_amount,
      Data.interest_rate,
      Data.tenure_months
    );
    return await emiRepository.updateEmi(EmisId, {...Data,monthly_installment});
  }
}

class DeleteEmiUseCase{
  static async execute(EmisId){
    return await emiRepository.deleteEmi(EmisId);
  }
}


class GetEmiByUserIduseCase{
  static async execute(userId){
    return await emiRepository.findByUserId(userId);
  }
}


module.exports = {
  CreateEmiUseCase,
  UpdateEmiUseCase,
  DeleteEmiUseCase,
  GetEmiByUserIduseCase,
};
