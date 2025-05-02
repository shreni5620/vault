const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/signup', userController.userSignup); // Signup
router.post('/login', userController.userLogin);   // Login
router.get('/', userController.getAllUsers);       // Get all users (for admin)
router.post("/user/forgotpassword",userController.forgotPassword)
router.post("/user/resetpassword",userController.resetpassword)
router.post('/contact-seller', userController.contactSeller)
router.patch('/:id/block', userController.blockUser);   // Block/Unblock user
router.delete('/:id', userController.deleteUser);       // Delete user

module.exports = router;