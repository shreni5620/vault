import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Fetch user data from localStorage or API
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setUser(userData);
      const userName = userData.name || '';
      const userEmail = userData.email || '';
      let userInitial = '';
      if (userName) {
        userInitial = userName.charAt(0).toUpperCase();
      } else if (userEmail) {
        userInitial = userEmail.charAt(0).toUpperCase();
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user data to localStorage or API
    localStorage.setItem('userData', JSON.stringify(user));
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="user-profile">
      <div style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
        <div
          className="profile-avatar"
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#2d6cdf",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 24,
            userSelect: "none"
          }}
          title={user.name}
        >
          {user.name ? user.name.charAt(0).toUpperCase() : ''}
        </div>
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: 56,
              right: 0,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              borderRadius: 8,
              zIndex: 100,
              minWidth: 120
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer"
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </div>
          <div className="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
          <div className="button-group" style={{ flexDirection: "column", gap: "1rem" }}>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button
              className="logout-btn"
              style={{
                background: "#e53e3e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
