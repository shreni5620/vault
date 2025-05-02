const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailUtil = require('../utils/mailUtil');

// Signup/Register
const userSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, contactNum, status, password, confirmPassword, role } = req.body;

        if (!firstName || !lastName || !email || !gender || !contactNum || !status || !password || !confirmPassword) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: true, message: "Passwords do not match" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            gender,
            contactNum,
            status,
            password: hashedPassword,
            role: role || 'Customer'
        });
        await newUser.save();
        return res.status(201).json({ error: false, message: "Signup successful" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server error", details: error.message });
    }
};

// Login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: true, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: true, message: "Invalid email" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.json({ error: true, message: "Invalid password" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: '1h' });
    return res.status(200).json({
        error: false,
        message: "Login successful",
        name: user.firstName + " " + user.lastName,
        email: user.email,
        token: token
    });
};

// Get all users (for admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password
        res.status(200).json({ error: false, users });
    } catch (error) {
        res.status(500).json({ error: true, message: "Error fetching users" });
    }
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const foundUser = await User.findOne({ email: email });
  
    if (foundUser) {
      const token = jwt.sign(foundUser.toObject(), secret);
      console.log(token);
      const url = `http://localhost:5173/resetpassword/${token}`;
      const mailContent = `<html>
                            <a href ="${url}">rest password</a>
                            </html>`;
      //email...
      await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
      res.json({
        message: "reset password link sent to mail.",
      });
    } else {
      res.json({
        message: "user not found register first..",
      });
    }
};

const resetpassword = async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPasseord = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(userFromToken._id, {
        password: hashedPasseord,
    });
    res.json({
        message: "password updated successfully..",
    });
};

const contactSeller = async (req, res) => {
    const { name, email, phone, message, preferredContact } = req.body;
    try {
        await mailUtil.sendingMail(
            'shreni016@gmail.com', // <-- yahan admin ka email daalein
            'New Contact Seller Request',
            `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
             <p><strong>Message:</strong> ${message}</p>`
        );
        res.json({ success: true, message: "Your message has been sent to the admin." });
    } catch (err) {
        console.error("Contact Seller email send failed:", err);
        res.status(500).json({ success: false, message: "Failed to send message." });
    }
};

// Block or Unblock user
const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // status: "active" or "blocked"
        const user = await User.findByIdAndUpdate(id, { status }, { new: true });
        if (!user) return res.status(404).json({ error: true, message: "User not found" });
        res.json({ error: false, message: `User ${status === "blocked" ? "blocked" : "unblocked"} successfully`, user });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ error: true, message: "User not found" });
        res.json({ error: false, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
};

module.exports = {
    userSignup,
    userLogin,
    getAllUsers,
    forgotPassword,
    resetpassword,
    contactSeller,
    blockUser,
    deleteUser,
};