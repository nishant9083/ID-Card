const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account_from: {
    type: String,
    required: true,
  },
  account_to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transaction_type: {
    type: String,
    required: true,
  },
  transaction_date: {
    type: Date,
    required: true,
  },
  record_date: {
    type: Date,
    default: Date.now,
  },
  transaction_mode: {
    type: String,
    required: true,
  },
  transaction_ref_no: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
