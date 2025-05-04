const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WishlistController');

// Get wishlist items for a user
router.get('/', wishlistController.getWishlist);

// Add item to wishlist
router.post('/add', wishlistController.addToWishlist);

// Remove item from wishlist
router.delete('/remove/:vehicleId', wishlistController.removeFromWishlist);

router.get("/getWishListData", wishlistController.getWishListData)

module.exports = router;