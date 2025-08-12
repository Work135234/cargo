const mongoose = require('mongoose');

const TrainScheduleSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrainSchedule', TrainScheduleSchema);
