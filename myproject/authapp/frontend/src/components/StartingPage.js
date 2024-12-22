import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartingPage.css';

const StartingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/home');  // Ensure the route matches '/home' as defined in App.js
  };

  return (
    <div className="starting-page">
      <div className="content">
        <h1 className="welcome-message">Welcome to CC Tracker</h1>
        <button className="start-button" onClick={handleStartClick}>Start</button>
      </div>
    </div>
  );
};

export default StartingPage;
