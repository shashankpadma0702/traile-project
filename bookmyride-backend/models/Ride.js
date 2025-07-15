const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Ride = sequelize.define('Ride', {
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dropLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pointsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

// Relationships
Ride.belongsTo(User, { as: 'customer', foreignKey: 'customerId' });
Ride.belongsTo(User, { as: 'driver', foreignKey: 'driverId' });

module.exports = Ride;