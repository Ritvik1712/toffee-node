// schema for transactions

const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  username: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
