const express = require('express');
const router = express.Router();
const { getAllTestDrives, createTestDriveRequest, updateTestDriveStatus } = require('../controllers/TestDriveController');

// GET all test drive requests
router.get('/', getAllTestDrives);

// POST a new test drive request
router.post('/', createTestDriveRequest);

// PATCH to update test drive status
router.patch('/:id/:action', updateTestDriveStatus);

module.exports = router;
