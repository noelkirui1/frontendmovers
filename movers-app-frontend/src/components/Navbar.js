// components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ id: null, username: '', email: '', role: '' });
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/moves">Moves</Link>
      {user.role === 'user' && <Link to="/inventory">Profile</Link>}
      {(user.role === 'company' || user.role === 'mover') && <Link to="/quotes">Quotes</Link>}
      {user.id ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
// import React from 'react';
// import { useUser } from '../context/UserContext'; // Correct import

// const Navbar = () => {
//   const { isAuthenticated, user } = useUser();

//   return (
//     <nav>
//       <ul>
//         <li><a href="/">Home</a></li>
//         {isAuthenticated ? (
//           <>
//             <li><a href="/Customer">Dashboard</a></li>
//             <li><a href="/logout">Logout</a></li>
//           </>
//         ) : (
//           <>
//             <li><a href="/login">Login</a></li>
//             <li><a href="/register">Register</a></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
