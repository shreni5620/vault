const express = require("express");
const router = express.Router();
const { login, createAdmin } = require("../controllers/AdminController");
const { getAllTestDrives } = require("../controllers/TestDriveController");

router.post("/login", login);
router.post("/create", createAdmin);

router.get("/comparison-stats", (req, res) => {
  res.json({
    totalComparisons: 156,
    todayComparisons: 12,
    popularCombinations: [
      { cars: ["BMW X5", "Mercedes GLC", "Audi Q7"], count: 28 },
      { cars: ["Tesla Model 3", "BMW X5"], count: 15 },
      { cars: ["Porsche 911", "Chevrolet Corvette"], count: 10 },
    ],
  });
});

// ✅ NEW ROUTE
router.get("/test-drives", getAllTestDrives);

router.get("/activity-logs", (req, res) => {
  // Example static response, replace with real data as needed
  res.json([
    { id: 1, action: "User logged in", timestamp: "2024-05-03T12:00:00Z" },
    { id: 2, action: "Vehicle added", timestamp: "2024-05-03T12:05:00Z" }
  ]);
});

module.exports = router;
