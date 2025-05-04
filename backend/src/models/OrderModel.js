const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  // Add other fields as needed, e.g.:
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // date: { type: Date, default: Date.now },
  // status: String,
});

module.exports = mongoose.model('Order', orderSchema);
