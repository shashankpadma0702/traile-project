const Reward = require('../models/Reward');
const User = require('../models/User');

exports.redeemReward = async (req, res) => {
  try {
    const { userId, rewardName, cost } = req.body;

    const user = await User.findByPk(userId);

    if (!user || user.points < cost) {
      return res.status(400).json({ error: 'Insufficient points or user not found' });
    }

    const reward = await Reward.create({
      name: rewardName,
      cost,
      userId,
      redeemed: true
    });

    user.points -= cost;
    await user.save();

    res.json({ message: 'Reward redeemed successfully', reward, remainingPoints: user.points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};