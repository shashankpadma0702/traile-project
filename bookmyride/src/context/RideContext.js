import { createContext, useState } from 'react';

export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [rideType, setRideType] = useState('bike');

  return (
    <RideContext.Provider value={{ pickup, setPickup, drop, setDrop, rideType, setRideType }}>
      {children}
    </RideContext.Provider>
  );
};
