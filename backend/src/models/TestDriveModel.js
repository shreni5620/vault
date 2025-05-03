const mongoose = require('mongoose');

const TestDriveSchema = new mongoose.Schema({
  car: { type: String, required: true },
  customer: { type: String, required: true },
  date: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('TestDrive', TestDriveSchema);
