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
    navigate('/Home');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {user.role === 'user' }
      {(user.role === 'user' || user.role === 'mover')  }
      {user.id ? (
        <>
        <Link to="/profile">Profile</Link>
         <Link to="/inventory">Inventory</Link>
         <Link to="/quotes">Quotes</Link>
         <Link to="/moves">Moves</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
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
