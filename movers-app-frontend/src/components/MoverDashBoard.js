import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import MoverBookings from './MoverBookings';
import './MoverDashboard.css'

const MoverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/');
  };

  return (
    <div>
      <h1>Mover Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="bookings">View Bookings</Link></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
      <Routes>
        <Route path="bookings" element={<MoverBookings />} />
      </Routes>
      
    </div>
  );
};

export default MoverDashboard;