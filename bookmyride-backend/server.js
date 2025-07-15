const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const Reward = require('./models/Reward');
const rewardRoutes = require('./routes/rewardRoutes');


dotenv.config();

const app = express(); // ✅ Define app before using it

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', rideRoutes);
app.use('/api', rewardRoutes);


app.get('/', (req, res) => {
  res.send('BookMyRide backend is running!');
});



sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });