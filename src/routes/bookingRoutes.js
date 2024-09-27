const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Routes
router.post('/book-room', bookingController.bookRoom);
router.get('/view-booking', bookingController.viewBooking);
router.get('/all-guests', bookingController.viewAllGuests);
router.delete('/cancel-booking', bookingController.cancelBooking);
router.put('/modify-booking', bookingController.modifyBooking);

module.exports = router;
