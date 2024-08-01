import React from 'react';
import './MainContent.css';
import image from '../images/image.png';


function MainContent() {
  return (
    <div className="image-container">
        <img src={image} alt="Descriptive Alt Text" className="image" />
    <div className="main-content">
      <h1>Trusted Movers in Kenya</h1>
      <p>
        With 15 years of experience, industry knowledge, and lots of satisfied customers,
        we are the best moving company in Kenya!
      </p>
      <div className="services">
        <h2>Professional Services</h2>
        <p>
          Our secure and accessible 45,000 sqft storage facility is ready to receive and
          store your goods.
        </p>
      </div>
    </div>
    </div>
  );
}

export default MainContent;
