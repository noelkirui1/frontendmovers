// components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useContext(UserContext);

  if (!user.id || (roles && !roles.includes(user.role))) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
