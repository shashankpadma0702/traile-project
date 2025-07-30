// src/components/RideOptions.js

import { useContext } from 'react';
import {
  FaBicycle,
  FaCar,
  FaShuttleVan,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaUser,
  FaStar,
} from 'react-icons/fa';
import { RideContext } from '../context/RideContext';
import MapView from './MapView'; // ✅ Import your live map
import './RideOptions.css';
import Navbar from './Navbar'; // ✅ Import the Navbar component

export default function RideOptions() {
  const {
    rideType,
    setRideType,
    pickup,
    setPickup,
    drop,
    setDrop,
  } = useContext(RideContext);

  const handleRideSelection = (type) => {
    setRideType(type);
  };

  const handleBookRide = () => {
    if (!pickup || !drop) {
      alert('Please enter both pickup and drop locations!');
      return;
    }
    alert(`🚗 Booking a ${rideType} ride from "${pickup}" to "${drop}"...`);
  };

  return (
    <div className="ride-container">
      <h2 className="ride-title">Book My Ride</h2>
      <Navbar />
      <p className="ride-subtitle">Choose your ride type and set your route</p>

      {/* ✅ Live Map Display */}
      <div className="map-placeholder">
        <MapView />
      </div>

      {/* Ride Type Selection */}
      <label className="ride-type-label">Select Ride Type</label>
      <div className="ride-type-buttons">
        <button
          className={`ride-button ${rideType === 'bike' ? 'active' : ''}`}
          onClick={() => handleRideSelection('bike')}
        >
          <FaBicycle /> Bike
        </button>
        <button
          className={`ride-button ${rideType === 'auto' ? 'active' : ''}`}
          onClick={() => handleRideSelection('auto')}
        >
          <FaShuttleVan /> Auto
        </button>
        <button
          className={`ride-button ${rideType === 'car' ? 'active' : ''}`}
          onClick={() => handleRideSelection('car')}
        >
          <FaCar /> Car
        </button>
      </div>

      {/* Pickup Location */}
      <label className="input-label">Pickup Location</label>
      <div className="input-box">
        <FaMapMarkerAlt className="input-icon" />
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Enter Pickup Location"
        />
      </div>

      {/* Drop Location */}
      <label className="input-label">Drop Location</label>
      <div className="input-box">
        <FaLocationArrow className="input-icon" />
        <input
          type="text"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          placeholder="Enter Drop Location"
        />
      </div>

      {/* Book Ride Button */}
      <button className="book-button" onClick={handleBookRide}>
        Book Ride
      </button>

      {/* Info and Rewards */}
      <div className="info-box">
        <div className="reward-text">🎉 You will earn 25 reward points!</div>
        <button className="redeem-button">Redeem for Subscriptions</button>

        <div className="driver-info">
          <div className="driver-avatar">
            <FaUser />
          </div>
          <div>
            <div className="driver-name">Driver: Rahul</div>
            <div className="driver-rating">
              <FaStar /> 4.8 ★
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
