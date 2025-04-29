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
    req.app.get('io').emit('newNotification', notification);

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
      recipients: userId
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

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipients: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        error: true,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      error: false,
      message: "Notification marked as read",
      notification
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

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      recipients: userId
    });

    if (!notification) {
      return res.status(404).json({
        error: true,
        message: "Notification not found"
      });
    }

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

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification
};