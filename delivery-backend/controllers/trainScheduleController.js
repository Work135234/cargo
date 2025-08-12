const TrainSchedule = require('../models/TrainSchedule');

// Create a new train schedule
exports.createTrainSchedule = async (req, res) => {
    try {
        const { trainNumber, departureTime, arrivalTime, from, to, notes } = req.body;
        const schedule = new TrainSchedule({ trainNumber, departureTime, arrivalTime, from, to, notes });
        await schedule.save();
        res.status(201).json({ success: true, schedule });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create train schedule' });
    }
};

// Get all train schedules
exports.getAllTrainSchedules = async (req, res) => {
    try {
        const schedules = await TrainSchedule.find().sort({ departureTime: 1 });
        res.json({ success: true, schedules });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch train schedules' });
    }
};
