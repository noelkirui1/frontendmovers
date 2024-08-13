// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Inventory from './components/Inventory';
import Quote from './components/Quote';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Move from './components/Moves';
import AdminDashboard from './components/AdminDashboard';
import MoverDashboard from './components/MoverDashboard';
import CustomerDashboard from './components/CustomerDashboard';




const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/quotes" element={<Quote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<Move />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/mover/dashboard" element={<MoverDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />



        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
