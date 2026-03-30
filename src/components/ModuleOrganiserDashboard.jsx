import React, { useState } from 'react';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.jpg';

const ModuleOrganiserDashboard = () => {
  // dummy data so it doesnt look empty
  const [ecs, setEcs] = useState([
    { id: 'EC-1234', name: 'John Doe', status: 'Pending' },
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
        </div>
      </div>
      
      <div className="mo-content">
        <h1>Module Organiser Dashboard</h1>
        
        <div className="mo-panel">
          <h2>View Module ECs</h2>
          
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
                  <td><button className="review-btn">Review</button></td>
                  <td><span className="badge">{ec.status}</span></td>
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
