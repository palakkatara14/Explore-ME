



import React from 'react';
import '../about.css'

const About = () => {
  return (
    <section id="about" className="section">
      <div className="about-content">
        <img src="./about.png" alt="About" className="about-image" />
        <div className="about-text">
         
          <p className="section-text">
            Designed and Built for
          </p>
          <p className='text1'>
            Curiousers
          </p>
          <p className='text2'>
          This website allows users to upload an image, generating related text and similar images, and save image information to view in their personalized collection for easy reference and inspiration.
          </p>

        </div>
       
      </div>
    </section>
  );
};

export default About;