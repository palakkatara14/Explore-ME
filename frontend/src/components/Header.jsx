import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <h3>EXPLORE ME</h3>
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
          <button><Link to="/signup">Get Started</Link></button> 
        </nav>
      </div>
    </header>
  );
};

export default Header;