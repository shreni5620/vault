// backend/src/routes/AdminRoutes.js
const express = require("express");
const router = express.Router();
const { login, createAdmin } = require("../controllers/AdminController");

router.post("/login", login);
router.post("/create", createAdmin);

// You can add more admin routes here
module.exports = router;
