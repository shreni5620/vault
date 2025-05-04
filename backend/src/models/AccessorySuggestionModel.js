const mongoose = require('mongoose');

const AccessorySuggestionSchema = new mongoose.Schema({
  carName: { type: String, required: true, unique: true },
  accessories: [
    {
      name: String,
      description: String,
      image: String, // optional: URL to accessory image
    }
  ]
});

module.exports = mongoose.model('AccessorySuggestion', AccessorySuggestionSchema);
