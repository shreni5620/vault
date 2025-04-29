import React from 'react';
import { Heart, Share2, Car, Star, AlertCircle, Clock3, Trash2 } from 'lucide-react';
import { useWishlist } from "./WishlistContext";
import "../assets/Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this ${item.name} priced at $${item.price}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser');
    }
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>
          <Heart className="heart-icon" /> My Wishlist
        </h1>
        <p>{wishlistItems.length} vehicles saved</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistItems.map((car) => (
            <div key={car.id} className="wishlist-card">
              <div className="car-image">
                <img src={car.image} alt={car.name} />
                <div className="card-actions">
                  <button 
                    className="action-btn share"
                    onClick={() => handleShare(car)}
                    aria-label="Share vehicle"
                  >
                    <Share2 size={20} />
                  </button>
                  <button 
                    className="action-btn remove"
                    onClick={() => removeFromWishlist(car.id)}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="car-info">
                <h2>{car.name}</h2>
                <p className="price">${car.price.toLocaleString()}</p>
                <div className="specs">
                  <div>
                    <Clock3 className="icon" />
                    <span>{car.year}</span>
                  </div>
                  <div>
                    <AlertCircle className="icon" />
                    <span>{car.mileage}</span>
                  </div>
                  <div>
                    <Star className="icon" />
                    <span>{car.fuel}</span>
                  </div>
                </div>
                <div className="date-added">
                  Added on {new Date(car.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <Car size={48} />
          <h2>Your wishlist is empty</h2>
          <p>Start adding cars to your wishlist to keep track of your favorite vehicles!</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;