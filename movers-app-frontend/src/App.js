import React from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <MainContent />
      </div>
    </div>
  );
}

export default App;
