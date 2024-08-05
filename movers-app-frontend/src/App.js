import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'; // Assuming Header is defined in its own file
import AppRoutes from './routes/Routes'; // Import the routes component
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Header included at the top of every page */}
        <main>
          <AppRoutes /> {/* Routes are now handled in a separate component */}
        </main>
        <footer>
          <p>© 2024 Movers Solution Company</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
