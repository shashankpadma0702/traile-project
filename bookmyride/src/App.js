import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RideProvider } from './context/RideContext'; // ✅ context provider added

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RideStatus from './pages/RideStatus';
import Rewards from './pages/Rewards';
import Games from './pages/Games';

// Optional standalone map test route
import MapComponent from './components/MapComponent';

// Leaflet styles
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function App() {
  return (
    <RideProvider> {/* ✅ Wrap the whole app with context */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ride-status" element={<RideStatus />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/games" element={<Games />} />
          <Route path="/map" element={<MapComponent />} /> {/* Optional route */}
        </Routes>
      </Router>
    </RideProvider>
  );
}

export default App;
