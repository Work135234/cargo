
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const trainScheduleController = require('../controllers/trainScheduleController');
const Booking = require('../models/Booking');
const TrainSchedule = require('../models/TrainSchedule');

// Admin schedule booking
router.post('/schedule-booking', async (req, res, next) => {
    // Only allow admins
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    return require('../controllers/bookingController').adminScheduleBooking(req, res, next);
});

// Train Schedule Management
router.post('/train-schedules', trainScheduleController.createTrainSchedule);
router.get('/train-schedules', trainScheduleController.getAllTrainSchedules);

// Assign train schedule to booking
router.post('/assign-train-schedule', async (req, res) => {
    try {
        const { bookingId, trainScheduleId } = req.body;
        if (!bookingId || !trainScheduleId) {
            return res.status(400).json({ success: false, message: 'Booking ID and Train Schedule ID are required' });
        }
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { trainSchedule: trainScheduleId, status: 'Scheduled' },
            { new: true }
        ).populate('trainSchedule');
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to assign train schedule' });
    }
});

// All admin routes require Admin role
router.use(auth, role('Admin'));

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

// Pricing Rules Management
router.get('/pricing-rules', adminController.getAllPricingRules);
router.post('/pricing-rules', adminController.createPricingRule);
router.put('/pricing-rules/:ruleId', adminController.updatePricingRule);
router.delete('/pricing-rules/:ruleId', adminController.deletePricingRule);



// Booking Management
router.get('/bookings', adminController.getAllBookings);

// Reports
router.get('/reports', adminController.generateReport);

// PATCH /api/admin/pricing-rules/:id/toggle
router.patch('/pricing-rules/:id/toggle', adminController.toggleRuleActive);

module.exports = router;
