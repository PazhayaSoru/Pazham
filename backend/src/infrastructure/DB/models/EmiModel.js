const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emiSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  title: { type: String, required: true },
  total_amount: { type: Number, required: true },
  interest_rate: { type: Number, required: true },
  monthly_installment: { type: Number, required: true },
  tenure_months: { type: Number, required: true },
  start_date: { type: Date, required: true },
  paid_installments: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Emi = mongoose.model('emi', emiSchema);
module.exports = Emi;
