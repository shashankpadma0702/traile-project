const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Create a new ride (immediate or scheduled)
router.post('/rides', rideController.bookRide);

// Get all rides or filter by query (e.g., userId, status)
router.get('/rides', rideController.getRides);

// Verify ride OTP
router.post('/rides/verify-otp', rideController.verifyOtp);

// Mark ride as complete
router.post('/rides/complete', rideController.completeRide);

// Add game points to a specific ride
router.post('/rides/:rideId/game-points', rideController.addGamePoints);

module.exports = router;