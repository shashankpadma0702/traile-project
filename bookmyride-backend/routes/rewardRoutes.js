const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

router.post('/rewards/redeem', rewardController.redeemReward);

module.exports = router;