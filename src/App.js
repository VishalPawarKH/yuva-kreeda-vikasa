import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Booking from './pages/Booking';
import ContactUs from './pages/ContactUs';
import Registration from './pages/Registration';
import SignIn from './pages/SignIn';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <header className="bg-gray-800 text-white z-10 relative">
      <nav className="flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center">
  <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
  <h1 className="text-3xl font-light ml-2">YuvaKreedaVikas</h1>
</Link>

        <div className="flex space-x-6">
          <Link to="/contact-us" className="text-white hover:text-blue-400">Contact Us</Link>
          {isLoggedIn && (
            <Link to="/book-facility" className="text-white hover:text-blue-400">Booking</Link>
          )}
          {!isLoggedIn && (
            <Link to="/registration" className="text-white hover:text-blue-400">Registration</Link>
          )}
          {!isLoggedIn ? (
            <Link to="/signin" className="text-white hover:text-blue-400">Sign In</Link>
          ) : (
            <button onClick={handleLogout} className="text-white hover:text-red-400">Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
}

function Home({ athletesEnrolled, districtsActive, matchesConducted, talentsIdentified }) {
  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/olympic-medals-scaled.jpeg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Unleashing the Power of India's Young Athletes</h1>
            <p className="text-lg md:text-2xl mb-8">A Platform Where Passion Meets Performance. Empowering the Future of Sports, One Athlete at a Time.</p>
          </div>
        </div>
      </header>

      {/* Join the Movement */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
        <p className="mb-6">Whether you’re an athlete, coach, or sports official, there's a place for you in YuvaKeedaVikas.</p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link to="/registration"><button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm an Athlete</button></Link>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm a Coach</button>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm a District Official</button>
        </div>
      </section>

      {/* Focus Sports */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Focus Sports</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
          {['Cricket', 'Badminton', 'Shooting', 'Wrestling', 'Hockey'].map((sport, index) => (
            <div key={index} className="sport-image-container">
              <img src={`/images/${sport}.png`} alt={sport} className="sport-image" />
              <h3 className="sport-name">{sport.replace('_1', '')}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Impact So Far</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div><p className="text-4xl font-bold text-blue-600">{athletesEnrolled}+</p><p>Athletes Enrolled</p></div>
          <div><p className="text-4xl font-bold text-blue-600">{districtsActive}+</p><p>Districts Active</p></div>
          <div><p className="text-4xl font-bold text-blue-600">{matchesConducted}+</p><p>Matches Conducted</p></div>
          <div><p className="text-4xl font-bold text-blue-600">{talentsIdentified}+</p><p>Talents Identified</p></div>
        </div>
      </section>
    </>
  );
}

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [athletesEnrolled, setAthletesEnrolled] = useState(0);
  const [districtsActive, setDistrictsActive] = useState(0);
  const [matchesConducted, setMatchesConducted] = useState(0);
  const [talentsIdentified, setTalentsIdentified] = useState(0);

  useEffect(() => {
    const countUp = (start, end, setState) => {
      let current = start;
      const increment = Math.ceil((end - start) / 900);
      const interval = setInterval(() => {
        if (current < end) {
          current += increment;
          setState(current);
        } else {
          clearInterval(interval);
          setState(end);
        }
      }, 10);
    };

    countUp(0, 50000, setAthletesEnrolled);
    countUp(0, 700, setDistrictsActive);
    countUp(0, 800, setMatchesConducted);
    countUp(0, 1200, setTalentsIdentified);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.volume = 0.01;
      audio.play().then(() => setIsPlaying(true)).catch(err => console.error('Error auto-playing audio:', err));
    }
  }, []);

  const handleAudioPlay = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.volume = 0.01;
      audio.play().then(() => setIsPlaying(true)).catch(err => console.error('Error playing audio:', err));
    }
  };

  const handleAudioPause = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    isPlaying ? handleAudioPause() : handleAudioPlay();
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <ScrollToTop />
      <audio ref={audioRef} id="background-music" loop>
        <source src="/music/Olympic_Music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={toggleAudio} className="fixed bottom-10 right-10 p-3 bg-blue-600 text-white rounded-full shadow-lg">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>

      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home
          athletesEnrolled={athletesEnrolled}
          districtsActive={districtsActive}
          matchesConducted={matchesConducted}
          talentsIdentified={talentsIdentified}
        />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/book-facility" element={isLoggedIn ? <Booking /> : <SignIn onLogin={handleLogin} />} />
      </Routes>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 YuvaKreedaVikas. All Rights Reserved.</p>
      </footer>
    </Router>
  );
}

export default App;