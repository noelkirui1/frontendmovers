import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import BookingForm from './BookingForm';

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
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </li>
        </ul>
      </nav>
      <div style={styles.content}>
        <Routes>
          <Route path="inventory" element={<InventoryList />} />
          <Route path="add-inventory" element={<InventoryForm />} />
          <Route path="book-move" element={<BookingForm />} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    marginTop: '60px',
    padding: '25px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f4f4f9',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '36px',
    fontWeight: '700',
  },
  navbar: {
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '25px',
    backgroundColor: '#e67e22', // Orange background
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  logoutButton: {
    marginLeft: 'auto', // Pushes the logout button to the right
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  content: {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
  },
};

export default CustomerDashboard;
