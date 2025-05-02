import React, { useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

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
    <div className="p-6 sm:p-8 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Send Notification
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            name="type"
            value={notification.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          >
            <option value="update">Update</option>
            <option value="offer">Offer</option>
            <option value="news">News</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={notification.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
            placeholder="Enter notification title"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={notification.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
            rows="4"
            placeholder="Enter notification message"
          />
        </div>

        {/* Action */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Action (Optional)
          </label>
          <input
            type="text"
            name="action"
            value={notification.action}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Enter call-to-action text"
          />
        </div>

        {/* Recipients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Enter recipient IDs (comma-separated) or 'all'"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Leave empty to send to all users
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default NotificationManager;
