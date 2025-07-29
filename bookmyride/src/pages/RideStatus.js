import { useEffect, useState } from 'react';

export default function RideStatus() {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('currentRide');
    if (data) setRide(JSON.parse(data));
  }, []);

  if (!ride) {
    return <div className="p-4">No ride found. Please book a ride.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ride Status</h2>
      <p><strong>Type:</strong> {ride.type}</p>
      <p><strong>Status:</strong> {ride.status}</p>
      <p><strong>Speed Limit:</strong> {ride.speedLimit} km/h</p>
      <p><strong>Driver:</strong> {ride.driver?.name || 'Assigning...'}</p>
    </div>
  );
}
