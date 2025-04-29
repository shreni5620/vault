import React, { useState, useEffect } from 'react';
import { Bell, Tag, Newspaper, Info, X, Check, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_ENDPOINTS } from '../config/api';
import '../assets/NotificationCenter.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const userId = "user123"; // Replace with actual user ID from authentication

  useEffect(() => {
    fetchNotifications();
    
    // Set up Socket.IO connection
    const socket = io('http://localhost:3000');
    
    socket.on('newNotification', (notification) => {
      if (notification.recipients.includes(userId)) {
        setNotifications(prev => [notification, ...prev]);
        updateUnreadCount([notification, ...notifications]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.NOTIFICATIONS}?userId=${userId}`);
      if (!response.data.error) {
        setNotifications(response.data.notifications);
        updateUnreadCount(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const updateUnreadCount = (notifs) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const markAsRead = async (id) => {
    try {
      const response = await axios.put(`${API_ENDPOINTS.NOTIFICATIONS}/${id}/read`, {
        userId
      });
      
      if (!response.data.error) {
        const updatedNotifications = notifications.map(notif => 
          notif._id === id ? { ...notif, read: true } : notif
        );
        setNotifications(updatedNotifications);
        updateUnreadCount(updatedNotifications);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter(n => !n.read)
          .map(n => markAsRead(n._id))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await axios.delete(`${API_ENDPOINTS.NOTIFICATIONS}/${id}`, {
        data: { userId }
      });
      
      if (!response.data.error) {
        const updatedNotifications = notifications.filter(notif => notif._id !== id);
        setNotifications(updatedNotifications);
        updateUnreadCount(updatedNotifications);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(notif => notif.type === activeTab);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'offer':
        return <Tag size={20} />;
      case 'news':
        return <Newspaper size={20} />;
      case 'update':
        return <Info size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-trigger"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read"
                onClick={markAllAsRead}
              >
                <Check size={16} />
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`tab ${activeTab === 'offer' ? 'active' : ''}`}
              onClick={() => setActiveTab('offer')}
            >
              Offers
            </button>
            <button 
              className={`tab ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
            <button 
              className={`tab ${activeTab === 'update' ? 'active' : ''}`}
              onClick={() => setActiveTab('update')}
            >
              Updates
            </button>
          </div>

          <div className="notifications-list">
            {getFilteredNotifications().length === 0 ? (
              <div className="empty-state">
                <AlertTriangle size={24} />
                <p>No notifications</p>
              </div>
            ) : (
              getFilteredNotifications().map(notification => (
                <div 
                  key={notification._id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="timestamp">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                    {notification.action && (
                      <button className="action-button">
                        {notification.action}
                      </button>
                    )}
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="read-button"
                        onClick={() => markAsRead(notification._id)}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button 
                      className="delete-button"
                      onClick={() => deleteNotification(notification._id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;