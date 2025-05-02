import React, { useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import './NotificationManager.css';

const socket = io('http://localhost:5000');

const NotificationManager = () => {
  const [notification, setNotification] = useState({
    type: 'update',
    title: '',
    message: '',
    recipients: [],
    action: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/notifications', {
        ...notification,
        createdBy: 'admin',
        timestamp: new Date()
      });

      if (response.data) {
        socket.emit('adminNotification', response.data);
        setNotification({
          type: 'update',
          title: '',
          message: '',
          recipients: [],
          action: ''
        });
        alert('Notification sent successfully!');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="notification-manager">
      <h2 className="notification-title">
        Send Notification
      </h2>

      <form onSubmit={handleSubmit} className="notification-form">
        {/* Type */}
        <div className="form-group">
          <label className="form-label">
            Type
          </label>
          <select
            name="type"
            value={notification.type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="update">Update</option>
            <option value="offer">Offer</option>
            <option value="news">News</option>
          </select>
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={notification.title}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter notification title"
          />
        </div>

        {/* Message */}
        <div className="form-group">
          <label className="form-label">
            Message
          </label>
          <textarea
            name="message"
            value={notification.message}
            onChange={handleChange}
            className="form-textarea"
            required
            rows="4"
            placeholder="Enter notification message"
          />
        </div>

        {/* Action */}
        <div className="form-group">
          <label className="form-label">
            Action (Optional)
          </label>
          <input
            type="text"
            name="action"
            value={notification.action}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter call-to-action text"
          />
        </div>

        {/* Recipients */}
        <div className="form-group">
          <label className="form-label">
            Recipients
          </label>
          <input
            type="text"
            name="recipients"
            value={notification.recipients.join(', ')}
            onChange={(e) => {
              const recipients = e.target.value
                .split(',')
                .map(id => id.trim())
                .filter(id => id);
              setNotification(prev => ({
                ...prev,
                recipients
              }));
            }}
            className="form-input"
            placeholder="Enter recipient IDs (comma-separated) or 'all'"
          />
          <p className="form-help-text">
            Leave empty to send to all users
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="submit-button"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default NotificationManager;
