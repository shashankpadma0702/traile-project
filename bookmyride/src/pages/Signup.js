// src/pages/Signup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api'; // ✅ Fixed: correct import

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      alert('✅ Signup successful! Please log in.');
      navigate('/');
    } catch (err) {
      console.error('Signup Error:', err);
      alert('Signup failed: ' + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="mb-3 p-2 w-full border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-3 p-2 w-full border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Sign Up
        </button>

        <p className="text-sm mt-2 text-center">
          Already have an account? <a href="/" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
}
