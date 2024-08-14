import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import MoverBookings from './MoverBookings';
import './MoverDashboard.css'

const MoverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('access_token');
      navigate('/');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mover Dashboard</h1>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="bookings" style={styles.navLink}>View Bookings</Link>
          </li>

        </ul>
      </nav>
      <Routes>
        <Route path="bookings" element={<MoverBookings />} />
      </Routes>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>

    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoutButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default MoverDashboard;
