// components/Move.js
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const Move = () => {
  const { id } = useParams();
  const [move, setMove] = useState({ move_date: '', location: '', user_id: '' });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMove = async () => {
      const response = await fetch(`/moves/${id}`);
      const data = await response.json();
      setMove(data);
    };

    fetchMove();
  }, [id]);

  const handleChange = (e) => {
    setMove({ ...move, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/moves/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(move)
    });
    if (response.ok) {
      navigate('/');
    } else {
      console.error('Update failed');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/moves/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      navigate('/');
    } else {
      console.error('Delete failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Move</h2>
      <label>
        Move Date:
        <input type="datetime-local" name="move_date" value={move.move_date} onChange={handleChange} required />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={move.location} onChange={handleChange} required />
      </label>
      <button type="submit">Update</button>
      {user.role === 'admin' && <button type="button" onClick={handleDelete}>Delete</button>}
    </form>
  );
};

export default Move;
