
// // // const TestDrive = require('../models/TestDriveModel');
// // // const nodemailer = require('nodemailer');

// // // // Get all test drive requests
// // // exports.getAllTestDrives = async (req, res) => {
// // //   const requests = await TestDrive.find();
// // //   res.json(requests);
// // // };

// // // exports.getAllTestDrives = async (req, res) => {
// // //   try {
// // //     const requests = await TestDrive.find();
// // //     const formatted = requests.map(r => ({
// // //       ...r._doc,
// // //       id: r._id.toString() // to ensure `id` is a string
// // //     }));
// // //     res.json(formatted);
// // //   } catch (err) {
// // //     console.error('Failed to fetch test drives:', err);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };



// // // // Update status of a test drive request
// // // exports.updateTestDriveStatus = async (req, res) => {
// // //   const { id, action } = req.params;

// // //   if (!['approved', 'rejected'].includes(action)) {
// // //     return res.status(400).json({ error: 'Invalid action' });
// // //   }

// // //   try {
// // //     const updated = await TestDrive.findByIdAndUpdate(
// // //       id,
// // //       { status: action },
// // //       { new: true }
// // //     );

// // //     if (!updated) {
// // //       return res.status(404).json({ error: 'Test drive request not found' });
// // //     }

// // //     res.json(updated);
// // //   } catch (err) {
// // //     console.error('Failed to update test drive status:', err);
// // //     res.status(500).json({ error: 'Server error', details: err.message });
// // //   }
// // // };


// // // // Create a new test drive request
// // // exports.createTestDriveRequest = async (req, res) => {
// // //   const { car, customer, date, contact } = req.body;
// // //   try {
// // //     const newRequest = new TestDrive({ car, customer, date, contact });
// // //     await newRequest.save();

// // //     // Send email to admin
// // //     try {
// // //       let transporter = nodemailer.createTransport({
// // //         service: 'gmail',
// // //         auth: {
// // //           user: 'youradminemail@gmail.com',
// // //           pass: 'yourapppassword'
// // //         }
// // //       });

// // //       await transporter.sendMail({
// // //         from: '"VehicleVault" <youradminemail@gmail.com>',
// // //         to: 'adminreceiveremail@gmail.com',
// // //         subject: 'New Test Drive Request',
// // //         text: `New test drive request from ${customer} for ${car} on ${date}. Contact: ${contact}`
// // //       });
// // //     } catch (err) {
// // //       console.error('Failed to send email:', err);
// // //     }

// // //     res.status(201).json(newRequest);
// // //   } catch (err) {
// // //     console.error('Failed to save test drive request:', err);
// // //     res.status(500).json({ error: 'Failed to save test drive request', details: err.message });
// // //   }
// // // };


// // // controllers/testDriveController.js
// // const TestDrive = require('../models/TestDriveModel');
// // const nodemailer = require('nodemailer');

// // // Get all test drive requests
// // exports.getAllTestDrives = async (req, res) => {
// //   try {
// //     const requests = await TestDrive.find();
// //     const formatted = requests.map(r => ({
// //       ...r._doc,
// //       id: r._id.toString()
// //     }));
// //     res.json(formatted);
// //   } catch (err) {
// //     console.error('Failed to fetch test drives:', err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// // // Update status of a test drive request
// // exports.updateTestDriveStatus = async (req, res) => {
// //   const { id, action } = req.params;

// //   if (!['approved', 'rejected'].includes(action)) {
// //     return res.status(400).json({ error: 'Invalid action' });
// //   }

// //   try {
// //     const updated = await TestDrive.findByIdAndUpdate(
// //       id,
// //       { status: action },
// //       { new: true }
// //     );

// //     if (!updated) {
// //       return res.status(404).json({ error: 'Test drive request not found' });
// //     }

// //     res.json(updated);
// //   } catch (err) {
// //     console.error('Failed to update test drive status:', err);
// //     res.status(500).json({ error: 'Server error', details: err.message });
// //   }
// // };

// // // Create a new test drive request
// // exports.createTestDriveRequest = async (req, res) => {
// //   const { car, customer, date, contact } = req.body;
// //   try {
// //     const newRequest = new TestDrive({ car, customer, date, contact });
// //     await newRequest.save();

// //     // Send email to admin
// //     try {
// //       let transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //           user: 'patelshrenij@gmail.com',
// //           pass: 'nelv bmxd kcke hutz'
// //         }
// //       });

// //       await transporter.sendMail({
// //         from: '"VehicleVault" <patelshrenij@gmail.com>',
// //         to: 'shreni016@gmail.com',
// //         subject: 'New Test Drive Request',
// //         text: `New test drive request from ${customer} for ${car} on ${date}. Contact: ${contact}`
// //       });
// //     } catch (err) {
// //       console.error('Failed to send email:', err);
// //     }

// //     res.status(201).json(newRequest);
// //   } catch (err) {
// //     console.error('Failed to save test drive request:', err);
// //     res.status(500).json({ error: 'Failed to save test drive request', details: err.message });
// //   }
// // };

// const TestDrive = require('../models/TestDriveModel');
// const nodemailer = require('nodemailer');

// // Get all test drive requests
// exports.getAllTestDrives = async (req, res) => {
//   try {
//     const requests = await TestDrive.find();
//     const formatted = requests.map(r => ({
//       ...r._doc,
//       id: r._id.toString()
//     }));
//     res.json(formatted);
//   } catch (err) {
//     console.error('Failed to fetch test drives:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Create a new test drive request
// exports.createTestDriveRequest = async (req, res) => {
//   const {
//     car,
//     customer,
//     email,
//     contact,
//     date,
//     preferredTime,
//     location,
//     message
//   } = req.body;

//   try {
//     const newRequest = new TestDrive({
//       car,
//       customer,
//       email,
//       contact,
//       date,
//       preferredTime,
//       location,
//       message
//     });

//     await newRequest.save();

//     // Send email to admin
//     try {
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'patelshrenij@gmail.com',
//           pass: 'nelv bmxd kcke hutz'
//         }
//       });

//       await transporter.sendMail({
//         from: '"VehicleVault" <patelshrenij@gmail.com>',
//         to: 'shreni016@gmail.com',
//         subject: 'New Test Drive Request',
//         text: `New test drive request:
// Customer: ${customer}
// Car: ${car}
// Email: ${email}
// Phone: ${contact}
// Date & Time: ${date}
// Location: ${location}
// Message: ${message || 'N/A'}`
//       });
//     } catch (err) {
//       console.error('Failed to send email:', err);
//     }

//     res.status(201).json(newRequest);
//   } catch (err) {
//     console.error('Failed to save test drive request:', err);
//     res.status(500).json({ error: 'Failed to save test drive request', details: err.message });
//   }
// };

// // Update test drive status
// exports.updateTestDriveStatus = async (req, res) => {
//   const { id, action } = req.params;

//   if (!['approved', 'rejected'].includes(action)) {
//     return res.status(400).json({ error: 'Invalid action' });
//   }

//   try {
//     const updated = await TestDrive.findByIdAndUpdate(
//       id,
//       { status: action },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: 'Test drive request not found' });
//     }

//     res.json(updated);
//   } catch (err) {
//     console.error('Failed to update test drive status:', err);
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// src/controllers/TestDriveController.js
const TestDrive = require('../models/TestDriveModel');
const nodemailer = require('nodemailer');

// Get all test drive requests
exports.getAllTestDrives = async (req, res) => {
  try {
    const requests = await TestDrive.find();
    const formatted = requests.map(r => ({
      id: r._id.toString(),
      car: r.car,
      customer: r.customer,
      email: r.email,
      contact: r.contact,
      date: r.date,
      preferredTime: r.preferredTime,
      location: r.location,
      message: r.message,
      status: r.status
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Failed to fetch test drives:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new test drive request
exports.createTestDriveRequest = async (req, res) => {
  const {
    car,
    customer,
    email,
    contact,
    date,
    preferredTime,
    location,
    message
  } = req.body;

  try {
    const newRequest = new TestDrive({
      car,
      customer,
      email,
      contact,
      date,
      preferredTime,
      location,
      message
    });

    await newRequest.save();

    // Send email to admin
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'patelshrenij@gmail.com',
          pass: 'nelv bmxd kcke hutz'
        }
      });

      await transporter.sendMail({
        from: 'VehicleVault <patelshrenij@gmail.com>',
        to: 'shreni016@gmail.com',
        subject: 'New Test Drive Request',
        text: `New test drive request:\nCustomer: ${customer}\nCar: ${car}\nEmail: ${email}\nPhone: ${contact}\nDate & Time: ${date} ${preferredTime}\nLocation: ${location}\nMessage: ${message || 'N/A'}`
      });
    } catch (err) {
      console.error('Failed to send email:', err);
    }

    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Failed to save test drive request:', err);
    res.status(500).json({ error: 'Failed to save test drive request', details: err.message });
  }
};

// Update test drive status
exports.updateTestDriveStatus = async (req, res) => {
  const { id, action } = req.params;

  if (!['approved', 'rejected'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    const updated = await TestDrive.findByIdAndUpdate(
      id,
      { status: action },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Test drive request not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Failed to update test drive status:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
