import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

// Import the logo image
import logo from '../images/logo.png';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/logout', { method: 'DELETE' });

      if (response.ok) {
        setUser({ id: null, username: '', email: '', role: '' });
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav>
      <div className="nav-content">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Company Logo" className="logo" />
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user.id ? (
            <>
              <Link to="/admin/dashboard">AdminDashboard</Link>
              {user.role === 'user' && <Link to="/inventory">Inventory</Link>}
              {(user.role === 'user' || user.role === 'mover') && (
                <>
                  <Link to="/quotes">Quotes</Link>
                  <Link to="/moves">Moves</Link>
                </>
              )}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;