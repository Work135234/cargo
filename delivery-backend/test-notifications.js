require('dotenv').config();
const mongoose = require('mongoose');
const NotificationService = require('./utils/notificationService');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mock subscription data
const mockSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/mock-endpoint',
    keys: {
        p256dh: 'mock-p256dh-key',
        auth: 'mock-auth-key'
    }
};

// Mock user data
const mockUser = {
    _id: 'test-user-id',
    email: 'test@example.com'
};

async function testNotifications() {
    try {
        console.log('1. Testing NotificationService initialization...');
        NotificationService.initialize();

        console.log('2. Testing push subscription storage...');
        await NotificationService.savePushSubscription(mockUser._id, mockSubscription);

        console.log('3. Testing notification creation with web push...');
        const testNotification = {
            recipient: mockUser._id,
            type: 'test',
            title: 'Test Notification',
            message: 'This is a test notification',
            relatedBooking: 'test-booking-id',
            priority: 'medium'
        };

        await NotificationService.createNotification(testNotification);

        console.log('All tests completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testNotifications();
