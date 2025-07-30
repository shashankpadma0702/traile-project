import React from 'react';
import MapView from '../components/MapView';
import RideOptions from '../components/RideOptions';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="bg-blue-600 text-white rounded-t-2xl p-4">
          <div className="flex justify-between flex-wrap gap-2">
          </div>
        </div>

        <div className="p-4 space-y-4">
          
          <MapView />
          <RideOptions />
        </div>
        
      </div>
    </div>
  );
}
