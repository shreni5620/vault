const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Public routes
router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);

// Open route - no middleware
router.get('/all', AdminController.getAllAdmins);

module.exports = router;
