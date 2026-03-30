import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Activity, Upload, Settings, LogOut } from 'lucide-react';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.png'; 

const ModuleOrganiserDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');

  return (
    <div className="mo-dashboard-container">
      <div className="mo-sidebar">
        <div className="mo-sidebar-brand"><img src={qmulLogo} alt="QMUL Logo" /></div>
        <div className="mo-nav-menu">
          <div className="mo-nav-item active"><Home size={20} /><span>Home</span></div>
          <div className="mo-nav-item"><Activity size={20} /><span>View Service Status</span></div>
          <div className="mo-nav-item"><Upload size={20} /><span>View Purple Boxes</span></div>
        </div>
        <div className="mo-bottom-nav">
          <div className="mo-nav-item"><Settings size={20} /><span>Settings</span></div>
          <div className="mo-nav-item" onClick={handleLogout}><LogOut size={20} /><span>Log out</span></div>
        </div>
      </div>
      <div className="mo-main-content">
        <h1>Welcome back, Module Organiser!</h1>
      </div>
    </div>
  );
};

export default ModuleOrganiserDashboard;
