import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MoversApp</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="btn login-btn">Login/Sign Up</Link>
      </nav>
      <div className="cta">
        <Link to="/quote" className="btn cta-btn">Get a Quote</Link>
      </div>
    </header>
  );
}

export default Header;
