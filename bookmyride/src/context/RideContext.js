import { createContext, useState } from 'react';

// 1️⃣ Create the context
export const RideContext = createContext();

// 2️⃣ Provide context to children
export function RideProvider({ children }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [rideType, setRideType] = useState('bike');

  return (
    <RideContext.Provider value={{ pickup, setPickup, drop, setDrop, rideType, setRideType }}>
      {children}
    </RideContext.Provider>
  );
}
