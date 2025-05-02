import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import "../assets/Navbar.css";
import NotificationCenter from "../Page/NotificationCenter";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    checkLogin();
    window.addEventListener('loginStatusChanged', checkLogin);
    return () => window.removeEventListener('loginStatusChanged', checkLogin);
  }, []);

  const handleSignOut = () => {
    // Clear login state and token
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to home page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/" className="logo">Vehicle Vault</Link>
        <ul className="nav-links">
          <li><Link to="/newcars">New Cars</Link></li>
          <li><Link to="/usedcars">Used Cars</Link></li>
          <li><Link to="/accessory">Accessory</Link></li>
        </ul>
      </div>

      <div className="auth-buttons">
        <NotificationCenter />
        <Link to="/wishlist" className="favorites-link">
          <Heart size={20} className="heart-icon"/>
        </Link>
        {isLoggedIn ? (
          <button onClick={handleSignOut} className="nav-button signout">Sign Out</button>
        ) : (
          <Link to="/login" className="nav-button login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;