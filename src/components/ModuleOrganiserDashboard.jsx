import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.jpg';

const ModuleOrganiserDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Newest First');

  const [ecs, setEcs] = useState([
    { id: 'EC-8832', name: 'Akbar Ali', module: 'ECS506U', date: '2026-03-25', status: 'Pending' },
    { id: 'EC-8835', name: 'Jane Doe', module: 'ECS505U', date: '2026-03-20', status: 'Approved' },
    { id: 'EC-8810', name: 'John Smith', module: 'ECS504U', date: '2026-03-28', status: 'Rejected' },
    { id: 'EC-8841', name: 'Alex Lloyd', module: 'ECS506U', date: '2026-03-29', status: 'Pending' }
  ]);

  // ez way to filter and sort
  const filteredEcs = ecs
    .filter(ec => 
      ec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ec.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (dateFilter === 'Newest First') return new Date(b.date) - new Date(a.date);
      if (dateFilter === 'Oldest First') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="mo-container">
      <div className="mo-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo-container">
            <img src={qmulLogo} alt="QMUL" className="sidebar-logo" />
          </div>
          <div className="sidebar-links">
            <p className="nav-link" onClick={() => navigate('/dashboard')}>Home</p>
            <p className="active-link">View Module ECs</p>
          </div>
        </div>
        <div className="sidebar-bottom">
          <p className="settings-link">⚙️ Settings</p>
          <p className="settings-link" onClick={() => navigate('/login')}>🚪 Log out</p>
        </div>
      </div>
      
      <div className="mo-content">
        <div className="mo-header">
          <div className="header-left">
            <h1>Welcome, Mostafa!</h1>
          </div>
          <div className="header-right">
            <div className="east-icon">
              <img src="/src/assets/qmul-logo-white.png" alt="QMUL White Logo" className="east-Logo" />
            </div>
          </div>
        </div>

        {<div className="module-cards">
          <div className="mod-card">
            <h3>ECS506U Software Engineering</h3>
            <p>Active ECs: 12</p>
          </div>
          <div className="mod-card">
            <h3>ECS505U Web Dev</h3>
            <p>Active ECs: 4</p>
          </div>
          <div className="mod-card">
            <h3>ECS504U Database Systems</h3>
            <p>Active ECs: 7</p>
          </div>
        </div>}

        {<div className="mo-panel">
          <h2>All module ECs</h2>
          
          <div className="mo-controls">
            <input 
              type="text" 
              placeholder="Search by Name or ID..." 
              className="search-bar" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
          
          <table className="ec-table">
            <thead>
              <tr>
                <th>EC ID</th>
                <th>Name</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEcs.map((ec, index) => (
                <tr key={index}>
                  <td>{ec.id}</td>
                  <td>{ec.name}</td>
                  <td><span className="action-link">View details</span></td>
                  <td><span className={`badge ${ec.status.toLowerCase()}`}>{ec.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

      </div>
    </div>
  );
};

export default ModuleOrganiserDashboard;