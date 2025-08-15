const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Public endpoint for fetching all dispatchers (for customer booking form)
router.get('/public-dispatchers', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const dispatchers = await User.find({ role: 'Dispatcher' }).select('-password');
    res.json({ success: true, users: dispatchers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch dispatchers' });
  }
});

// All dispatcher routes require Dispatcher role
router.use(auth, role('Dispatcher'));

// Get assigned bookings
router.get('/assigned-bookings', bookingController.getAssignedBookings);

// Update booking status and notes
router.post('/update-booking', bookingController.updateBookingStatus);

// Get a specific assigned booking
router.get('/bookings/:bookingId', bookingController.getAssignedBooking);

// Schedule a booking
router.post('/schedule-booking', bookingController.scheduleBooking);

module.exports = router;