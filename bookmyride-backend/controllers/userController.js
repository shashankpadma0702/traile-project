const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Ride = require('../models/Ride');
const Driver = require('../models/Driver');

// ✅ Register a new user (with hashed password)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔐 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'customer', // default role
      points: 0         // default points
    });

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Alternate user creation (if needed)
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📋 Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📖 Get ride history for a user
exports.getRideHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const rides = await Ride.findAll({
      where: { customerId: userId },
      include: [{ model: Driver }]
    });

    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
