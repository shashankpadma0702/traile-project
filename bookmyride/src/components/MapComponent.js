import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = [17.385044, 78.486671]; // Hyderabad center

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}

const MapComponent = () => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const geocode = async (address) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await res.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  };

  const handleGeocode = async () => {
    const pickupLoc = await geocode(pickup);
    const dropLoc = await geocode(drop);
    if (pickupLoc) setPickupCoords(pickupLoc);
    if (dropLoc) setDropCoords(dropLoc);
  };

  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleGeocode}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Set Location
        </button>
      </div>

      <MapContainer
        center={DEFAULT_POSITION}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pickupCoords && (
          <>
            <ChangeView center={pickupCoords} />
            <Marker position={pickupCoords}>
              <Popup>Pickup Location</Popup>
            </Marker>
          </>
        )}
        {dropCoords && (
          <Marker position={dropCoords}>
            <Popup>Drop Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
