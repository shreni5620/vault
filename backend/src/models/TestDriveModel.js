// // const mongoose = require('mongoose');

// // const TestDriveSchema = new mongoose.Schema({
// //   car: { type: String, required: true },
// //   customer: { type: String, required: true },
// //   date: { type: String, required: true },
// //   contact: { type: String, required: true },
// //   status: { type: String, default: 'pending' }
// // });

// // module.exports = mongoose.model('TestDrive', TestDriveSchema);
// const mongoose = require('mongoose');

// const TestDriveSchema = new mongoose.Schema({
//   car: { type: String, required: true },
//   customer: { type: String, required: true },
//   email: { type: String, required: true },
//   contact: { type: String, required: true },
//   date: { type: String, required: true }, // Combined date + time
//   preferredTime: { type: String },
//   location: { type: String, required: true },
//   message: { type: String },
//   status: { type: String, default: 'pending' }
// });

// module.exports = mongoose.model('TestDrive', TestDriveSchema);
// src/models/TestDriveModel.js
const mongoose = require('mongoose');

const TestDriveSchema = new mongoose.Schema({
  car: { type: String, required: true },
  customer: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: String, required: true },
  preferredTime: { type: String },
  location: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestDrive', TestDriveSchema);
