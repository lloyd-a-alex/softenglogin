import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* automatically redirect the root to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* login page */}
        <Route path="/login" element={<Login />} />
        
        {/* The dummy dashboard u built */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;