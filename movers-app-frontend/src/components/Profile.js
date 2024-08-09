// components/Profile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
