import mongoose from 'mongoose';

const schema = mongoose.Schema({
  description: { type: String, require: true },
  value: { type: Number, require: true },
  category: { type: String, require: true },
  year: { type: Number, require: true },
  month: { type: Number, require: true },
  day: { type: Number, require: true },
  yearMonth: { type: String, require: true },
  yearMonthDay: { type: String, require: true },
  type: { type: String, require: true },
});

const TransactionModel = mongoose.model('transaction', schema);

export { TransactionModel };
