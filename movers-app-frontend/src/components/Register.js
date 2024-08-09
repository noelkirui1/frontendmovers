import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data);
      navigate('/Profile');
    } else {
      console.error('Registration failed:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label>
        Role:
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="company">Company</option>
        </select>
      </label>
      <button type="submit">Register</button>
      <p className="sign-in-link">
        Already have an account? <a href="/login">Sign in here</a>.
      </p>
    </form>
  );
};

export default Register;
