// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import {useNavigate} from 'react-router-dom';


function Header() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/SignUp'); // Navigate to the Sign-Up page

  };
  const handleLoginClick = () => {
    navigate('/Login');
  };
  const handleHomeClick = () => {
    navigate('/Home');
  }
  return (
    <header className="header">
      <div className="image-container">
        <img src={logo} alt="Company logo" className="logo" />
      </div>
      <div className="company-name">MOVERS SOLUTION </div>
      <div className="nav-links">
      <button onClick={handleHomeClick} className='signup-btn'>Home</button>
      <button onClick={handleLoginClick} className="login-btn">Login</button>
      <button onClick={handleSignUpClick} className='signup-btn'>Sign Up</button>
    </div>
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
      
      
    </header>
  );
}

export default Header;
