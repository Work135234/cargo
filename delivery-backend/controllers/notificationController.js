const Notification = require('../models/Notification');
const User = require('../models/User');

// Helper function to send real-time notification
const sendRealTimeNotification = (userId, notification) => {
  try {
    if (global.connectedUsers && global.connectedUsers.has(userId.toString())) {
      const socketId = global.connectedUsers.get(userId.toString());
      global.io.to(socketId).emit('newNotification', notification);
    }
  } catch (error) {
    console.error('Error sending real-time notification:', error);
  }
};

// Get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name email')
      .populate('relatedBooking', 'pickupAddress deliveryAddress')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Notification.countDocuments({ recipient: req.user._id });

    res.json({
      success: true,
      notifications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalNotifications: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error('Get notifications error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipient: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({ success: true, notification });
  } catch (err) {
    console.error('Mark as read error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark notification as read' });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Mark all as read error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark notifications as read' });
  }
};

// Get unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    res.json({ success: true, count });
  } catch (err) {
    console.error('Get unread count error:', err);
    res.status(500).json({ success: false, message: 'Failed to get unread count' });
  }
};

// Create a notification (internal use)
exports.createNotification = async (recipientId, title, message, type = 'system', relatedBookingId = null, priority = 'medium') => {
  try {
    const notification = new Notification({
      recipient: recipientId,
      title,
      message,
      type,
      relatedBooking: relatedBookingId,
      priority
    });

    await notification.save();

    // Send real-time notification
    sendRealTimeNotification(recipientId, notification);

    return notification;
  } catch (err) {
    console.error('Create notification error:', err);
    throw err;
  }
};

// Create notification for booking created
exports.notifyBookingCreated = async (booking) => {
  try {
    // Notify admin about new booking
    const adminUsers = await User.find({ role: 'Admin' });
    const dispatcherUsers = await User.find({ role: 'Dispatcher' });
    console.log('Admins found for notification:', adminUsers.map(a => ({ id: a._id, email: a.email })));
    console.log('Dispatchers found for notification:', dispatcherUsers.map(d => ({ id: d._id, email: d.email })));

    const bookingIdStr = booking._id.toString();
    for (const admin of adminUsers) {
      const notif = await this.createNotification(
        admin._id,
        'New Booking Available',
        `A new booking has been created by ${booking.customer.name || 'a customer'}. Booking ID: ${bookingIdStr.slice(-6)}`,
        'booking_created',
        booking._id,
        'high'
      );
      console.log('Admin notification created:', notif);
    }

    // Notify all dispatchers about new booking
    for (const dispatcher of dispatcherUsers) {
      const notif = await this.createNotification(
        dispatcher._id,
        'New Booking Available',
        `A new booking is available. Booking ID: ${bookingIdStr.slice(-6)}. Pickup: ${booking.pickupAddress}`,
        'booking_created',
        booking._id,
        'high'
      );
      console.log('Dispatcher notification created:', notif);
    }

    // Notify customer about booking confirmation
    const customerNotif = await this.createNotification(
      booking.customer,
      'Booking Confirmed',
      `Your booking has been successfully created. Booking ID: ${bookingIdStr.slice(-6)}`,
      'booking_confirmed',
      booking._id,
      'medium'
    );
    console.log('Customer notification created:', customerNotif);
  } catch (err) {
    console.error('Notify booking created error:', err);
  }
};

// Create notification for dispatcher assignment
exports.notifyDispatcherAssigned = async (booking, dispatcher) => {
  try {
    // Notify dispatcher about new assignment ONLY
    const bookingIdStr = booking._id.toString();
    const dispatcherNotif = await this.createNotification(
      dispatcher._id,
      'New Delivery Assignment',
      `You have been assigned to delivery booking ${bookingIdStr.slice(-6)}. Pickup: ${booking.pickupAddress}`,
      'dispatcher_assigned',
      booking._id,
      'high'
    );
    console.log('Dispatcher notification created:', dispatcherNotif);
    // No notification to customer
  } catch (err) {
    console.error('Notify dispatcher assigned error:', err);
  }
};
// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      recipient: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({ success: true, message: 'Notification deleted successfully' });
  } catch (err) {
    console.error('Delete notification error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
};