const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('customer', 'driver'),
    defaultValue: 'customer',
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = User;