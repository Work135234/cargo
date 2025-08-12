const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cargo-stream-app-69-main').then(async () => {
    const User = require('./delivery-backend/models/User');
    const result = await User.updateMany(
        { createdAt: { $exists: false } },
        { $set: { createdAt: new Date() } }
    );
    console.log('Updated users without createdAt:', result.modifiedCount);
    process.exit(0);
});
