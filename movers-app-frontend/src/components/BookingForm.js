import React, { useState, useEffect } from 'react';

const BookingsForm = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [movingDate, setMovingDate] = useState('');
  const [movers, setMovers] = useState([]);
  const [selectedMover, setSelectedMover] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch mover companies when component mounts
  useEffect(() => {
    const fetchMovers = async () => {
      try {
        const response = await fetch('http://localhost:5555/movers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mover companies');
        }

        const movers = await response.json();
        setMovers(movers);
        setSelectedMover(movers[0]?.id || ''); // Set default to first company
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('http://localhost:5555/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_location: currentLocation,
          new_location: newLocation,
          moving_date: movingDate,
          mover_id: selectedMover, // Include selected mover company ID
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('access_token');
          window.location.href = '/login';
          return;
        }
        throw new Error('Failed to book move');
      }

      setSuccess('Move booked successfully!');
      setCurrentLocation('');
      setNewLocation('');
      setMovingDate('');
      setSelectedMover(movers[0]?.id || '');
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
      <select
        value={selectedMover}
        onChange={(e) => setSelectedMover(e.target.value)}
        required
      >
        {movers.map((mover) => (
          <option key={mover.id} value={mover.id}>
            {mover.name}
          </option>
        ))}
      </select>
      <button type="submit">Book Move</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default BookingsForm;
