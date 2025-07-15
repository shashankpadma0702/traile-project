const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.post('/rides', rideController.bookRide);
router.get('/rides', rideController.getRides);
router.post('/rides/verify-otp', rideController.verifyOtp);
router.post('/rides/complete', rideController.completeRide);

module.exports = router;