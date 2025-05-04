const express = require('express');
const router = express.Router();
const { suggestAccessories } = require('../controllers/AccessorySuggestionController');

router.post('/suggest', suggestAccessories);

module.exports = router;
