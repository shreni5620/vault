const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['offer', 'news', 'update']
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  },
  action: {
    type: String,
    required: false
  },
  recipients: [{
    type: String,
    required: true
  }],
  createdBy: {
    type: String,
    required: true
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;