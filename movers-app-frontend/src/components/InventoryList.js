
import React, { useEffect, useState } from 'react';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5555/inventory', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 404) {
          const errorData = await response.json();
          setError(errorData.msg || 'No inventory found.');
          setInventory([]);
        } else if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const items = await response.json();
          setInventory(items);
          setError(null);
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Inventory</h2>
      {error && <p style={styles.error}>{error}</p>}
      {inventory.length === 0 && !error ? (
        <p style={styles.message}>No inventory found.</p>
      ) : (
        <ul style={styles.list}>
          {inventory.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <h3 style={styles.itemTitle}>{item.house_type}</h3>
              <p style={styles.itemDetails}>{JSON.stringify(item.items)}</p>
            </li>
          ))}
        </ul>
      )}
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
    marginBottom: '15px',
  },
  error: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  message: {
    color: '#95a5a6',
    fontStyle: 'italic',
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    marginBottom: '10px',
    borderRadius: '4px',
    backgroundColor: '#fafafa',
  },
  itemTitle: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#34495e',
    marginBottom: '5px',
  },
  itemDetails: {
    color: '#7f8c8d',
  },
};

export default InventoryList;
