import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import BookingForm from './BookingForm';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('access_token');
      navigate('/');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Customer Dashboard</h1>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="inventory" style={styles.navLink}>View Inventory</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="add-inventory" style={styles.navLink}>Add Inventory</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="book-move" style={styles.navLink}>Book a Move</Link>
          </li>

        </ul>
      </nav>
      <Routes>
        <Route path="inventory" element={<InventoryList />} />
        <Route path="add-inventory" element={<InventoryForm />} />
        <Route path="book-move" element={<BookingForm />} />
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
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
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

export default CustomerDashboard;
