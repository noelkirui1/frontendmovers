import React, { useState } from 'react';

const BookingsForm = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [movingDate, setMovingDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve the access token from local storage
    const token = localStorage.getItem('access_token');
    
    try {
      const response = await fetch('http://localhost:5555/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
        },
        body: JSON.stringify({
          current_location: currentLocation,
          new_location: newLocation,
          moving_date: movingDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to book move');

      setCurrentLocation('');
      setNewLocation('');
      setMovingDate('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={currentLocation}
        onChange={(e) => setCurrentLocation(e.target.value)}
        placeholder="Current Location"
        required
      />
      <input
        type="text"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
        placeholder="New Location"
        required
      />
      <input
        type="date"
        value={movingDate}
        onChange={(e) => setMovingDate(e.target.value)}
        required
      />
      <button type="submit">Book Move</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default BookingsForm;
