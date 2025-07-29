// src/components/RideOptions.js
import { useContext } from 'react';
import {
  FaBicycle,
  FaCar,
  FaShuttleVan,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaUser,
} from 'react-icons/fa';
import { RideContext } from '../context/RideContext';

export default function RideOptions() {
  const { pickup, setPickup, drop, setDrop, rideType, setRideType } = useContext(RideContext);

  const handleBookRide = () => {
    if (!pickup || !drop) {
      alert('Please enter both pickup and drop locations.');
      return;
    }
    alert(`Booking a ${rideType} ride from ${pickup} to ${drop}`);
    // ✅ You can send this to backend via Axios here
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">Book a Ride</h1>
      <p className="text-gray-500 text-sm">
        Choose ride type and set pickup & drop-off locations.
      </p>

      {/* Ride Type */}
      <div>
        <label className="text-sm font-semibold">Ride Type</label>
        <div className="flex gap-2 mt-2">
          <button
            className={`flex-1 p-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium ${
              rideType === 'bike' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setRideType('bike')}
          >
            <FaBicycle /> Bike
          </button>
          <button
            className={`flex-1 p-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium ${
              rideType === 'auto' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setRideType('auto')}
          >
            <FaShuttleVan /> Auto
          </button>
          <button
            className={`flex-1 p-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium ${
              rideType === 'taxi' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setRideType('taxi')}
          >
            <FaCar /> Taxi
          </button>
        </div>
      </div>

      {/* Pickup Input */}
      <div>
        <label className="text-sm font-semibold">Pickup Location</label>
        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded mt-1">
          <FaMapMarkerAlt className="text-blue-500" />
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Drop Input */}
      <div>
        <label className="text-sm font-semibold">Drop-off Location</label>
        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded mt-1">
          <FaLocationArrow className="text-blue-500" />
          <input
            type="text"
            placeholder="Enter drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={handleBookRide}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Book Ride
      </button>

      {/* Info */}
      <div className="border-t pt-4 space-y-2 text-sm">
        <div>
          <span className="font-semibold">Rewards:</span>{' '}
          <span className="text-green-600">+12.50 points</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-600" />
          <span className="font-semibold">Driver: John Doe</span> (4.8⭐)
        </div>
      </div>
    </div>
  );
}
