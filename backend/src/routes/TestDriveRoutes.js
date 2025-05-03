const express = require('express');
const router = express.Router();
const { getAllTestDrives, createTestDriveRequest } = require('../controllers/TestDriveController');

// GET all test drive requests
router.get('/', getAllTestDrives);

// POST a new test drive request
router.post('/', createTestDriveRequest);

module.exports = router;
