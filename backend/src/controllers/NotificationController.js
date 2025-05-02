const Notification = require('../models/NotificationModal');

const createNotification = async (req, res) => {
  try {
    const { type, title, message, action, recipients, createdBy } = req.body;

    if (!type || !title || !message || !recipients || !createdBy) {
      return res.status(400).json({
        error: true,
        message: "Missing required fields"
      });
    }

    const notification = new Notification({
      type,
      title,
      message,
      action,
      recipients,
      createdBy,
      timestamp: new Date(),
      read: false
    });

    await notification.save();

    // Emit notification to connected clients
    const io = req.app.get('io');
    if (io) {
      if (recipients.includes('all')) {
        io.emit('newNotification', notification);
      } else {
        recipients.forEach(userId => {
          io.to(`user-${userId}`).emit('newNotification', notification);
        });
      }
    }

    res.status(201).json({
      error: false,
      message: "Notification created successfully",
      notification
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      error: true,
      message: "Error creating notification"
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        error: true,
        message: "User ID is required"
      });
    }

    const notifications = await Notification.find({
      $or: [
        { recipients: userId },
        { recipients: 'all' }
      ]
    }).sort({ timestamp: -1 });

    res.status(200).json({
      error: false,
      notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      error: true,
      message: "Error fetching notifications"
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;

    if (!notificationId || !userId) {
      return res.status(400).json({
        error: true,
        message: "Notification ID and User ID are required"
      });
    }

    const foundNotification = await Notification.findById(notificationId);

    if (!foundNotification) {
      return res.status(404).json({
        error: true,
        message: "Notification not found"
      });
    }

    if (!foundNotification.recipients.includes(userId) && !foundNotification.recipients.includes('all')) {
      return res.status(403).json({
        error: true,
        message: "Not authorized to update this notification"
      });
    }

    foundNotification.read = true;
    await foundNotification.save();

    res.status(200).json({
      error: false,
      message: "Notification marked as read",
      notification: foundNotification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      error: true,
      message: "Error updating notification"
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;

    if (!notificationId || !userId) {
      return res.status(400).json({
        error: true,
        message: "Notification ID and User ID are required"
      });
    }

    const foundNotification = await Notification.findById(notificationId);

    if (!foundNotification) {
      return res.status(404).json({
        error: true,
        message: "Notification not found"
      });
    }

    if (!foundNotification.recipients.includes(userId) && !foundNotification.recipients.includes('all')) {
      return res.status(403).json({
        error: true,
        message: "Not authorized to delete this notification"
      });
    }

    await Notification.findByIdAndDelete(notificationId);

    res.status(200).json({
      error: false,
      message: "Notification deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      error: true,
      message: "Error deleting notification"
    });
  }
};

const addNotification = async (req, res) => {
  // Implementation of addNotification function
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  addNotification
};