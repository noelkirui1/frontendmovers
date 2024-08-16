import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryForm = () => {
  const [houseType, setHouseType] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1 }]);
  const [homeTypes, setHomeTypes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeTypes = async () => {
      try {
        const response = await fetch('http://localhost:5555/home_types');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const types = await response.json();
        setHomeTypes(types);
      } catch (error) {
        console.error('Failed to fetch home types:', error);
        setError('Failed to load home types. Please try again later.');
      }
    };

    fetchHomeTypes();
  }, []);

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    setItems(prevItems =>
      prevItems.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAddItem = () => setItems([...items, { name: '', quantity: 1 }]);

  const handleRemoveItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    console.log('Token retrieved:', token);

    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const inventoryData = {
        house_type: houseType,
        items: items.map(item => ({
          name: item.name.trim(),
          quantity: parseInt(item.quantity, 10) || 1
        }))
      };

      if (inventoryData.items.some(item => !item.name || item.quantity < 1)) {
        setError('Please provide valid item names and quantities.');
        return;
      }

      const response = await fetch('http://localhost:5555/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inventoryData)
      });
      console.log(token);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        if (response.status === 401) {
          setError('Unauthorized: Please check your authentication token.');
        } else if (response.status === 400) {
          setError(errorData.msg || 'Bad request');
        } else if (response.status === 500) {
          setError('Internal server error. Please try again later.');
        } else {
          setError(`Error: ${errorData.msg || 'Network response was not ok'}`);
        }
        return;
      }

      alert('Inventory created successfully');
      navigate('/customer');
    } catch (error) {
      console.error('Error creating inventory:', error);
      setError('Failed to create inventory. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Inventory</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          House Type
          <select value={houseType} onChange={(e) => setHouseType(e.target.value)} required style={styles.select}>
            <option value="">Select House Type</option>
            {homeTypes.map((type) => (
              <option key={type.id} value={type.type}>{type.type}</option>
            ))}
          </select>
        </label>

        <div style={styles.itemsContainer}>
          <h3 style={styles.subtitle}>Items</h3>
          {items.map((item, index) => (
            <div key={index} style={styles.itemForm}>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(event) => handleItemChange(index, event)}
                placeholder="Item Name"
                required
                style={styles.input}
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(event) => handleItemChange(index, event)}
                placeholder="Quantity"
                min="1"
                required
                style={styles.input}
              />
              <button type="button" onClick={() => handleRemoveItem(index)} style={styles.removeButton}>Remove Item</button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem} style={styles.addButton}>Add  Item</button>
        </div>

        <button type="submit" style={styles.submitButton}>Add Inventory</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  error: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '500',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '16px',
  },
  itemsContainer: {
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#34495e',
    marginBottom: '15px',
  },
  itemForm: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
    fontSize: '16px',
    flex: '1',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  addButton: {
    backgroundColor: 'orange',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  submitButton: {
    backgroundColor: 'dark orange',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
};

export default InventoryForm;
