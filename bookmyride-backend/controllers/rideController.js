const Ride = require('../models/Ride');
const Driver = require('../models/Driver');
const User = require('../models/User');

// 🚕 Book a ride with gender preference
exports.bookRide = async (req, res) => {
  try {
    const { userId, preferredGender, pickupLocation, dropLocation, scheduledTime } = req.body;

    const driverQuery = {
      where: { status: 'available' }
    };

    if (preferredGender === 'female') {
      driverQuery.where.gender = 'female';
    }

    const availableDrivers = await Driver.findAll(driverQuery);
    if (availableDrivers.length === 0) {
      return res.status(404).json({ message: 'No drivers available matching your preference.' });
    }

    const driver = availableDrivers[0];

    const ride = await Ride.create({
      customerId: userId,
      driverId: driver.id,
      pickupLocation,
      dropLocation,
      scheduledTime: scheduledTime || null,
      status: scheduledTime ? 'scheduled' : 'assigned',
      driverAssignedAt: new Date()
    });

    driver.status = 'busy';
    await driver.save();

    res.status(201).json({ message: 'Ride booked successfully!', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📋 Get all rides with customer and driver info
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.findAll({
      include: [
        { model: User, as: 'customer' },
        { model: Driver, as: 'driver' }
      ]
    });

    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔐 Verify OTP before starting ride
exports.verifyOtp = async (req, res) => {
  try {
    const { rideId, enteredOtp } = req.body;

    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });

    if (ride.otp !== enteredOtp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    ride.status = 'in_progress';
    await ride.save();

    res.json({ message: 'OTP verified. Ride started.', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🏁 Complete ride and award points
exports.completeRide = async (req, res) => {
  try {
    const { rideId, distance } = req.body;

    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });

    if (ride.status !== 'in_progress') {
      return res.status(400).json({ error: 'Ride is not in progress' });
    }

    const earnedPoints = distance * 300;

    await Promise.all([
      User.increment('points', { by: earnedPoints, where: { id: ride.customerId } }),
      Driver.increment('points', { by: earnedPoints, where: { id: ride.driverId } })
    ]);

    const driver = await Driver.findByPk(ride.driverId);

    if (driver.points >= 10000 && !driver.insuranceEligible) {
      driver.insuranceEligible = true;
      await driver.save();
    }

    ride.status = 'completed';
    ride.pointsEarned = earnedPoints;
    await ride.save();

    const updatedCustomer = await User.findByPk(ride.customerId);
    const updatedDriver = await Driver.findByPk(ride.driverId);

    res.json({
      message: `Ride completed. ${earnedPoints} points awarded.`,
      ride,
      customerPoints: updatedCustomer.points,
      driverPoints: updatedDriver.points
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🎮 Add bonus points manually (e.g. from game feature)
exports.addGamePoints = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { pointsEarned } = req.body;

    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });

    const driver = await Driver.findByPk(ride.driverId);
    driver.points += pointsEarned;

    if (driver.points >= 10000 && !driver.insuranceEligible) {
      driver.insuranceEligible = true;
    }

    await driver.save();

    ride.pointsEarned += pointsEarned;
    await ride.save();

    res.json({
      message: 'Game points added!',
      totalPoints: driver.points,
      updatedRide: ride
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};