const mongoose = require('mongoose');

const vehicleViewSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  date: { type: Date, default: Date.now },
  // You can add userId or other fields if needed
});

module.exports = mongoose.model('VehicleView', vehicleViewSchema);
