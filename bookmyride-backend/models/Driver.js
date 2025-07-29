const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ride = sequelize.define('Ride', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: true, // if the ride hasn't been assigned yet
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
    defaultValue: 'pending', // other statuses: 'assigned', 'completed', etc.
  },
  driverAssignedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fare: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

module.exports = Ride;