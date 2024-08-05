import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default AppRoutes;
