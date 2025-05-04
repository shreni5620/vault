const express = require('express');
const router = express.Router();
const { getTopComparedCars } = require('../controllers/ComparisonController');
const Comparison = require('../models/ComparisonModel');

router.get('/top-compared-cars', getTopComparedCars);

router.post('/', async (req, res) => {
  try {
    const { comparedCars } = req.body;
    const comparison = new Comparison({ comparedCars });
    await comparison.save();
    res.status(201).json({ success: true, comparison });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to save comparison" });
  }
});

router.get('/', async (req, res) => {
  try {
    const comparisons = await Comparison.find().sort({ date: -1 });
    res.json(comparisons);
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch comparisons" });
  }
});

module.exports = router;
