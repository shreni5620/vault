// const express = require("express");
// const router = express.Router();
// const { login, createAdmin } = require("../controllers/AdminController");
// const { getAllTestDrives } = require("../controllers/TestDriveController");

// router.post("/login", login);
// router.post("/create", createAdmin);

// router.get("/comparison-stats", (req, res) => {
//   res.json({
//     totalComparisons: 156,
//     todayComparisons: 12,
//     popularCombinations: [
//       { cars: ["BMW X5", "Mercedes GLC", "Audi Q7"], count: 28 },
//       { cars: ["Tesla Model 3", "BMW X5"], count: 15 },
//       { cars: ["Porsche 911", "Chevrolet Corvette"], count: 10 },
//     ],
//   });
// });

// // ✅ NEW ROUTE
// router.get("/test-drives", getAllTestDrives);

// router.get("/activity-logs", (req, res) => {
//   // Example static response, replace with real data as needed
//   res.json([
//     { id: 1, action: "User logged in", timestamp: "2024-05-03T12:00:00Z" },
//     { id: 2, action: "Vehicle added", timestamp: "2024-05-03T12:05:00Z" }
//   ]);
// });

// module.exports = router;
// src/routes/AdminRoutes.js
const express = require("express");
const router = express.Router();

const { login, createAdmin } = require("../controllers/AdminController");
const { getAllTestDrives } = require("../controllers/TestDriveController");

// Auth Routes
router.post("/login", login);
router.post("/create", createAdmin);

// Admin Stats
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

// Listings/Vehicle Stats (if needed for a different widget)
router.get("/listing-stats", (req, res) => {
  const stats = {
    totalListings: 120,
    activeListings: 98,
    expiredListings: 22,
    comparisonsToday: 15,
  };
  res.json(stats);
});

// Test Drive Stats
router.get("/test-drives", getAllTestDrives);

// Activity Logs (mock)
router.get("/activity-logs", (req, res) => {
  res.json([
    { id: 1, action: "User logged in", timestamp: "2024-05-03T12:00:00Z" },
    { id: 2, action: "Vehicle added", timestamp: "2024-05-03T12:05:00Z" }
  ]);
});

module.exports = router;
