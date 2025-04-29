import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = "user123"; // Replace with actual user ID from authentication

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.WISHLIST}?userId=${userId}`);
      if (!response.data.error) {
        setWishlistItems(response.data.items.map(item => item.carData));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async (carData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.WISHLIST_ADD, {
        userId,
        vehicleId: carData.id,
        carData
      });
      
      if (!response.data.error) {
        setWishlistItems(prev => [...prev, carData]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (vehicleId) => {
    try {
      const response = await axios.delete(`${API_ENDPOINTS.WISHLIST_REMOVE}/${vehicleId}`, {
        data: { userId }
      });
      
      if (!response.data.error) {
        setWishlistItems(prev => prev.filter(item => item.id !== vehicleId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (carId) => {
    return wishlistItems.some(item => item.id === carId);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist,
      isInWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}