function calculateMonthlyEMI(total_amount, annual_interest_rate, tenure_months) {
  const principal = total_amount;
  const monthlyRate = annual_interest_rate / 12 / 100;

  if (monthlyRate === 0) return principal / tenure_months;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure_months)) /
              (Math.pow(1 + monthlyRate, tenure_months) - 1);

  return parseFloat(emi.toFixed(2)); // rounded to 2 decimals
}

module.exports = calculateMonthlyEMI;