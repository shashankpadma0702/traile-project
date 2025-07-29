import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
        Buddy Book My Ride
      </h1>
      <div className="space-x-4">
        <button onClick={() => navigate('/dashboard')}>Home</button>
        <button onClick={() => navigate('/rewards')}>Rewards</button> {/* 👈 ADD THIS LINE */}
        <button onClick={() => navigate('/games')}>Games</button>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
