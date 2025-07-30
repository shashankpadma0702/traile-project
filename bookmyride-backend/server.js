require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const sequelize = require('./config/db');
require('./jobs/pointDecayJob');


const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const rewardRoutes = require('./routes/rewardRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/auth', authRoutes); // ✅ added

app.get('/', (req, res) => {
  res.send('🚗 BookMyRide backend is running!');
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });