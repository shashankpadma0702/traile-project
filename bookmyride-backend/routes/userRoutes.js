const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerUser, loginUser } = require('../controllers/userController');

// 📌 Routes
router.post('/users', userController.createUser);         // ➤ POST /api/users/users
router.get('/users', userController.getUsers);            // ➤ GET  /api/users/users
router.get('/:userId/ride-history', userController.getRideHistory);


router.post('/register', registerUser);                   // ➤ POST /api/users/register
router.post('/login', loginUser);                         // ➤ POST /api/users/login

module.exports = router;
