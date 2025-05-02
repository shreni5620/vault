// backend/src/routes/AdminRoutes.js
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/AdminController");

router.post("/login", login);

// You can add more admin routes here
module.exports = router;
