
const emiRepository = require('../../infrastructure/DB/repositories/EmiRepo');
const calculateMonthlyEMI = require('C:/Users/thede/OneDrive/Desktop/WT Lab/WT miniproject/backend/utils/emiCalc');


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

module.exports = UpdateEmiUseCase;