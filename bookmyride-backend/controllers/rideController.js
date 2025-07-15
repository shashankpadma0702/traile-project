const Ride = require('../models/Ride');
const User = require('../models/User');

// Book a new ride
exports.bookRide = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, customerId } = req.body;

    const driver = await User.findOne({ where: { role: 'driver' } });

    if (!driver) {
      return res.status(404).json({ error: 'No drivers available' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const ride = await Ride.create({
      pickupLocation,
      dropLocation,
      customerId,
      driverId: driver.id,
      otp,
      status: 'pending',
    });

    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all rides
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.findAll({ include: ['customer', 'driver'] });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.verifyOtp = async (req, res) => {
  try {
    const { rideId, enteredOtp } = req.body;

    // ✅ Update this line
    const ride = await Ride.findByPk(Number(rideId));

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    if (ride.otp !== enteredOtp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    ride.status = 'in_progress';
    await ride.save();

    res.json({ message: 'OTP verified. Ride started.', ride });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.completeRide = async (req, res) => {
  try {
    const { rideId, distance } = req.body;

    console.log("Distance received:", distance); // ✅ Add this line

    const ride = await Ride.findByPk(Number(rideId));

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    if (ride.status !== 'in_progress') {
      return res.status(400).json({ error: 'Ride is not in progress' });
    }

    const customer = await User.findByPk(ride.customerId);
    const driver = await User.findByPk(ride.driverId);

    const earnedPoints = distance * 300;

    customer.points += earnedPoints;
    driver.points += earnedPoints;

    await customer.save();
    await driver.save();

    ride.status = 'completed';
    ride.pointsEarned = earnedPoints;
    await ride.save();

    res.json({
      message: `Ride completed. ${earnedPoints} points awarded.`,
      ride,
      customerPoints: customer.points,
      driverPoints: driver.points
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};