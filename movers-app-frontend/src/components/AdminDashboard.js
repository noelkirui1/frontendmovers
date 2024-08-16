
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaRegCheckCircle, FaRegTimesCircle, FaTrash, FaArrowLeft } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [movers, setMovers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMover, setSelectedMover] = useState(null);

  useEffect(() => {
    const fetchCustomersAndMovers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = { Authorization: `Bearer ${token}` };

        const customersResponse = await fetch('http://127.0.0.1:5555/customers', { headers });
        if (!customersResponse.ok) throw new Error('Failed to fetch customers');
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        const moversResponse = await fetch('http://127.0.0.1:5555/movers', { headers });
        if (!moversResponse.ok) throw new Error('Failed to fetch movers');
        const moversData = await moversResponse.json();
        setMovers(moversData);
      } catch (error) {
        console.error('Error fetching data', error);
        if (error.message === 'Failed to fetch customers' || error.message === 'Failed to fetch movers') {
          navigate('/');
        }
      }
    };

    fetchCustomersAndMovers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  const approveMover = async (moverId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:5555/approve_mover/${moverId}`, {
        method: 'POST',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to approve mover');
      setMovers((prevMovers) =>
        prevMovers.map((mover) =>
          mover.id === moverId ? { ...mover, approved: true } : mover
        )
      );
    } catch (error) {
      console.error('Error approving mover', error);
    }
  };

  const rejectMover = async (moverId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:5555/reject_mover/${moverId}`, {
        method: 'POST',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to reject mover');
      setMovers((prevMovers) =>
        prevMovers.map((mover) =>
          mover.id === moverId ? { ...mover, approved: false } : mover
        )
      );
    } catch (error) {
      console.error('Error rejecting mover', error);
    }
  };

  const deleteMover = async (moverId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:5555/delete_mover/${moverId}`, {
        method: 'DELETE',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to delete mover');
      setMovers((prevMovers) => prevMovers.filter((mover) => mover.id !== moverId));
    } catch (error) {
      console.error('Error deleting mover', error);
    }
  };

  const approveCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:5555/approve_customer/${customerId}`, {
        method: 'POST',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to approve customer');
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === customerId ? { ...customer, approved: true } : customer
        )
      );
    } catch (error) {
      console.error('Error approving customer', error);
    }
  };

  const rejectCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:5555/reject_customer/${customerId}`, {
        method: 'POST',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to reject customer');
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === customerId ? { ...customer, approved: false } : customer
        )
      );
    } catch (error) {
      console.error('Error rejecting customer', error);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(`http://127.0.0.1:5555/delete_customer/${customerId}`, {
        method: 'DELETE',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to delete customer');
      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </header>
      
      <div style={styles.mainContainer}>
        <aside style={styles.sidebar}>
          <button onClick={() => { setSelectedCustomer(null); setSelectedMover(null); }} style={styles.backButton}><FaArrowLeft /> Back</button>
          {selectedCustomer && (
            <>
              <button onClick={() => approveCustomer(selectedCustomer)} style={styles.button}><FaRegCheckCircle /> Approve</button>
              <button onClick={() => rejectCustomer(selectedCustomer)} style={styles.button}><FaRegTimesCircle /> Reject</button>
              <button onClick={() => deleteCustomer(selectedCustomer)} style={{ ...styles.button, ...styles.deleteButton }}><FaTrash /> Delete</button>
            </>
          )}
          {selectedMover && (
            <>
              <button onClick={() => approveMover(selectedMover)} style={styles.button}><FaRegCheckCircle /> Approve</button>
              <button onClick={() => rejectMover(selectedMover)} style={styles.button}><FaRegTimesCircle /> Reject</button>
              <button onClick={() => deleteMover(selectedMover)} style={{ ...styles.button, ...styles.deleteButton }}><FaTrash /> Delete</button>
            </>
          )}
        </aside>

        <div style={styles.content}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}><FaUser /> Customers</h2>
            <ul style={styles.list}>
              {customers.map(customer => (
                <li key={customer.id} style={styles.listItem}>
                  <span>{customer.email}</span>
                  <span style={styles.status}>Approved: {customer.approved ? 'Yes' : 'No'}</span>
                  <button onClick={() => setSelectedCustomer(customer.id)} style={styles.selectButton}>Select</button>
                </li>
              ))}
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}><FaUser /> Movers</h2>
            <ul style={styles.list}>
              {movers.map(mover => (
                <li key={mover.id} style={styles.listItem}>
                  <span>{mover.email}</span>
                  <span style={styles.status}>Approved: {mover.approved ? 'Yes' : 'No'}</span>
                  <button onClick={() => setSelectedMover(mover.id)} style={styles.selectButton}>Select</button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'clear',
    borderRadius: '16px',
    maxWidth: '1600px',
    margin: '0 auto',
    marginTop: '120px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '50px',  // Increased padding
    backgroundColor: 'orange',
    color: '#fff',
    borderRadius: '16px 16px 0 0',
  },
  title: {
    fontSize: '42px',  // Increased font size
    margin: 0,
  },
  logoutButton: {
    padding: '25px 35px',  // Increased padding
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '20px',  // Increased font size
  },
  mainContainer: {
    display: 'flex',
  },
  sidebar: {
    width: '400px',  // Increased width
    padding: '50px',  // Increased padding
    backgroundColor: 'clear',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',  // Increased gap between buttons
  },
  backButton: {
    padding: '25px',  // Increased padding
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',  // Increased gap
    fontSize: '20px',  // Increased font size
  },
  button: {
    padding: '25px',  // Increased padding
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',  // Increased gap
    fontSize: '20px',  // Increased font size
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  content: {
    flex: 1,
    padding: '50px',  // Increased padding
  },
  section: {
    backgroundColor: 'orange',
    padding: '50px',  // Increased padding
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '50px',  // Increased margin bottom
  },
  sectionTitle: {
    fontSize: '36px',  // Increased font size
    marginBottom: '30px',  // Increased margin bottom
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '25px',  // Increased gap
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '25px 0',  // Increased padding
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: '20px',  // Increased font size
    color: '#777',
  },
  selectButton: {
    padding: '20px 25px',  // Increased padding
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '18px',  // Increased font size
  },
};

export default AdminDashboard;
