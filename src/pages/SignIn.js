import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();
    alert(result.message);
  
    if (response.ok) {
      // ✅ Save the email to localStorage
      localStorage.setItem('user', JSON.stringify({ email: formData.email }));
  
      onLogin(); // 🔥 trigger parent state change
      navigate('/'); // 🔥 go to homepage (re-render)
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: 'url(/images/contact_us.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-5xl font-light text-center mb-6 text-blue-600">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-2xl font-light text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md text-lg"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-2xl font-light text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md text-lg"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6 text-center">
            <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md text-xl">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;