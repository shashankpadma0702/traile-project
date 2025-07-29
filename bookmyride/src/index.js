import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RideProvider } from './context/RideContext'; // ✅ import context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RideProvider> {/* ✅ Wrap the app */}
      <App />
    </RideProvider>
  </React.StrictMode>
);
