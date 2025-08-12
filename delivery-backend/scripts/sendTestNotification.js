// sendTestNotification.js
const mongoose = require('mongoose');
const User = require('../models/User');
const notificationController = require('../controllers/notificationController');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cargo-stream'; // Update with your DB name

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


async function sendTest() {
    try {
        const users = await User.find();
        console.log('Users found:', users.map(u => ({ _id: u._id, email: u.email, role: u.role })));
        const user = users[0];
        if (!user) return console.log('No user found');
        await notificationController.createNotification(
            user._id,
            'Test Notification',
            'This is a test notification from script.',
            'system',
            null,
            'medium'
        );
        console.log('Test notification sent!');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}

sendTest();
