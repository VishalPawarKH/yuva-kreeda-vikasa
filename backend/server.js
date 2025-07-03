const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express application
const app = express();
const port = 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cdac',  // Set your password here
  database: 'yuva_kreeda_vikasa', // The database you created
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// POST request to register an athlete
app.post('/register-athlete', (req, res) => {
  const { first_name, last_name, email, age, birthdate, gender, mobile, address, emergency_contact, password } = req.body;

  // Log the incoming data to verify
  console.log('Received athlete registration data:', req.body);

  // SQL query to insert data into the players table
  const query = `
    INSERT INTO players (first_name, last_name, email, age, birthdate, gender, mobile, address, emergency_contact, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [first_name, last_name, email, age, birthdate, gender, mobile, address, emergency_contact, password], (err, result) => {
    if (err) {
      // Log error message and send detailed response
      console.error('Error registering athlete:', err);
      return res.status(500).json({ message: 'Error registering athlete', error: err.message });
    }
    return res.status(200).json({ message: 'Athlete registered successfully', playerId: result.insertId });
  });
});



// POST request to book facility
app.post('/book-facility', (req, res) => {
  const { email, sport, location, facility, booking_date, start_time, end_time, reason } = req.body;

  // Log booking data to verify
  console.log('Received booking data:', req.body);

  // Check if the slot is available
  const checkAvailabilityQuery = `
    SELECT * FROM bookings WHERE booking_date = ? AND start_time = ? AND facility = ?;
  `;

  db.query(checkAvailabilityQuery, [booking_date, start_time, facility], (err, result) => {
    if (err) {
      console.error('Error checking availability:', err);
      return res.status(500).json({ message: 'Error checking availability', error: err.message });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'Slot is already booked' });
    }

    // Proceed with booking if available
    const query = `
      INSERT INTO bookings (email, sport, location, facility, booking_date, start_time, end_time, reason)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [email, sport, location, facility, booking_date, start_time, end_time, reason], (err, result) => {
      if (err) {
        console.error('Error booking facility:', err);
        return res.status(500).json({ message: 'Error booking facility', error: err.message });
      }
      return res.status(200).json({ message: 'Booking confirmed', bookingId: result.insertId });
    });
  });
});


// POST request to handle Contact Us form submission
app.post('/contact-us', (req, res) => {
  const { name, email, message } = req.body;

  // Log the incoming data to verify
  console.log('Received contact us form data:', req.body);

  // SQL query to insert data into the contact_us table
  const query = `
    INSERT INTO contact_us (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      // Log error message and send detailed response
      console.error('Error saving contact form:', err);
      return res.status(500).json({ message: 'Error saving contact form', error: err.message });
    }
    return res.status(200).json({ message: 'Your message has been successfully sent!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// POST request to handle SignIn
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Log the incoming data for verification
  console.log('Received Sign In data:', req.body);

  // Query to check if the user exists and if the password matches
  const query = `
    SELECT * FROM players WHERE email = ? AND password = ?
  `;

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error during Sign In:', err);
      return res.status(500).json({ message: 'Error during sign-in', error: err.message });
    }

    if (result.length > 0) {
      return res.status(200).json({ message: 'Sign In successful!' });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  });
});

app.post('/my-bookings', (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * FROM bookings WHERE email = ? ORDER BY booking_date DESC`;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ message: 'Error fetching bookings' });
    } else {
      res.status(200).json({ bookings: results });
    }
  });
});

// ✅ POST /cancel-booking
app.post('/cancel-booking', (req, res) => {
  const { booking_id } = req.body;

  const sql = `DELETE FROM bookings WHERE booking_id = ?`;

  db.query(sql, [booking_id], (err, result) => {
    if (err) {
      console.error('Error cancelling booking:', err);
      res.status(500).json({ message: 'Cancellation failed' });
    } else {
      res.status(200).json({ message: 'Booking cancelled successfully' });
    }
  });
});