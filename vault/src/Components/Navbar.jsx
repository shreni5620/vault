import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import "../assets/Navbar.css";
import NotificationCenter from "../Page/NotificationCenter";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  // Get user name and initial
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userName = userData.name || '';
  const userEmail = userData.email || '';
  let userInitial = '';
  if (userName) {
    userInitial = userName.charAt(0).toUpperCase();
  } else if (userEmail) {
    userInitial = userEmail.charAt(0).toUpperCase();
  }

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('loginStatusChanged', checkLogin);
    return () => window.removeEventListener('loginStatusChanged', checkLogin);
  }, []);

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
          <div
            className="profile-avatar"
            onClick={() => navigate('/profile')}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#2d6cdf",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 18,
              userSelect: "none",
              marginLeft: 12
            }}
            title={userName}
          >
            {userInitial}
          </div>
        ) : (
          <Link to="/login" className="nav-button login">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;