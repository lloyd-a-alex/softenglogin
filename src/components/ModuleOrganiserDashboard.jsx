import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Activity, Upload, Settings, LogOut, CheckCircle, XCircle } from 'lucide-react';
import './ModuleOrganiserDashboard.css';
import qmulLogo from '../assets/qmul-logo.png'; 

const ModuleOrganiserDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');

  const dummyTickets = [
    { id: '3046', status: 'Pending', desc: 'Missed lab due to illness', ec: true },
    { id: '3047', status: 'Pending', desc: 'Late submission appeal', ec: true },
    { id: '3048', status: 'Pending', desc: 'Hardware failure during exam', ec: false }
  ];

  return (
    <div className="mo-dashboard-container">
      <div className="mo-sidebar">
        <div className="mo-sidebar-brand"><img src={qmulLogo} alt="QMUL Logo" /></div>
        <div className="mo-nav-menu">
          <div className="mo-nav-item active"><Home size={20} /><span>Home</span></div>
          <div className="mo-nav-item"><Activity size={20} /><span>View Service Status</span></div>
        </div>
        <div className="mo-bottom-nav">
          <div className="mo-nav-item" onClick={handleLogout}><LogOut size={20} /><span>Log out</span></div>
        </div>
      </div>
      <div className="mo-main-content">
        <h1>Welcome back, Module Organiser!</h1>
        <div className="mo-table-section">
          <h2>Tickets requiring approval</h2>
          <table className="mo-tickets-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Status</th>
                <th>Description</th>
                <th>Extenuating circumstances</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.id}</td>
                  <td><span className="mo-badge pending">{ticket.status}</span></td>
                  <td>{ticket.desc}</td>
                  <td className="mo-ec-icon">{ticket.ec ? <CheckCircle color="green" /> : <XCircle color="red" />}</td>
                  <td><button className="mo-review-btn">Review</button></td>
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
