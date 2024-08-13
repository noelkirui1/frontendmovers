import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
        // Optional: Call the backend to log out (if needed)
        await fetch('http://127.0.0.1:5555/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        // Clear user information from context or local storage
        setUsers(null);

        // Redirect to login page
        navigate('/login');
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred while logging out. Please try again.');
    }
};

  useEffect(() => {
    // Fetch the list of users from the backend (replace with your API endpoint)
    fetch(' http://127.0.0.1:5555/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <h2>Users List:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
      {/* Add more admin functionalities here */}
      <button onClick={handleLogout} >Logout</button>
    </div>
  );
}

export default AdminDashboard;
