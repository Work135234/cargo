const Notification = require('../models/Notification');
const User = require('../models/User');
const webpush = require('web-push');
const sendEmail = require('./sendEmail');
const axios = require('axios');
// Helper to send FCM push notification
async function sendFCMNotification(fcmToken, payload) {
  if (!process.env.FCM_SERVER_KEY) {
    console.error('FCM_SERVER_KEY not set in environment');
    return;
  }
  try {
    await axios.post('https://fcm.googleapis.com/fcm/send', {
      to: fcmToken,
      notification: payload,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
      },
    });
  } catch (err) {
    console.error('Error sending FCM notification:', err?.response?.data || err);
  }
}
// Central hybrid notification sender
async function sendHybridNotification({ user, title, message, html, url, bookingId }) {
  // 1. FCM push notification
  if (user.fcmToken) {
    await sendFCMNotification(user.fcmToken, {
      title,
      body: message,
      click_action: url || '',
    });
  }
  // 2. Web push (if you want to keep it)
  if (user.pushSubscription) {
    await NotificationService.sendWebPushNotification(user.pushSubscription, {
      title,
      body: message,
      icon: '/path/to/icon.png',
      data: { url: url || `/bookings/${bookingId}` },
    });
  }
  // 3. Email
  if (user.email) {
    await sendEmail({
      to: user.email,
      subject: title,
      html: html || `<p>${message}</p>`,
      text: message,
    });
  }
}

class NotificationService {
  static initialize() {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      console.error('VAPID keys are not set in environment variables');
      return;
    }

    webpush.setVapidDetails(
      `mailto:${process.env.VAPID_EMAIL}`,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  }

  // Helper method to send web push notification
  static async sendWebPushNotification(subscription, payload) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
    } catch (error) {
      console.error('Error sending web push notification:', error);
    }
  }

  // Create a notification
  static async createNotification(data) {
    try {
      const notification = new Notification(data);
      await notification.save();

      // Get user's push subscription and send web push if available
      const user = await User.findById(data.recipient);
      if (user?.pushSubscription) {
        const pushPayload = {
          title: data.title,
          body: data.message,
          icon: '/path/to/icon.png',
          data: {
            url: `/bookings/${data.relatedBooking}`
          }
        };

        await this.sendWebPushNotification(user.pushSubscription, pushPayload);
      }
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  // Create booking created notification for admin
  static async notifyBookingCreated(booking) {
    try {
      // Find all admin users
      const admins = await User.find({ role: 'Admin' });

      const notifications = admins.map(admin => ({
        recipient: admin._id,
        type: 'booking_created',
        title: 'New Booking Available',
        message: `A new booking has been created and is ready for dispatcher assignment. Booking ID: ${booking._id}`,
        relatedBooking: booking._id,
        priority: 'high'
      }));

      await Notification.insertMany(notifications);
      console.log(`Created ${notifications.length} notifications for admins`);
    } catch (error) {
      console.error('Error notifying booking created:', error);
    }
  }

  // Create booking assigned notification for dispatcher
  static async notifyBookingAssigned(booking, dispatcherId) {
    try {
      const notification = await this.createNotification({
        recipient: dispatcherId,
        type: 'booking_assigned',
        title: 'New Booking Assigned',
        message: `You have been assigned a new booking. Pickup: ${booking.pickupAddress}, Delivery: ${booking.deliveryAddress}`,
        relatedBooking: booking._id,
        priority: 'high'
      });

      console.log(`Created notification for dispatcher ${dispatcherId}`);
      return notification;
    } catch (error) {
      console.error('Error notifying booking assigned:', error);
    }
  }

  // Create driver assigned notification for customer
  static async notifyDriverAssigned(booking) {
    try {
      const notification = await this.createNotification({
        recipient: booking.customer,
        type: 'driver_assigned',
        title: 'Driver Assigned',
        message: `A driver has been assigned to your delivery. Your order is now being processed.`,
        relatedBooking: booking._id,
        priority: 'medium'
      });

      console.log(`Created notification for customer ${booking.customer}`);
      return notification;
    } catch (error) {
      console.error('Error notifying driver assigned:', error);
    }
  }

  // Create booking confirmed notification for customer (hybrid)
  static async notifyBookingConfirmed(booking) {
    try {
      const user = await User.findById(booking.customer);
      const message = `Your booking has been confirmed! Fare: $${booking.fare}`;
      const title = 'Booking Confirmed';
      const html = `<h2>Booking Confirmed</h2><p>Your booking has been confirmed! Fare: $${booking.fare}</p>`;
      await sendHybridNotification({ user, title, message, html, bookingId: booking._id });
      const notification = await this.createNotification({
        recipient: booking.customer,
        type: 'booking_confirmed',
        title,
        message,
        relatedBooking: booking._id,
        priority: 'medium'
      });
      console.log(`Created confirmation notification for customer ${booking.customer}`);
      return notification;
    } catch (error) {
      console.error('Error notifying booking confirmed:', error);
    }
  }

  // Create status update notification for customer (hybrid)
  static async notifyStatusUpdate(booking, oldStatus, newStatus) {
    try {
      const user = await User.findById(booking.customer);
      const statusMessages = {
        'Scheduled': 'Your delivery has been scheduled',
        'In Transit': 'Your delivery is now in transit',
        'Delivered': 'Your delivery has been completed'
      };
      const message = statusMessages[newStatus] || `Your delivery status has been updated to ${newStatus}`;
      const title = 'Status Update';
      const html = `<h2>Status Update</h2><p>${message}</p>`;
      await sendHybridNotification({ user, title, message, html, bookingId: booking._id });
      const notification = await this.createNotification({
        recipient: booking.customer,
        type: 'status_updated',
        title,
        message,
        relatedBooking: booking._id,
        priority: 'medium'
      });
      console.log(`Created status update notification for customer ${booking.customer}`);
      return notification;
    } catch (error) {
      console.error('Error notifying status update:', error);
    }
  }

  // Get notifications for a user
  static async getUserNotifications(userId, limit = 20) {
    try {
      const notifications = await Notification.find({ recipient: userId })
        .populate('sender', 'name')
        .populate('relatedBooking', 'pickupAddress deliveryAddress')
        .sort({ createdAt: -1 })
        .limit(limit);

      return notifications;
    } catch (error) {
      console.error('Error getting user notifications:', error);
      throw error;
    }
  }

  // Mark notification as read
  static async markAsRead(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: userId },
        { isRead: true },
        { new: true }
      );
      return notification;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Mark all notifications as read for a user
  static async markAllAsRead(userId) {
    try {
      await Notification.updateMany(
        { recipient: userId, isRead: false },
        { isRead: true }
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // Get unread count for a user
  static async getUnreadCount(userId) {
    try {
      const count = await Notification.countDocuments({
        recipient: userId,
        isRead: false
      });
      return count;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  }

  // Delete notification
  static async deleteNotification(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        recipient: userId
      });
      return notification;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  // Save user's push subscription
  static async savePushSubscription(userId, subscription) {
    try {
      await User.findByIdAndUpdate(userId, {
        pushSubscription: subscription
      });
    } catch (error) {
      console.error('Error saving push subscription:', error);
      throw error;
    }
  }
}

// Initialize web push on service load
NotificationService.initialize();

module.exports = NotificationService;
