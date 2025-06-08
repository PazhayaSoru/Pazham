const mongoose = require('mongoose');

const dueSchema = new mongoose.Schema({
  dues_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  closed: { type: Boolean, default: false },
  due_date: { type: Date, required: true }
}, { timestamps: false });

module.exports = mongoose.model('dues', dueSchema);
