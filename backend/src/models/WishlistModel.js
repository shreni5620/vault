const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true 
  },
  vehicleId: {
    type: String,
    required: true 
  },
  carData: {
    type: Object,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can't add the same car twice
wishlistSchema.index({ userId: 1, vehicleId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;