import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    birthdate: '',
    gender: 'Male',
    mobile: '',
    address: '',
    emergency_contact: '',
    password: '', // New password field
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register-athlete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message); // Display success or error message
    if (response.ok) {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        birthdate: '',
        gender: 'Male',
        mobile: '',
        address: '',
        emergency_contact: '',
        password: '', // Reset password field after registration
      });
    }
  };

  return (
    <div
      className="registration-container"
      style={{
        backgroundImage: 'url(/images/registration.png)', // Your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center', // Center form horizontally
        alignItems: 'center', // Center form vertically
        padding: '20px',
      }}
    >
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center mb-6">Athlete Registration</h3>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Age Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Birthdate Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Mobile Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Emergency Contact Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Emergency Contact</label>
            <input
              type="tel"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4 text-center">
            <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;