// ModuleOrganiserDashboard.jsx
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
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedEc, setSelectedEc] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editAssignee, setEditAssignee] = useState('');

  // swap this with backend data later
  const { user, modules, staff, ecs: initialEcs } = moduleOrganiserDashboardData;
  const [ecs, setEcs] = useState(initialEcs);

  // simple filter + sort
  const filteredEcs = ecs
    .filter((ec) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        ec.id.toLowerCase().includes(term) ||
        ec.studentName.toLowerCase().includes(term) ||
        ec.studentId.toLowerCase().includes(term) ||
        ec.moduleCode.toLowerCase().includes(term) ||
        ec.category.toLowerCase().includes(term) ||
        ec.type.toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'All' ? true : ec.status === statusFilter;
      const matchesModule = selectedModule === 'All' ? true : ec.moduleCode === selectedModule;

      return matchesSearch && matchesStatus && matchesModule;
    })
    .sort((a, b) => {
      if (dateFilter === 'Newest First') return new Date(b.dateReceived) - new Date(a.dateReceived);
      if (dateFilter === 'Oldest First') return new Date(a.dateReceived) - new Date(b.dateReceived);
      return 0;
    });

  const openDetails = (ec) => {
    setSelectedEc(ec);
    setEditStatus(ec.status);
    setEditAssignee(ec.assignedTo);
  };

  const closeDetails = () => {
    setSelectedEc(null);
    setEditStatus('');
    setEditAssignee('');
  };

  const saveEcChanges = () => {
    if (!selectedEc) return;

    setEcs((prev) =>
      prev.map((ec) => {
        if (ec.id !== selectedEc.id) return ec;
        return { ...ec, status: editStatus, assignedTo: editAssignee };
      })
    );

    setSelectedEc((prev) => {
      if (!prev) return prev;
      return { ...prev, status: editStatus, assignedTo: editAssignee };
    });
  };

  const pendingCount = ecs.filter((ec) => ec.status === 'Pending').length;
  const historyCount = ecs.filter((ec) => ec.status !== 'Pending').length;
  const selectedModuleObj = modules.find((m) => m.code === selectedModule);
  const tableTitle =
    selectedModule === 'All'
      ? 'All Modules ECs'
      : `${selectedModuleObj?.code || selectedModule} ${selectedModuleObj?.name || ''} ECs`.trim();

  const getActiveEcsCount = (moduleCode) => {
    return ecs.filter((ec) => ec.moduleCode === moduleCode && ec.status === 'Pending').length;
  };

  const pickModule = (code) => {
    if (code === selectedModule) {
      setSelectedModule('All');
      return;
    }

    if (code === 'All') {
      setSelectedModule('All');
      return;
    }

    setSelectedModule(code);
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
            <div
              key={m.code}
              className={`mod-card ${selectedModule === m.code ? 'mod-card--active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => pickModule(m.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') pickModule(m.code);
              }}
            >
              <h3>{m.code} {m.name}</h3>
              <p>Active ECs: {getActiveEcsCount(m.code)}</p>
            </div>
          ))}
        </div>}

        <div className="mo-tiles">
          <div className="mo-tile">
            <div className="mo-tile-label">Pending ECs</div>
            <div className="mo-tile-value">{pendingCount}</div>
          </div>
          <div className="mo-tile mo-tile--muted">
            <div className="mo-tile-label">EC history</div>
            <div className="mo-tile-value">{historyCount}</div>
          </div>
          <div className="mo-tile mo-tile--action" role="button" tabIndex={0} onClick={() => pickModule('All')}>
            <div className="mo-tile-label">All modules</div>
            <div className="mo-tile-value">{modules.length}</div>
          </div>
        </div>

        {<div className="mo-panel">
          <div className="mo-panel-header">
            <h2>{tableTitle}</h2>

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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Closed</option>
              </select>
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
                <th>Category</th>
                <th>Type</th>
                <th>Date received</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredEcs.map((ec, index) => (
                <tr
                  key={index}
                  className={selectedEc?.id === ec.id ? 'ec-row--selected' : ''}
                  onClick={() => openDetails(ec)}
                >
                  <td>{ec.id}</td>
                  <td>{ec.category}</td>
                  <td>{ec.type}</td>
                  <td>{ec.dateReceived}</td>
                  <td><span className={`badge ${ec.status.toLowerCase()}`}>{ec.status}</span></td>
                  <td className="ec-action-cell">
                    <button
                      type="button"
                      className="action-link action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetails(ec);
                      }}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEcs.length === 0 && (
            <div className="mo-empty">
              No results found.
            </div>
          )}
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
                  <p className="mo-modal-subtitle">{selectedEc.id} • {selectedEc.moduleCode}</p>
                </div>
                <button type="button" className="mo-modal-close" onClick={closeDetails} aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="mo-modal-actions">
                <div className="mo-modal-action">
                  <div className="mo-field-label">Change EC status</div>
                  <select
                    className="mo-select"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Closed</option>
                  </select>
                </div>

                <div className="mo-modal-action">
                  <div className="mo-field-label">Reassign EC</div>
                  <select
                    className="mo-select"
                    value={editAssignee}
                    onChange={(e) => setEditAssignee(e.target.value)}
                  >
                    {staff.organisers.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mo-modal-grid">
                <div className="mo-field">
                  <div className="mo-field-label">Student</div>
                  <div className="mo-field-value">{selectedEc.studentName}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Student ID</div>
                  <div className="mo-field-value">{selectedEc.studentId}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Module affected</div>
                  <div className="mo-field-value">{selectedEc.moduleCode}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Date received</div>
                  <div className="mo-field-value">{selectedEc.dateReceived}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Category</div>
                  <div className="mo-field-value">{selectedEc.category}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Type</div>
                  <div className="mo-field-value">{selectedEc.type}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Assessment(s) affected</div>
                  <div className="mo-field-value">{selectedEc.assessmentAffected}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Original assessment date</div>
                  <div className="mo-field-value">{selectedEc.originalAssessmentDate}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Requested date</div>
                  <div className="mo-field-value">{selectedEc.requestedDate || '—'}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Assigned to</div>
                  <div className="mo-field-value">{selectedEc.assignedTo}</div>
                </div>
                <div className="mo-field">
                  <div className="mo-field-label">Status</div>
                  <div className="mo-field-value">
                    <span className={`badge ${selectedEc.status.toLowerCase()}`}>{selectedEc.status}</span>
                  </div>
                </div>
              </div>

              <div className="mo-modal-footer">
                <button type="button" className="mo-secondary" onClick={closeDetails}>Close</button>
                <button type="button" className="mo-primary" onClick={saveEcChanges}>Save</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ModuleOrganiserDashboard;