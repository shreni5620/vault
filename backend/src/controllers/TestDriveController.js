const TestDrive = require('../models/TestDriveModel');
const nodemailer = require('nodemailer');

// Get all test drive requests
exports.getAllTestDrives = async (req, res) => {
  const requests = await TestDrive.find();
  res.json(requests);
};

// Create a new test drive request
exports.createTestDriveRequest = async (req, res) => {
  const { car, customer, date, contact } = req.body;
  try {
    const newRequest = new TestDrive({ car, customer, date, contact });
    await newRequest.save();

    // Send email to admin
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youradminemail@gmail.com',
          pass: 'yourapppassword'
        }
      });

      await transporter.sendMail({
        from: '"VehicleVault" <youradminemail@gmail.com>',
        to: 'adminreceiveremail@gmail.com',
        subject: 'New Test Drive Request',
        text: `New test drive request from ${customer} for ${car} on ${date}. Contact: ${contact}`
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
