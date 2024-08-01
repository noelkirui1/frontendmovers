// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../images/logo.png';


function Header() {
  return (
    <header className="header">
      <div className="image-container">
        <img src={logo} alt="Company logo" className="logo" />
      </div>
      <div className="company-name">MOVERS TRUSTED MOVING COMPANY</div>
      <div className="nav-links">
      <button className="login-btn">Login</button>
      <button className="signup-btn">Sign Up with Email</button>
    </div>
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
      
    </header>
  );
}

export default Header;
