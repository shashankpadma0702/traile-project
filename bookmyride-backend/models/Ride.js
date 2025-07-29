const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ Correct path to your Sequelize setup

const Ride = sequelize.define('Ride', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Ride can exist before driver is assigned
  },
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dropLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // Other options: 'assigned', 'completed', 'cancelled'
  },
  driverAssignedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Set when driver gets assigned
  },
  fare: {
    type: DataTypes.FLOAT,
    defaultValue: 0, // Calculated once ride is completed
  },
});

module.exports = Ride;