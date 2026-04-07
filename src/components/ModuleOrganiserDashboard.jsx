import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo-blue.png';
import qmulLogoWhite from '../assets/qmul-logo-white.png';
import { moduleOrganiserDashboardData } from '../data/moduleOrganiserData';
import { FaHome, FaCog, FaSignOutAlt, FaRegClipboard } from 'react-icons/fa';

const ModuleOrganiserDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Newest First');
  const [selectedEc, setSelectedEc] = useState(null);

  // swap this with backend data later
  const { user, modules, ecs: initialEcs } = moduleOrganiserDashboardData;
  const [ecs, setEcs] = useState(initialEcs);

  // simple filter + sort
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

  const openDetails = (ec) => {
    setSelectedEc(ec);
  };

  const closeDetails = () => {
    setSelectedEc(null);
  };

  return (
    <div className="mo-container">
      <div className="mo-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo-container">
            <img src={qmulLogo} alt="Queen Mary University of London" className="sidebar-logo" />
          </div>
          <div className="sidebar-links">
            <button type="button" className="side-item side-item--active" onClick={() => navigate('/module-organiser')}>
              <span className="side-icon"><FaHome /></span>
              <span className="side-text">Home</span>
            </button>

            <button type="button" className="side-item" onClick={() => navigate('/module-organiser')}>
              <span className="side-icon"><FaRegClipboard /></span>
              <span className="side-text">View Module ECs</span>
            </button>
          </div>
        </div>
        <div className="sidebar-bottom">
          <button type="button" className="side-footer" onClick={() => {}}>
            <span className="side-icon"><FaCog /></span>
            <span className="side-text">Settings</span>
          </button>

          <button type="button" className="side-footer" onClick={() => navigate('/login')}>
            <span className="side-icon"><FaSignOutAlt /></span>
            <span className="side-text">Log out</span>
          </button>
        </div>
      </div>
      
      <div className="mo-content">
        <div className="mo-header">
          <div className="header-left">
            <h1>Welcome, {user.name}!</h1>
          </div>
          <div className="header-right">
            <div className="east-icon">
              <img src={qmulLogoWhite} alt="QMUL White Logo" className="east-Logo" />
            </div>
          </div>
        </div>

        <h2 className="modules-title">Your Modules</h2>

        {<div className="module-cards">
          {modules.map((m) => (
            <div key={m.code} className="mod-card">
              <h3>{m.code} {m.name}</h3>
              <p>Active ECs: {m.activeEcs}</p>
            </div>
          ))}
        </div>}

        {<div className="mo-panel">
          <div className="mo-panel-header">
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
                  <td className="ec-action-cell">
                    <button
                      type="button"
                      className="action-link action-button"
                      onClick={() => openDetails(ec)}
                    >
                      View details
                    </button>
                  </td>
                  <td><span className={`badge ${ec.status.toLowerCase()}`}>{ec.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        {selectedEc && (
          <div
            className="mo-modal-overlay"
            role="presentation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeDetails();
            }}
          >
            <div
              className="mo-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mo-modal-title"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="mo-modal-header">
                <div>
                  <h3 id="mo-modal-title" className="mo-modal-title">EC details</h3>
                  <p className="mo-modal-subtitle">{selectedEc.id} • {selectedEc.module}</p>
                </div>
                <button type="button" className="mo-modal-close" onClick={closeDetails} aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="mo-modal-grid">
                <div className="mo-field">
                  <div className="mo-field-label">Student</div>
                  <div className="mo-field-value">{selectedEc.name}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Date received</div>
                  <div className="mo-field-value">{selectedEc.date}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Status</div>
                  <div className="mo-field-value">
                    <span className={`badge ${selectedEc.status.toLowerCase()}`}>{selectedEc.status}</span>
                  </div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Module</div>
                  <div className="mo-field-value">{selectedEc.module}</div>
                </div>
              </div>

              <div className="mo-modal-footer">
                <button type="button" className="mo-secondary" onClick={closeDetails}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ModuleOrganiserDashboard;