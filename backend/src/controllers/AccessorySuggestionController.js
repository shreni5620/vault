const AccessorySuggestion = require('../models/AccessorySuggestionModel');

// This is a simple example. You can make it smarter!
exports.suggestAccessories = async (req, res) => {
  try {
    const { comparedCars } = req.body; // array of car names

    // Example: Find popular accessories for these cars
    const suggestions = await AccessorySuggestion.aggregate([
      { $match: { carModel: { $in: comparedCars } } },
      { $group: { _id: "$accessoryName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ suggestions: suggestions.map(s => s._id) });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to suggest accessories" });
  }
};
