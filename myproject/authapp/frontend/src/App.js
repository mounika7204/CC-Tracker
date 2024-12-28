import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import LoginPage from './components/login'; // Assuming you have a LoginPage component
import SignupPage from './components/signup';
import Choice from './components/choice'
import AdminSignupPage from './components/signupadmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/signupadmin" element={<AdminSignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
