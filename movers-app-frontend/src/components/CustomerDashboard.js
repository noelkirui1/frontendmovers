import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import BookingForm from './BookingForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <header style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Your Dashboard</h1>
        <p style={styles.heroSubtitle}>Manage your inventory, book a move, and more!</p>
        <button onClick={() => navigate('inventory')} style={styles.ctaButton}>Get Started</button>
      </header>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="inventory" style={styles.navLink}>
              <FontAwesomeIcon icon={faList} style={styles.icon} /> View Inventory
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="add-inventory" style={styles.navLink}>
              <FontAwesomeIcon icon={faPlus} style={styles.icon} /> Add Inventory
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="book-move" style={styles.navLink}>
              <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} /> Book a Move
            </Link>
          </li>
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.logoutButton}>
              <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} /> Logout
            </button>
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
    width: '100%',
    height: '100vh',
    margin: 'auto',
    padding: '0',
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f0f0f0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)', // Gradient from yellow to orange
    color: '#fff',
    textAlign: 'center',
    padding: '100px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heroTitle: {
    fontSize: '48px',
    margin: '0',
    fontWeight: '700',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  heroSubtitle: {
    fontSize: '24px',
    margin: '20px 0',
  },
  ctaButton: {
    padding: '15px 30px',
    backgroundColor: '#fff',
    color: '#e67e22',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navbar: {
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: '100%',
  },
  navItem: {
    margin: '0 10px',
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#e67e22',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
  navLinkHover: {
    backgroundColor: '#d35400',
  },
  logoutButton: {
    marginLeft: 'auto',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
  logoutButtonHover: {
    backgroundColor: '#c0392b',
  },
  content: {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    flex: '1',
    overflowY: 'auto',
  },
  icon: {
    marginRight: '8px',
  },
};

export default CustomerDashboard;
