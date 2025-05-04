const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
  comparedCars: [String], // Save all compared cars as an array
  date: { type: Date, default: Date.now }
  // Add other fields as needed
});

module.exports = mongoose.model('Comparison', comparisonSchema);
