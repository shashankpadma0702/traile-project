import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import RideOptions from '../components/RideOptions';

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1">
        <div className="h-screen flex flex-col">
          <MapView />
        </div>
        <div className="w-full md:w-1/3 p-4 bg-gray-100">
          <RideOptions />
        </div>
      </div>
    </div>
  );
}
