



import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Camera from './components/Camera';
import Collection from './components/Collection';
import Upload from './components/Upload';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import WelcomePage from './components/WelcomePage';
import './style.css';

const Home = ({ onLogout, image }) => (
  <div className="home-container">
    <h2 className="home-title">Explore-Me</h2>
    <nav className="home-nav">
      <Link to="/camera" className="nav-button camera-button nav-link">Camera</Link>
      <Link to="/upload" className="nav-button camera-button nav-link">Upload</Link>
      <Link to="/collection" className="nav-button camera-button nav-link">Collection</Link>
     <button className="nav-button camera-button nav-link" onClick={onLogout}>Logout</button>
    </nav>
    <p className='hi'>Most Recently Searched Things...</p>
    <img src={image} alt="Home" className="home-image" />
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [welcomePageImage, setWelcomePageImage] = useState('/ok2.png'); // Set the default image path

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSetWelcomePageImage = (image) => {
    setWelcomePageImage(image);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage image={welcomePageImage} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup onSignupSuccess={handleSignupSuccess} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} image={welcomePageImage} /> : <Navigate to="/" />} />
        <Route path="/camera" element={<Camera onSetWelcomePageImage={handleSetWelcomePageImage} />} />
        <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/" />} />
        <Route path="/collection" element={isAuthenticated ? <Collection /> : <Navigate to="/" />} />
        <Route path="/logout" element={isAuthenticated ? <Logout onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;




