


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../WelcomePage.css';
import About from './About';
import HowItWorks from './HowItWorks';
import Contact from './Contact';

const WelcomePage = () => {
  const [currentSection, setCurrentSection] = useState('about');

  return (
    <div className="welcome-page">
      <header className="header">
        <span className="heading">EXPLORE-ME</span>
        <nav className="nav">
          <ul>
            <li>
              <Link to="#" onClick={() => setCurrentSection('about')}>About</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setCurrentSection('how-it-works')}>How it Works</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setCurrentSection('contact')}>Contact Us</Link>
            </li>
          </ul>
        </nav>
        <Link to="/signup" className='get-started-link'>
          <button id="get-started" className="get-started-btn">Get Started</button>
        </Link>
      </header>
      <main className="main">
        {currentSection === 'about' && <About />}
        {currentSection === 'how-it-works' && <HowItWorks />}
        {currentSection === 'contact' && <Contact />}
      </main>
    </div>
  );
};

export default WelcomePage;
