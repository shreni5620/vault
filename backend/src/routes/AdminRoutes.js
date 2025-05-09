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
const Vehicle = require('../models/CarModel');
const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const TestDrive = require('../models/TestDriveModel'); // Adjust path as needed
const AccessorySuggestion = require('../models/AccessorySuggestionModel'); // If you have one
const Comparison = require('../models/ComparisonModel');
const { getTopComparedCars } = require('../controllers/ComparisonController');

// Auth Routes
router.post("/login", login);
router.post("/create", createAdmin);
router.post("/test-drives",getAllTestDrives);

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

// Add this route
router.get('/monthly-listings', async (req, res) => {
  try {
    const result = await Vehicle.aggregate([
      {
        $group: {
          _id: { $month: "$listingDate" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = Array(12).fill(0);
    result.forEach(r => { data[r._id - 1] = r.count; });
    res.json({ labels, data });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch monthly listings" });
  }
});

router.get('/overview', async (req, res) => {
  try {
    // Total Revenue (real data)
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Baaki stats
    const totalVehicles = await Vehicle.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const pendingApprovals = await TestDrive.countDocuments({ status: 'pending' });

    res.json({
      totalVehicles,
      activeUsers,
      totalRevenue,
      pendingApprovals
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch overview" });
  }
});

// Example: Vehicle Views per Month
router.get('/analytics/vehicle-views', async (req, res) => {
  // Suppose you have a VehicleView model with { carId, date }
  const VehicleView = require('../models/VehicleViewModel');
  const result = await VehicleView.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = Array(12).fill(0);
  result.forEach(r => { data[r._id - 1] = r.count; });
  res.json({ labels, data });
});

// Example: Leads per Month (from test drives or contact requests)
router.get('/analytics/leads', async (req, res) => {
  const TestDrive = require('../models/TestDriveModel');
  const result = await TestDrive.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = Array(12).fill(0);
  result.forEach(r => { data[r._id - 1] = r.count; });
  res.json({ labels, data });
});

// Top Vehicle Types
router.get('/analytics/top-vehicle-types', async (req, res) => {
  const result = await Vehicle.aggregate([
    {
      $group: {
        _id: "$type", // Change "type" to your actual field if needed
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  res.json(result);
});

// User Acquisition
router.get('/analytics/user-acquisition', async (req, res) => {
  const User = require('../models/UserModel');
  const result = await User.aggregate([
    {
      $group: {
        _id: "$acquisitionSource", // Change to your actual field
        count: { $sum: 1 }
      }
    }
  ]);
  res.json(result);
});

// Regional Performance
router.get('/analytics/region-performance', async (req, res) => {
  const result = await Vehicle.aggregate([
    {
      $group: {
        _id: "$region", // Change "region" to your actual field
        listings: { $sum: 1 }
      }
    },
    { $sort: { listings: -1 } }
  ]);
  res.json(result);
});

router.post('/notification', async (req, res) => {
  // Your notification logic here
  res.json({ success: true });
});

router.get('/stats', async (req, res) => {
  try {
    const User = require('../models/UserModel');
    const Vehicle = require('../models/CarModel');
    const TestDrive = require('../models/TestDriveModel');
    const VehicleView = require('../models/VehicleViewModel');
    const Wishlist = require('../models/WishlistModel');

    const users = await User.countDocuments();
    const vehicles = await Vehicle.countDocuments();
    const testDrives = await TestDrive.countDocuments();
    const views = await VehicleView.countDocuments();
    const wishlist = await Wishlist.countDocuments();

    res.json({ users, vehicles, testDrives, views, wishlist });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch stats" });
  }
});

// Monthly User Registrations
router.get('/analytics/monthly-user-registrations', async (req, res) => {
  const result = await User.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { "_id": 1 } }
  ]);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = Array(12).fill(0);
  result.forEach(r => { data[r._id - 1] = r.count; });
  res.json({ labels, data });
});

// Monthly Car Posts by Admin
router.get('/analytics/monthly-car-posts', async (req, res) => {
  const result = await Vehicle.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { "_id": 1 } }
  ]);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = Array(12).fill(0);
  result.forEach(r => { data[r._id - 1] = r.count; });
  res.json({ labels, data });
});

// Top Compared Cars
router.get('/analytics/top-compared-cars', getTopComparedCars);

// Accessory Suggestions by Popularity
router.get('/analytics/accessory-suggestions', async (req, res) => {
  try {
    const result = await AccessorySuggestion.aggregate([
      { $unwind: "$accessories" },
      { $group: { _id: "$accessories.name", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const labels = result.map(r => r._id);
    const data = result.map(r => r.count);
    res.json({ labels, data });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch accessory suggestions analytics" });
  }
});

// Test Drive Requests Over Time
router.get('/analytics/test-drive-requests', async (req, res) => {
  const result = await TestDrive.aggregate([
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { "_id": 1 } }
  ]);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = Array(12).fill(0);
  result.forEach(r => { data[r._id - 1] = r.count; });
  res.json({ labels, data });
});

module.exports = router;
