const Wishlist = require('../models/WishlistModel');

const getWishlist = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({
                error: true,
                message: "User ID is required"
            });
        }

        const wishlistItems = await Wishlist.find({ userId });
        res.status(200).json({
            error: false,
            items: wishlistItems
        });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({
            error: true,
            message: "Error fetching wishlist items"
        });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const { userId, vehicleId, carData } = req.body;
        console.log("BODY RECEIVED:", req.body);
        
        if (!userId || !vehicleId || !carData) {
            return res.status(400).json({
                error: true,
                message: "Missing required fields"
            });
        }

        // Check if item already exists
        const existingItem = await Wishlist.findOne({ userId, vehicleId });
        if (existingItem) {
            return res.status(400).json({
                error: true,
                message: "Item already in wishlist"
            });
        }

        const wishlistItem = new Wishlist({
            userId,
            vehicleId,
            carData,
            dateAdded: new Date()
        });

        await wishlistItem.save();

        res.status(201).json({
            error: false,
            message: "Item added to wishlist",
            item: wishlistItem
        });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({
            error: true,
            message: "Error adding item to wishlist"
        });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { userId } = req.body;

        if (!userId || !vehicleId) {
            return res.status(400).json({
                error: true,
                message: "User ID and vehicle ID are required"
            });
        }

        const result = await Wishlist.findOneAndDelete({ userId, vehicleId });
        
        if (!result) {
            return res.status(404).json({
                error: true,
                message: "Item not found in wishlist"
            });
        }

        res.status(200).json({
            error: false,
            message: "Item removed from wishlist"
        });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({
            error: true,
            message: "Error removing item from wishlist"
        });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};