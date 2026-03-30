import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.jpg';

const ModuleOrganiserDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');

  const [ecs, setEcs] = useState([
    { id: 'EC-1234', name: 'Akbar Ali', status: 'Pending' },
    { id: 'EC-5678', name: 'Jane Doe', status: 'Approved' }
  ]);

  return (
    <div className="mo-container">
      <div className="mo-sidebar">
        <div className="sidebar-logo-container">
          <img src={qmulLogo} alt="QMUL" className="sidebar-logo" />
        </div>
        <div className="sidebar-links">
          <p className="active-link">View Module ECs</p>
        </div>`n        <div className="sidebar-bottom">`n          <p className="settings-link">⚙️ Settings</p>`n          <p className="settings-link" onClick={handleLogout}>🚪 Log out</p>`n        </div>
      </div>
      
      <div className="mo-content">
        <div className="mo-header">
          <div className="header-left">
            <h1>Welcome, Mustafa</h1>
          </div>
          <div className="header-right">
            <div className="header-search">
              <span>🔍</span>
              <input type="text" placeholder="Search..." />
            </div>
            <div className="profile-icon"></div>
          </div>
        </div>
        
        <div className="module-cards">`n          <div className="mod-card"><h3>ECS506U Software Engineering</h3><p>Active ECs: 5</p></div>`n          <div className="mod-card"><h3>ECS505U Web Dev</h3><p>Active ECs: 2</p></div>`n          <div className="mod-card"><h3>ECS504U Database</h3><p>Active ECs: 1</p></div>`n        </div>`n`n        <div className="mo-panel">
          <h2>All module ECs</h2>
          
          <div className="mo-controls">
            <input type="text" placeholder="Search ECs..." className="search-bar" />
            <select className="date-filter">
              <option>Filter by Date</option>
              <option>Newest First</option>
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
              {ecs.map((ec, index) => (
                <tr key={index}>
                  <td>{ec.id}</td>
                  <td>{ec.name}</td>
                  <td><span className="action-link">View details</span></td>
                  <td><span className={`badge ${ec.status.toLowerCase()}`}>{ec.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default ModuleOrganiserDashboard;



