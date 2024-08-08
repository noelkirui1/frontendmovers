// components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ id: null, username: '', email: '', role: '' });
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/moves">Moves</Link>
      {user.role === 'admin' && <Link to="/inventory">Inventory</Link>}
      {(user.role === 'admin' || user.role === 'mover') && <Link to="/quotes">Quotes</Link>}
      {user.id ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
