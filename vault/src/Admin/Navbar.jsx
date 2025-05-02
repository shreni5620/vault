import React, { useState } from 'react';
import {
  Bell, Search, Menu, X, Sun, Moon,
  MessageSquare, User, Car
} from 'lucide-react';
import './Navbar.css';

function Navbar({ currentPage, toggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  const formatPageTitle = (page) =>
    page.charAt(0).toUpperCase() + page.slice(1);

  const notifications = [
    {
      id: 1,
      title: 'New vehicle listing',
      message: 'A new BMW X5 has been listed for approval',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'User reported issue',
      message: 'User John reported an issue with vehicle ID #12345',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'System update',
      message: 'System maintenance scheduled for tonight at 2:00 AM',
      time: '3 hours ago',
      read: true,
    },
  ];

  return (
    <div className="navbar">
      <div className="navbar-title">{formatPageTitle(currentPage)}</div>
      <div className="navbar-actions">
        <button className="search-toggle" onClick={toggleSearch} title="Search">
          <Search size={20} />
        </button>
        <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle theme">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="notifications-container">
          <button className="notifications-button" onClick={toggleNotifications} title="Notifications">
            <Bell size={20} />
            <span className="notification-badge">2</span>
          </button>
          {notificationsOpen && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <span className="notifications-title">Notifications</span>
                <button className="mark-all-read">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`notification-item${n.read ? '' : ' unread'}`}>
                    <div className="notification-icon"><Bell size={16} /></div>
                    <div className="notification-content">
                      <div className="notification-title">{n.title}</div>
                      <div className="notification-message">{n.message}</div>
                      <div className="notification-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="view-all-notifications">View all</button>
              </div>
            </div>
          )}
        </div>
        <div className="user-avatar">AD</div>
      </div>
    </div>
  );
}

export default Navbar;
