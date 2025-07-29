const cron = require('node-cron');
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const { Op } = require('sequelize');

// Runs every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('🕒 Running driver point decay check...');

  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const delayedRides = await Ride.findAll({
      where: {
        status: 'assigned',
        driverAssignedAt: {
          [Op.lt]: fiveMinutesAgo
        }
      }
    });

    for (const ride of delayedRides) {
      if (!ride.driverId) continue;

      const driver = await Driver.findByPk(ride.driverId);

      if (driver) {
        const originalPoints = driver.points;
        const updatedPoints = Math.max(originalPoints - 10, 0);
        driver.points = updatedPoints;

        // Auto-revoke insurance eligibility
        if (updatedPoints < 10000 && driver.insuranceEligible) {
          driver.insuranceEligible = false;
        }

        await driver.save();

        console.log(`⚠️ Driver ${driver.id} penalized: ${originalPoints} → ${updatedPoints}`);
      }
    }
  } catch (error) {
    console.error('❌ pointDecayJob failed:', error.message);
  }
});