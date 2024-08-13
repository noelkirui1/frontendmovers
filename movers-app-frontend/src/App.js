// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import MoverDashboard from './components/MoverDashBoard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Customer/*" element={<CustomerDashboard />} />
          <Route path="/Mover/*" element={<MoverDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
