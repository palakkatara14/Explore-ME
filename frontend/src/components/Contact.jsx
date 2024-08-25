


import React from 'react';
import '../contact.css'

const Contact = () => {
  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="contact-container">
      <p className="contact-label">Contact Us:</p>
      <div className="contact-links">
        <p className="contact-link" onClick={() => handleLinkClick('https://www.instagram.com')}>
          Instagram
        </p>
        <p className="contact-link" onClick={() => handleLinkClick('https://www.twitter.com')}>
          Twitter
        </p>
        <p className="contact-link" onClick={() => handleLinkClick('https://www.google.com')}>
          Google
        </p>
      </div>
    </div>
  );
};

export default Contact;
