// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Move from './components/user_dashboard';
import Inventory from './components/Inventory';
import Quote from './components/Quote';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/moves" element={<ProtectedRoute component={Move} roles={[ 'user']} />} />
          <Route path="/inventory" element={<ProtectedRoute component={Inventory} roles={['user']} />} />
          <Route path="/quotes" element={<ProtectedRoute component={Quote} roles={['user', 'company']} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
