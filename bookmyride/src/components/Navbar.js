import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // ✅ Adjust if your path is different

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <button className="navbar-button" onClick={() => navigate('/dashboard')}>
        Home
      </button>
      <button className="navbar-button" onClick={() => navigate('/rewards')}>
        Rewards
      </button>
      <button className="navbar-button" onClick={() => navigate('/games')}>
        Games
      </button>
      <button className="navbar-button logout" onClick={() => navigate('/')}>
        Logout
      </button>
    </div>
  );
}
