import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import BookingForm from './BookingForm';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // removeToken();
    navigate('/');
    localStorage.removeItem('access_token')
  };

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="inventory">View Inventory</Link></li>
          <li><Link to="add-inventory">Add Inventory</Link></li>
          <li><Link to="book-move">Book a Move</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="inventory" element={<InventoryList />} />
        <Route path="add-inventory" element={<InventoryForm />} />
        <Route path="book-move" element={<BookingForm />} />
      </Routes>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CustomerDashboard;
