// backend/src/controllers/AdminController.js
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  try {
    const admin = await Admin.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });
    console.log("Admin found:", admin);

    if (!admin) {
      return res.json({ error: true, message: "Invalid email" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ 
      token,
      name: admin.name,
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await Admin.create({ name, email, password });
    res.json({ success: true, message: "Admin created!" });
  } catch (err) {
    console.error("Admin create error:", err);
    res.status(500).json({ success: false, message: "Error creating admin", error: err });
  }
};

module.exports = { login, createAdmin };
