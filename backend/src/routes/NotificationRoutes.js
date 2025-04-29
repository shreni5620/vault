const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

// Create new notification
router.post('/', notificationController.createNotification);

// Get notifications for a user
router.get('/', notificationController.getNotifications);

// Mark notification as read
router.put('/:notificationId/read', notificationController.markAsRead);

// Delete notification
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;