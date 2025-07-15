const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Reward = sequelize.define('Reward', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  redeemed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Reward.belongsTo(User, { foreignKey: 'userId' });

module.exports = Reward;