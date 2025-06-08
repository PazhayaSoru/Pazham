const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  service_name: {type: String, required:true},
  amount: { type: Number, required: true },
  frequency:{type: String, required:true},
  start_date: { type: Date, required: true },
}, { timestamps: false });

module.exports = mongoose.model('subscriptions', subscriptionSchema);