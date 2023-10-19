import React from 'react';
import LandingPage from './LandingPage';
import MiApi from './components/MiApi';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <LandingPage />
      <MiApi />
    </div>
  );
}

export default App;