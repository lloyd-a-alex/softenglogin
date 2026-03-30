import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ModuleOrganiserDashboard from './components/ModuleOrganiserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/module-organiser" element={<ModuleOrganiserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
