const Comparison = require('../models/ComparisonModel');

// Get Top Compared Cars
exports.getTopComparedCars = async (req, res) => {
  try {
    const result = await Comparison.aggregate([
      { $group: { _id: "$carModel", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json({ labels: result.map(r => r._id), data: result.map(r => r.count) });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch top compared cars" });
  }
};
