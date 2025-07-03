import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (send to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/contact-us', {
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
        name: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/images/contact_us.png)', // Your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row', // Row layout for side-by-side placement
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'flex-start', // Align items from the top
        padding: '20px',
        fontFamily: 'Poppins, sans-serif', // Apply stylish font (Poppins)
      }}
    >
      {/* Left Side - Contact Form */}
      <div className="max-w-lg w-full md:w-2/3 p-8 bg-white rounded-lg shadow-lg mt-12">
        <h3 className="text-5xl font-light text-center mb-6 text-blue-600">Contact Us</h3>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-2xl font-light text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md text-lg"
              required
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
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

          {/* Message Field */}
          <div className="mb-6">
            <label className="block text-2xl font-light text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md text-lg"
              rows="5"
              required
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mb-6 text-center">
            <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md text-xl">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right Side - Our Location & Meet Our Team */}
      <div className="w-full md:w-1/2 text-white mt-12">
        {/* Our Location */}
        <div className="mt-32 mb-8">
          <h4 className="text-6xl font-light text-center mb-8">Our Location</h4>
          <div className="flex justify-center items-center flex-wrap gap-4">
            <div className="w-full md:w-1/2 p-4">
              <p className="text-3xl font-light mb-8">Headquarters India</p>
              <p className="text-xl mb-3">YuvaKeedaVikas</p>
              <p className="text-xl">Raintree Marg, near Bharati Vidyapeeth</p>
              <p className="text-xl">Sector 7, CBD Belapur,</p>
              <p className="text-xl">Navi Mumbai, Maharashtra 400614</p>
              <p className="text-xl">fax: +91 987 654 3211</p>
              <p className="text-xl">
                email: <a href="mailto:info@yuva-keeda.com" className="text-white-600 hover:underline">info@yuva-keeda.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="w-full text-center mt-12">
          <h4 className="text-4xl font-light text-white mb-8">Meet Our Team</h4>
          <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col items-center">
      <div className="relative group w-36 h-36">
        <img
          src="/images/Swati.png"
          alt="Swati"
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white font-semibold text-lg">
          <span>Role: Admin</span>
        </div>
      </div>
      <p className="mt-2 text-white text-2xl font-medium">Swati</p>
    </div>

    {/* Team Member 2 */}
    <div className="flex flex-col items-center">
      <div className="relative group w-36 h-36">
        <img
          src="/images/Vishal.png"
          alt="Vishal"
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white font-semibold text-lg">
          <span>Role: Admin</span>
        </div>
      </div>
      <p className="mt-2 text-white text-2xl font-medium">Vishal</p>
    </div>

    {/* Team Member 3 */}
    <div className="flex flex-col items-center">
      <div className="relative group w-36 h-36">
        <img
          src="/images/Umesh.png"
          alt="Umesh"
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white font-semibold text-lg">
          <span>Role: Admin</span>
        </div>
      </div>
      <p className="mt-2 text-white text-2xl font-medium">Umesh</p>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;