import React from 'react';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.jpg';

const ModuleOrganiserDashboard = () => {
  return (
    <div className="mo-container">
      <div className="mo-sidebar">
        <div className="sidebar-logo-container">
          <img src={qmulLogo} alt="QMUL" className="sidebar-logo" />
        </div>
        <div className="sidebar-links">
          <p className="active-link">View Module ECs</p>
        </div>
      </div>
      
      <div className="mo-content">
        <h1>Module Organiser Dashboard</h1>
      </div>
    </div>
  );
};

export default ModuleOrganiserDashboard;
