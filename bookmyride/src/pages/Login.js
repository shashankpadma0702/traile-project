// src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // ✅ Import from api.js

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response?.token) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard'); // ✅ redirect after login
      } else {
        alert('Login failed: Invalid response from server');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed: ' + (error?.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="mb-3 p-2 w-full border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Log In
        </button>
        <p className="text-sm mt-2 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </form>
    </div>
  );
}
