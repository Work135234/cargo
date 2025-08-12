// const express = require('express');
// const router = express.Router();
// const notificationController = require('../controllers/notificationController');
// const authMiddleware = require('../middleware/authMiddleware');

// // All routes require authentication
// router.use(authMiddleware);

// // Get user notifications
// router.get('/', notificationController.getNotifications);

// // Get unread count
// router.get('/unread-count', notificationController.getUnreadCount);

// // Mark notification as read
// router.patch('/:notificationId/read', notificationController.markAsRead);

// // Mark all notifications as read
// router.patch('/mark-all-read', notificationController.markAllAsRead);

// // Delete notification
// router.delete('/:notificationId', notificationController.deleteNotification);

// module.exports = router;





const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/authMiddleware');

// All notification routes require authentication
router.use(auth);

// Get user notifications
router.get('/', notificationController.getNotifications);

// Get unread notification count
router.get('/unread-count', notificationController.getUnreadCount);

// Mark a notification as read
router.patch('/:notificationId/read', notificationController.markAsRead);

// Mark all notifications as read
router.patch('/mark-all-read', notificationController.markAllAsRead);

// Delete a notification
router.delete('/:notificationId', notificationController.deleteNotification);

// DEV ONLY: Test notification endpoint
router.post('/test', async (req, res) => {
    try {
        const { userId, title, message } = req.body;
        if (!userId || !title || !message) {
            return res.status(400).json({ success: false, message: 'userId, title, and message are required' });
        }
        await notificationController.createNotification(userId, title, message, 'test_type');
        res.json({ success: true, message: 'Test notification sent' });
    } catch (err) {
        console.error('Error in /test notification endpoint:', err);
        res.status(500).json({ success: false, message: 'Failed to send test notification' });
    }
});

module.exports = router;