import React, { useState } from 'react';

function BookingPage() {
  const [formData, setFormData] = useState({
    sport: 'Cricket',
    location: '',
    facility: '',
    booking_date: '',
    start_time: '',
    end_time: '',
    reason: 'Training',
  });

  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("User not signed in. Please sign in to book.");
      return;
    }

    const dataToSend = {
      ...formData,
      email,
    };

    try {
      const response = await fetch('http://localhost:5000/book-facility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Booking Successful!');
        setFormData({
          sport: 'Cricket',
          location: '',
          facility: '',
          booking_date: '',
          start_time: '',
          end_time: '',
          reason: 'Training',
        });
      } else {
        alert('Error booking: ' + result.message);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong while booking.");
    }
  };

  const fetchMyBookings = async () => {
    if (!email) {
      alert("User not signed in.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/my-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const result = await response.json();
      setBookings(result.bookings);
      setShowBookings(true);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Something went wrong.");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch('http://localhost:5000/cancel-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Booking cancelled successfully");
        fetchMyBookings();
      } else {
        alert("Error cancelling booking: " + result.message);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Something went wrong while cancelling.");
    }
  };

  return (
    <div
      className="booking-container"
      style={{
        backgroundImage: 'url(/images/book_facility.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        flexDirection: 'column'
      }}
    >
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center mb-6">Booking a Facility</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Sport</label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="Cricket">Cricket</option>
              <option value="Badminton">Badminton</option>
              <option value="Shooting">Shooting</option>
              <option value="Wrestling">Wrestling</option>
              <option value="Hockey">Hockey</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Facility</label>
            <input
              type="text"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Booking Date</label>
            <input
              type="date"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Reason</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="Training">Training</option>
              <option value="Trial">Trial</option>
              <option value="Match">Match</option>
              <option value="Camp">Camp</option>
            </select>
          </div>

          <div className="mb-4 text-center flex justify-between">
            <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md">
              Book Now
            </button>
            <button type="button" onClick={fetchMyBookings} className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md">
              My Bookings
            </button>
          </div>
        </form>
      </div>

      {showBookings && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h4 className="text-xl font-bold mb-4">My Bookings</h4>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id} className="mb-4 p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <p><strong>Sport:</strong> {booking.sport}</p>
                    <p><strong>Date:</strong> {booking.booking_date}</p>
                    <p><strong>Time:</strong> {booking.start_time} - {booking.end_time}</p>
                    <p><strong>Facility:</strong> {booking.facility}</p>
                  </div>
                  <button onClick={() => cancelBooking(booking.booking_id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingPage;