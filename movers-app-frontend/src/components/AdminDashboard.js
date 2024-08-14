import { Link, useNavigate } from 'react-router-dom';
import './Admin.css'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [movers, setMovers] = useState([]);

  // Fetch customers and movers when component mounts
  useEffect(() => {
    const fetchCustomersAndMovers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch customers
        const customersResponse = await fetch('http://localhost:5555/customers', { headers });
        if (!customersResponse.ok) throw new Error('Failed to fetch customers');
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        // Fetch movers
        const moversResponse = await fetch('http://localhost:5555/movers', { headers });
        if (!moversResponse.ok) throw new Error('Failed to fetch movers');
        const moversData = await moversResponse.json();
        setMovers(moversData);
      } catch (error) {
        console.error('Error fetching data', error);
        // Handle errors (e.g., unauthorized access)
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
      const response = await fetch(`http://localhost:5555/approve_mover/${moverId}`, {
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
      const response = await fetch(`http://localhost:5555/reject_mover/${moverId}`, {
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
      const response = await fetch(`http://localhost:5555/delete_mover/${moverId}`, {
        method: 'DELETE',
        headers: headers
      });
      if (!response.ok) throw new Error('Failed to delete mover');
      setMovers((prevMovers) => prevMovers.filter((mover) => mover.id !== moverId));
    } catch (error) {
      console.error('Error deleting mover', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <h2>Customers</h2>
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>{customer.email} (Approved: {customer.approved ? 'Yes' : 'No'})</li>
          ))}
        </ul>

        <h2>Movers</h2>
        <ul>
          {movers.map(mover => (
            <li key={mover.id}>
              {mover.email} (Approved: {mover.approved ? 'Yes' : 'No'})
              <button onClick={() => approveMover(mover.id)}>Approve</button>
              <button onClick={() => rejectMover(mover.id)}>Reject</button>
              <button onClick={() => deleteMover(mover.id)}>Delete</button>
            </li>
          ))}
        </ul>
      <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
