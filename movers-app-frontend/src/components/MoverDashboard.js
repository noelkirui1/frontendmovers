import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function MoverDashboard() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Optional: Call the backend to log out (if needed)
            await fetch('http://127.0.0.1:5555/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // Clear user information from context
            setUser(null);

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            alert('An error occurred while logging out. Please try again.');
        }
    };

    return (
        <div>
            <h1>Mover Dashboard</h1>
            <p>Welcome to your dashboard, Mover!</p>
            {/* You can add more components or details here */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default MoverDashboard;